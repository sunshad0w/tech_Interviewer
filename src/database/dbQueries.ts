/**
 * Database Queries Module
 *
 * Готовые SQL запросы для работы с SQLite базой данных
 */

import { sqliteService } from './sqliteService'
import type {
  InterviewGuide,
  Chapter,
  Question,
  PositionStatistics,
  ChapterStatistics,
  QuestionStatistics,
} from '@/types'

/**
 * Получить все позиции (guides) с метаданными
 */
export function getAllGuides(): Array<{
  id: number
  guide_name: string
  guide_description: string | null
  difficulty_level: string | null
  total_questions: number
  total_chapters: number
  overall_score: number
  total_answered: number
}> {
  const results = sqliteService.exec(`
    SELECT
      g.id,
      g.guide_name,
      g.guide_description,
      gm.difficulty_level,
      gm.total_questions,
      gm.total_chapters,
      COALESCE(us.overall_score, 0) as overall_score,
      COALESCE(us.total_answered, 0) as total_answered
    FROM guides g
    LEFT JOIN guide_metadata gm ON g.id = gm.guide_id
    LEFT JOIN user_statistics us ON g.id = us.guide_id
    ORDER BY g.guide_name
  `)

  return results as Array<{
    id: number
    guide_name: string
    guide_description: string | null
    difficulty_level: string | null
    total_questions: number
    total_chapters: number
    overall_score: number
    total_answered: number
  }>
}

/**
 * Получить полную информацию о guide по имени
 */
export function getGuideByName(guideName: string): InterviewGuide | null {
  const guideRow = sqliteService.execOne('SELECT * FROM guides WHERE guide_name = ?', [
    guideName,
  ]) as { id: number; guide_name: string; guide_description: string | null } | null

  if (!guideRow) {
    return null
  }

  // Получить metadata
  const metadataRow = sqliteService.execOne('SELECT * FROM guide_metadata WHERE guide_id = ?', [
    guideRow.id,
  ]) as {
    created_date: string | null
    target_audience: string | null
    covered_versions: string | null
    difficulty_level: string | null
    total_questions: number
    total_chapters: number
  } | null

  // Получить главы
  const chapters = getChaptersByGuideId(guideRow.id)

  // Собрать InterviewGuide объект
  const guide: InterviewGuide = {
    guide_name: guideRow.guide_name,
    guide_description: guideRow.guide_description || undefined,
    guide_metadata: {
      created_date: metadataRow?.created_date || undefined,
      target_audience: metadataRow?.target_audience || '',
      covered_versions: metadataRow?.covered_versions || '',
      difficulty_level: metadataRow?.difficulty_level || undefined,
      total_questions: metadataRow?.total_questions || 0,
      total_chapters: metadataRow?.total_chapters || 0,
    },
    guide_chapters: chapters,
  }

  return guide
}

/**
 * Получить все главы для guide
 */
function getChaptersByGuideId(guideId: number): Chapter[] {
  const chapterRows = sqliteService.exec(
    `SELECT * FROM chapters WHERE guide_id = ? ORDER BY chapter_number`,
    [guideId]
  ) as Array<{
    id: number
    chapter_number: number
    chapter_title: string
    chapter_description: string | null
  }>

  return chapterRows.map((chapterRow) => {
    const questions = getQuestionsByChapterId(chapterRow.id)

    return {
      chapter_number: chapterRow.chapter_number,
      chapter_title: chapterRow.chapter_title,
      chapter_description: chapterRow.chapter_description || undefined,
      questions,
    }
  })
}

/**
 * Получить все вопросы для главы
 */
function getQuestionsByChapterId(chapterId: number): Question[] {
  const questionRows = sqliteService.exec(
    `SELECT * FROM questions WHERE chapter_id = ? ORDER BY question_number`,
    [chapterId]
  ) as Array<{
    id: number
    question_number: number
    question_number_in_chapter: number
    question_title: string
    answer_markdown: string | null
    best_practices_markdown: string | null
    common_mistakes_markdown: string | null
  }>

  return questionRows.map((questionRow) => {
    // Получить subsections если есть
    const subsections = sqliteService.exec(
      `SELECT * FROM question_subsections WHERE question_id = ? ORDER BY subsection_order`,
      [questionRow.id]
    ) as Array<{
      subsection_title: string
      subsection_content_markdown: string
    }>

    return {
      question_number: questionRow.question_number,
      question_number_in_chapter: questionRow.question_number_in_chapter,
      question_title: questionRow.question_title,
      answer_markdown: questionRow.answer_markdown || undefined,
      best_practices_markdown: questionRow.best_practices_markdown || undefined,
      common_mistakes_markdown: questionRow.common_mistakes_markdown || undefined,
      question_subsections:
        subsections.length > 0
          ? subsections.map((s) => ({
              subsection_title: s.subsection_title,
              subsection_content_markdown: s.subsection_content_markdown,
            }))
          : undefined,
    }
  })
}

/**
 * Получить статистику по позиции
 */
