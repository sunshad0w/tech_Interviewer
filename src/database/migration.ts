/**
 * Data Migration: JSON + localStorage → SQLite
 *
 * Миграция данных из текущей системы хранения в SQLite
 */

import type { InterviewGuide, PositionStatistics } from '@/types'
import { sqliteService } from './sqliteService'

/**
 * Интерфейс для прогресса миграции
 */
export interface MigrationProgress {
  step: string
  current: number
  total: number
  percentage: number
}

/**
 * Результат миграции
 */
export interface MigrationResult {
  success: boolean
  guidesImported: number
  questionsImported: number
  statisticsImported: number
  errors: string[]
  duration: number
}

/**
 * Основная функция миграции
 */
export async function migrateToSQLite(
  onProgress?: (progress: MigrationProgress) => void
): Promise<MigrationResult> {
  const startTime = Date.now()
  const result: MigrationResult = {
    success: false,
    guidesImported: 0,
    questionsImported: 0,
    statisticsImported: 0,
    errors: [],
    duration: 0,
  }

  try {
    // Инициализировать SQLite
    onProgress?.({ step: 'Инициализация базы данных', current: 0, total: 100, percentage: 0 })
    await sqliteService.initialize()

    // Загрузить все JSON guides
    onProgress?.({ step: 'Загрузка JSON guides', current: 10, total: 100, percentage: 10 })
    const guides = await loadAllJSONGuides()

    if (guides.length === 0) {
      throw new Error('No interview guides found in jsons/ directory')
    }

    // Загрузить статистику из localStorage
    onProgress?.({ step: 'Загрузка статистики', current: 20, total: 100, percentage: 20 })
    const statistics = loadAllStatistics()

    // Миграция в транзакции
    await sqliteService.transaction(async () => {
      let processedGuides = 0

      for (const guide of guides) {
        try {
          // Миграция guide
          await migrateGuide(guide)
          result.guidesImported++

          // Миграция статистики для этого guide
          const guideStat = statistics.find((s) => s.position === guide.guide_name)
          if (guideStat) {
            await migrateStatistics(guide.guide_name, guideStat)
            result.statisticsImported++
          }

          processedGuides++
          const progress = 20 + Math.floor((processedGuides / guides.length) * 70)
          onProgress?.({
            step: `Миграция ${guide.guide_name}`,
            current: progress,
            total: 100,
            percentage: progress,
          })
        } catch (error) {
          result.errors.push(`Failed to migrate ${guide.guide_name}: ${error}`)
        }
      }

      // Подсчитать импортированные вопросы
      const stats = sqliteService.getStats()
      result.questionsImported = stats.questions
    })

    // Сохранить в IndexedDB
    onProgress?.({ step: 'Сохранение в браузер', current: 95, total: 100, percentage: 95 })
    await sqliteService.saveToIndexedDB()

    result.success = true
    result.duration = Date.now() - startTime

    onProgress?.({ step: 'Миграция завершена', current: 100, total: 100, percentage: 100 })

    return result
  } catch (error) {
    result.errors.push(`Migration failed: ${error}`)
    result.duration = Date.now() - startTime
    return result
  }
}

/**
 * Миграция одного guide в SQLite
 */