export function getPositionStatistics(guideName: string): PositionStatistics | null {
  const guideRow = sqliteService.execOne('SELECT id FROM guides WHERE guide_name = ?', [
    guideName,
  ]) as { id: number } | null

  if (!guideRow) {
    return null
  }

  const guideId = guideRow.id

  // Получить общую статистику
  const statsRow = sqliteService.execOne('SELECT * FROM user_statistics WHERE guide_id = ?', [
    guideId,
  ]) as {
    overall_score: number
    total_answered: number
    total_questions: number
  } | null

  // Получить статистику по главам
  const chapterStatsRows = sqliteService.exec(
    `
    SELECT
      c.chapter_number,
      c.chapter_title,
      cs.chapter_score,
      cs.answered_count,
      cs.total_questions
    FROM chapters c
    LEFT JOIN chapter_statistics cs ON c.id = cs.chapter_id
    WHERE c.guide_id = ?
    ORDER BY c.chapter_number
  `,
    [guideId]
  ) as Array<{
    chapter_number: number
    chapter_title: string
    chapter_score: number
    answered_count: number
    total_questions: number
  }>

  const statistics: ChapterStatistics[] = []

  for (const chapterStat of chapterStatsRows) {
    // Получить статистику по вопросам главы
    const chapterRow = sqliteService.execOne(
      'SELECT id FROM chapters WHERE guide_id = ? AND chapter_number = ?',
      [guideId, chapterStat.chapter_number]
    ) as { id: number } | null

    if (!chapterRow) continue

    const questionStatsRows = sqliteService.exec(
      `
      SELECT
        q.question_number,
        q.question_title,
        qs.answer_score
      FROM questions q
      LEFT JOIN question_statistics qs ON q.id = qs.question_id
      WHERE q.chapter_id = ?
      ORDER BY q.question_number
    `,
      [chapterRow.id]
    ) as Array<{
      question_number: number
      question_title: string
      answer_score: number | null
    }>

    const questions: QuestionStatistics[] = questionStatsRows.map((q) => ({
      questionTitle: q.question_title,
      questionNumber: q.question_number,
      answerScore: q.answer_score,
    }))

    statistics.push({
      chapterTitle: chapterStat.chapter_title,
      chapterNumber: chapterStat.chapter_number,
      chapterScore: chapterStat.chapter_score || 0,
      answeredCount: chapterStat.answered_count || 0,
      totalQuestions: chapterStat.total_questions || 0,
      questions,
    })
  }

  return {
    position: guideName,
    sourceJsonFile: guideName + '.json',
    overallScore: statsRow?.overall_score || 0,
    statistics,
  }
}

/**
 * Обновить оценку вопроса
 */
export function updateQuestionScore(
  guideName: string,
  chapterNumber: number,
  questionNumber: number,
  score: number
): void {
  // Найти guide
  const guideRow = sqliteService.execOne('SELECT id FROM guides WHERE guide_name = ?', [
    guideName,
  ]) as { id: number } | null

  if (!guideRow) {
    throw new Error(`Guide not found: ${guideName}`)
  }

  // Найти chapter
  const chapterRow = sqliteService.execOne(
    'SELECT id FROM chapters WHERE guide_id = ? AND chapter_number = ?',
    [guideRow.id, chapterNumber]
  ) as { id: number } | null

  if (!chapterRow) {
    throw new Error(`Chapter not found: ${chapterNumber}`)
  }

  // Найти question
  const questionRow = sqliteService.execOne(
    'SELECT id FROM questions WHERE chapter_id = ? AND question_number = ?',
    [chapterRow.id, questionNumber]
  ) as { id: number } | null

  if (!questionRow) {
    throw new Error(`Question not found: ${questionNumber}`)
  }

  // Обновить оценку
  sqliteService.run(
    `UPDATE question_statistics
     SET answer_score = ?, answered_at = ?, attempts_count = attempts_count + 1
     WHERE question_id = ?`,
    [score, new Date().toISOString(), questionRow.id]
  )

  // Триггеры автоматически обновят chapter_statistics и user_statistics
  sqliteService.saveToIndexedDB()
}

/**
 * Сбросить статистику по позиции
 */
export function resetPositionStatistics(guideName: string): void {
  const guideRow = sqliteService.execOne('SELECT id FROM guides WHERE guide_name = ?', [
    guideName,
  ]) as { id: number } | null

  if (!guideRow) {
    throw new Error(`Guide not found: ${guideName}`)
  }

  sqliteService.transaction(() => {
    // Сбросить статистику вопросов
    sqliteService.run(
      `UPDATE question_statistics
       SET answer_score = NULL, answered_at = NULL, attempts_count = 0
       WHERE question_id IN (
         SELECT q.id FROM questions q
         JOIN chapters c ON q.chapter_id = c.id
         WHERE c.guide_id = ?
       )`,
      [guideRow.id]
    )

    // Сбросить статистику глав
    sqliteService.run(
      `UPDATE chapter_statistics
       SET chapter_score = 0, answered_count = 0
       WHERE chapter_id IN (
         SELECT id FROM chapters WHERE guide_id = ?
       )`,
      [guideRow.id]
    )

    // Сбросить общую статистику
    sqliteService.run(
      `UPDATE user_statistics
       SET overall_score = 0, total_answered = 0
       WHERE guide_id = ?`,
      [guideRow.id]
    )

    sqliteService.saveToIndexedDB()
  })
}