async function migrateGuide(guide: InterviewGuide): Promise<void> {
  // 1. Вставить guide
  sqliteService.run(
    `INSERT INTO guides (guide_name, guide_description, source_json_file)
     VALUES (?, ?, ?)`,
    [guide.guide_name, guide.guide_description || null, guide.guide_name + '.json']
  )

  const guideRow = sqliteService.execOne(
    'SELECT id FROM guides WHERE guide_name = ?',
    [guide.guide_name]
  ) as { id: number }

  if (!guideRow) {
    throw new Error(`Failed to insert guide: ${guide.guide_name}`)
  }

  const guideId = guideRow.id

  // 2. Вставить metadata
  sqliteService.run(
    `INSERT INTO guide_metadata (
      guide_id, created_date, target_audience, covered_versions,
      difficulty_level, total_questions, total_chapters
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      guideId,
      guide.guide_metadata.created_date || null,
      guide.guide_metadata.target_audience || null,
      guide.guide_metadata.covered_versions || null,
      guide.guide_metadata.difficulty_level || null,
      guide.guide_metadata.total_questions,
      guide.guide_metadata.total_chapters,
    ]
  )

  // 3. Вставить chapters и questions
  for (const chapter of guide.guide_chapters) {
    // Вставить chapter
    sqliteService.run(
      `INSERT INTO chapters (guide_id, chapter_number, chapter_title, chapter_description)
       VALUES (?, ?, ?, ?)`,
      [guideId, chapter.chapter_number, chapter.chapter_title, chapter.chapter_description || null]
    )

    const chapterRow = sqliteService.execOne(
      'SELECT id FROM chapters WHERE guide_id = ? AND chapter_number = ?',
      [guideId, chapter.chapter_number]
    ) as { id: number }

    if (!chapterRow) {
      throw new Error(`Failed to insert chapter: ${chapter.chapter_title}`)
    }

    const chapterId = chapterRow.id

    // Инициализировать статистику главы
    sqliteService.run(
      `INSERT INTO chapter_statistics (chapter_id, chapter_score, answered_count, total_questions)
       VALUES (?, 0, 0, ?)`,
      [chapterId, chapter.questions.length]
    )

    // Вставить questions
    for (const question of chapter.questions) {
      sqliteService.run(
        `INSERT INTO questions (
          chapter_id, question_number, question_number_in_chapter,
          question_title, answer_markdown, best_practices_markdown, common_mistakes_markdown
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          chapterId,
          question.question_number,
          question.question_number_in_chapter,
          question.question_title,
          question.answer_markdown || null,
          question.best_practices_markdown || null,
          question.common_mistakes_markdown || null,
        ]
      )

      const questionRow = sqliteService.execOne(
        'SELECT id FROM questions WHERE chapter_id = ? AND question_number = ?',
        [chapterId, question.question_number]
      ) as { id: number }

      if (!questionRow) {
        throw new Error(`Failed to insert question: ${question.question_title}`)
      }

      const questionId = questionRow.id

      // Вставить subsections если есть
      if (question.question_subsections && question.question_subsections.length > 0) {
        for (let i = 0; i < question.question_subsections.length; i++) {
          const subsection = question.question_subsections[i]
          sqliteService.run(
            `INSERT INTO question_subsections (
              question_id, subsection_order, subsection_title, subsection_content_markdown
            ) VALUES (?, ?, ?, ?)`,
            [questionId, i + 1, subsection.subsection_title, subsection.subsection_content_markdown]
          )
        }
      }

      // Инициализировать статистику вопроса (пока null, потом обновим из localStorage)
      sqliteService.run(
        `INSERT INTO question_statistics (question_id, answer_score, attempts_count)
         VALUES (?, NULL, 0)`,
        [questionId]
      )
    }
  }

  // 4. Инициализировать user_statistics
  sqliteService.run(
    `INSERT INTO user_statistics (guide_id, overall_score, total_answered, total_questions)
     VALUES (?, 0, 0, ?)`,
    [guideId, guide.guide_metadata.total_questions]
  )
}

/**
 * Миграция статистики из localStorage
 */