/**
 * Сбросить статистику по главе
 */
export function resetChapterStatistics(guideName: string, chapterNumber: number): void {
  const guideRow = sqliteService.execOne('SELECT id FROM guides WHERE guide_name = ?', [
    guideName,
  ]) as { id: number } | null

  if (!guideRow) {
    throw new Error(`Guide not found: ${guideName}`)
  }

  const chapterRow = sqliteService.execOne(
    'SELECT id FROM chapters WHERE guide_id = ? AND chapter_number = ?',
    [guideRow.id, chapterNumber]
  ) as { id: number } | null

  if (!chapterRow) {
    throw new Error(`Chapter not found: ${chapterNumber}`)
  }

  sqliteService.transaction(() => {
    // Сбросить статистику вопросов
    sqliteService.run(
      `UPDATE question_statistics
       SET answer_score = NULL, answered_at = NULL, attempts_count = 0
       WHERE question_id IN (
         SELECT id FROM questions WHERE chapter_id = ?
       )`,
      [chapterRow.id]
    )

    // Сбросить статистику главы
    sqliteService.run(
      `UPDATE chapter_statistics
       SET chapter_score = 0, answered_count = 0
       WHERE chapter_id = ?`,
      [chapterRow.id]
    )

    sqliteService.saveToIndexedDB()
  })
}

/**
 * Получить случайный вопрос с взвешенной рандомизацией
 */
export function getWeightedRandomQuestion(
  guideName: string,
  chapterNumber?: number
): { chapterNumber: number; questionNumber: number } | null {
  const guideRow = sqliteService.execOne('SELECT id FROM guides WHERE guide_name = ?', [
    guideName,
  ]) as { id: number } | null

  if (!guideRow) {
    return null
  }

  // Получить все вопросы с оценками
  const query = chapterNumber
    ? `
    SELECT
      c.chapter_number,
      q.question_number,
      COALESCE(qs.answer_score, 0) as score
    FROM questions q
    JOIN chapters c ON q.chapter_id = c.id
    LEFT JOIN question_statistics qs ON q.id = qs.question_id
    WHERE c.guide_id = ? AND c.chapter_number = ?
  `
    : `
    SELECT
      c.chapter_number,
      q.question_number,
      COALESCE(qs.answer_score, 0) as score
    FROM questions q
    JOIN chapters c ON q.chapter_id = c.id
    LEFT JOIN question_statistics qs ON q.id = qs.question_id
    WHERE c.guide_id = ?
  `

  const params = chapterNumber ? [guideRow.id, chapterNumber] : [guideRow.id]

  const questions = sqliteService.exec(query, params) as Array<{
    chapter_number: number
    question_number: number
    score: number | null
  }>

  if (questions.length === 0) {
    return null
  }

  // Вычислить веса (5 - score)^2
  const weights = questions.map((q) => {
    const score = q.score ?? 0
    return Math.pow(5 - score, 2)
  })

  const totalWeight = weights.reduce((sum, w) => sum + w, 0)

  if (totalWeight === 0) {
    // Все вопросы с оценкой 5, выбираем случайный
    const randomIndex = Math.floor(Math.random() * questions.length)
    return {
      chapterNumber: questions[randomIndex].chapter_number,
      questionNumber: questions[randomIndex].question_number,
    }
  }

  // Взвешенный выбор
  let random = Math.random() * totalWeight
  for (let i = 0; i < questions.length; i++) {
    random -= weights[i]
    if (random <= 0) {
      return {
        chapterNumber: questions[i].chapter_number,
        questionNumber: questions[i].question_number,
      }
    }
  }

  // Fallback (не должно случиться)
  return {
    chapterNumber: questions[0].chapter_number,
    questionNumber: questions[0].question_number,
  }
}

/**
 * Получить вопросы с низким баллом (для повторения)
 */
export function getLowScoreQuestions(
  guideName: string,
  threshold = 3
): Array<{
  chapterNumber: number
  chapterTitle: string
  questionNumber: number
  questionTitle: string
  answerScore: number
}> {
  const guideRow = sqliteService.execOne('SELECT id FROM guides WHERE guide_name = ?', [
    guideName,
  ]) as { id: number } | null

  if (!guideRow) {
    return []
  }

  const results = sqliteService.exec(
    `
    SELECT
      c.chapter_number,
      c.chapter_title,
      q.question_number,
      q.question_title,
      qs.answer_score
    FROM questions q
    JOIN chapters c ON q.chapter_id = c.id
    LEFT JOIN question_statistics qs ON q.id = qs.question_id
    WHERE c.guide_id = ?
      AND qs.answer_score IS NOT NULL
      AND qs.answer_score < ?
    ORDER BY qs.answer_score ASC, q.question_number
  `,
    [guideRow.id, threshold]
  )

  return results as Array<{
    chapterNumber: number
    chapterTitle: string
    questionNumber: number
    questionTitle: string
    answerScore: number
  }>
}