async function migrateStatistics(
  guideName: string,
  statistics: PositionStatistics
): Promise<void> {
  // Найти guide_id
  const guideRow = sqliteService.execOne('SELECT id FROM guides WHERE guide_name = ?', [
    guideName,
  ]) as { id: number } | null

  if (!guideRow) {
    throw new Error(`Guide not found: ${guideName}`)
  }

  const guideId = guideRow.id

  // Обновить user_statistics
  sqliteService.run(
    `UPDATE user_statistics
     SET overall_score = ?, total_answered = ?
     WHERE guide_id = ?`,
    [statistics.overallScore, getTotalAnswered(statistics), guideId]
  )

  // Обновить chapter_statistics и question_statistics
  for (const chapterStat of statistics.statistics) {
    // Найти chapter
    const chapterRow = sqliteService.execOne(
      'SELECT id FROM chapters WHERE guide_id = ? AND chapter_number = ?',
      [guideId, chapterStat.chapterNumber]
    ) as { id: number } | null

    if (!chapterRow) {
      console.warn(`Chapter not found: ${chapterStat.chapterNumber}`)
      continue
    }

    const chapterId = chapterRow.id

    // Обновить chapter_statistics
    sqliteService.run(
      `UPDATE chapter_statistics
       SET chapter_score = ?, answered_count = ?
       WHERE chapter_id = ?`,
      [chapterStat.chapterScore, chapterStat.answeredCount, chapterId]
    )

    // Обновить question_statistics
    for (const questionStat of chapterStat.questions) {
      const questionRow = sqliteService.execOne(
        'SELECT id FROM questions WHERE chapter_id = ? AND question_number = ?',
        [chapterId, questionStat.questionNumber]
      ) as { id: number } | null

      if (!questionRow) {
        console.warn(`Question not found: ${questionStat.questionNumber}`)
        continue
      }

      const questionId = questionRow.id

      sqliteService.run(
        `UPDATE question_statistics
         SET answer_score = ?, answered_at = ?, attempts_count = 1
         WHERE question_id = ?`,
        [questionStat.answerScore, new Date().toISOString(), questionId]
      )
    }
  }
}

/**
 * Загрузить все JSON guides из /jsons
 */
async function loadAllJSONGuides(): Promise<InterviewGuide[]> {
  const jsonFiles = ['angular.json', 'nodejs.json', 'react.json', 'typescript.json', 'vue.json']
  const guides: InterviewGuide[] = []

  for (const filename of jsonFiles) {
    try {
      const response = await fetch(`/jsons/${filename}`)
      if (!response.ok) {
        console.warn(`Failed to load ${filename}: ${response.statusText}`)
        continue
      }

      const guide = (await response.json()) as InterviewGuide
      guides.push(guide)
    } catch (error) {
      console.error(`Error loading ${filename}:`, error)
    }
  }

  return guides
}

/**
 * Загрузить всю статистику из localStorage
 */
function loadAllStatistics(): PositionStatistics[] {
  const stats: PositionStatistics[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('interview_stats_')) {
      try {
        const data = localStorage.getItem(key)
        if (data) {
          const stat = JSON.parse(data) as PositionStatistics
          stats.push(stat)
        }
      } catch (error) {
        console.error(`Failed to parse statistics for ${key}:`, error)
      }
    }
  }

  return stats
}

/**
 * Получить общее количество отвеченных вопросов
 */
function getTotalAnswered(statistics: PositionStatistics): number {
  return statistics.statistics.reduce((sum, chapter) => sum + chapter.answeredCount, 0)
}

/**
 * Проверить, требуется ли миграция
 */
export function isMigrationNeeded(): boolean {
  // Проверяем, есть ли данные в SQLite
  if (!sqliteService.isInitialized()) {
    return true
  }

  const stats = sqliteService.getStats()
  return stats.guides === 0
}

/**
 * Откатить миграцию и вернуться к JSON + localStorage
 */
export async function rollbackMigration(): Promise<void> {
  await sqliteService.resetDatabase()
  console.log('✅ Migration rolled back, database reset')
}

/**
 * Экспорт базы данных в файл
 */
export function exportDatabaseToFile(): Blob {
  const data = sqliteService.exportDatabase()
  return new Blob([data], { type: 'application/x-sqlite3' })
}

/**
 * Импорт базы данных из файла
 */
export async function importDatabaseFromFile(file: File): Promise<void> {
  const arrayBuffer = await file.arrayBuffer()
  const data = new Uint8Array(arrayBuffer)
  await sqliteService.importDatabase(data)
}
