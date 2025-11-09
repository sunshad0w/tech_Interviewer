/**
 * localStorage Service для работы со статистикой интервью
 *
 * ВАЖНО:
 * - answerScore: null означает "не отвечено"
 * - answerScore: 0-5 означает оценку пользователя
 * - При инициализации все вопросы имеют answerScore: null (НЕ 0!)
 * - При расчете средних баллов игнорируем null значения
 */

import type { InterviewGuide } from '@/types/interview'
import type {
  PositionStatistics,
  ChapterStatistics,
  QuestionStatistics,
  LocalStorageStatistics
} from '@/types/statistics'

/** Ключ для хранения статистики в localStorage */
const STORAGE_KEY = 'interview_statistics'

/**
 * Безопасное получение данных из localStorage
 * @returns Объект со всеми статистиками или пустой объект при ошибке
 */
function getStorageData(): LocalStorageStatistics {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return {}
    return JSON.parse(data) as LocalStorageStatistics
  } catch (error) {
    console.error('Failed to read from localStorage:', error)
    return {}
  }
}

/**
 * Безопасное сохранение данных в localStorage
 * @param data - Объект со всеми статистиками
 */
function setStorageData(data: LocalStorageStatistics): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to write to localStorage:', error)
  }
}

/**
 * Получить статистику для конкретной позиции
 * @param position - Название позиции
 * @returns Статистика позиции или null если не найдена
 */
export function getPositionStatistics(position: string): PositionStatistics | null {
  const allStats = getStorageData()
  return allStats[position] || null
}

/**
 * Сохранить статистику позиции в localStorage
 * @param stats - Статистика позиции для сохранения
 */
export function savePositionStatistics(stats: PositionStatistics): void {
  const allStats = getStorageData()
  allStats[stats.position] = stats
  setStorageData(allStats)
}

/**
 * Рассчитать средний балл главы (игнорируя null значения)
 * @param chapter - Статистика главы
 * @returns Средний балл или 0 если нет отвеченных вопросов
 */
export function calculateChapterScore(chapter: ChapterStatistics): number {
  const answeredQuestions = chapter.questions.filter((q: QuestionStatistics) => q.answerScore !== null)

  if (answeredQuestions.length === 0) {
    return 0
  }

  const sum = answeredQuestions.reduce((acc: number, q: QuestionStatistics) => acc + (q.answerScore as number), 0)
  return Number((sum / answeredQuestions.length).toFixed(2))
}

/**
 * Рассчитать количество отвеченных вопросов в главе
 * @param chapter - Статистика главы
 * @returns Количество вопросов с ответом (answerScore !== null)
 */
function calculateAnsweredCount(chapter: ChapterStatistics): number {
  return chapter.questions.filter((q: QuestionStatistics) => q.answerScore !== null).length
}

/**
 * Рассчитать общий балл позиции
 * @param stats - Статистика позиции
 * @returns Средний балл по всем главам или 0 если нет отвеченных вопросов
 */
export function calculateOverallScore(stats: PositionStatistics): number {
  const chaptersWithAnswers = stats.statistics.filter((ch: ChapterStatistics) => {
    const answeredCount = ch.questions.filter((q: QuestionStatistics) => q.answerScore !== null).length
    return answeredCount > 0
  })

  if (chaptersWithAnswers.length === 0) {
    return 0
  }

  const sum = chaptersWithAnswers.reduce((acc: number, ch: ChapterStatistics) => acc + ch.chapterScore, 0)
  return Number((sum / chaptersWithAnswers.length).toFixed(2))
}

/**
 * Инициализировать статистику для новой позиции
 * ВАЖНО: Все вопросы инициализируются с answerScore: null (НЕ 0!)
 *
 * @param guide - Interview guide для инициализации
 * @returns Новая статистика позиции
 */
export function initializeStatistics(guide: InterviewGuide): PositionStatistics {
  const statistics: ChapterStatistics[] = guide.guide_chapters.map((chapter) => {
    const questions: QuestionStatistics[] = chapter.questions.map((question) => ({
      questionTitle: question.question_title,
      questionNumber: question.question_number,
      answerScore: null // ВАЖНО: null означает "не отвечено"
    }))

    const chapterStats: ChapterStatistics = {
      chapterTitle: chapter.chapter_title,
      chapterNumber: chapter.chapter_number,
      chapterScore: 0,
      answeredCount: 0,
      totalQuestions: chapter.questions.length,
      questions
    }

    return chapterStats
  })

  const positionStats: PositionStatistics = {
    position: guide.guide_name,
    sourceJsonFile: '', // Будет установлен при загрузке
    overallScore: 0,
    lastUpdated: new Date().toISOString(),
    statistics
  }

  return positionStats
}

/**
 * Обновить оценку вопроса
 * Создает новый объект статистики (immutable операция)
 *
 * @param stats - Текущая статистика позиции
 * @param chapterNum - Номер главы (chapter_number)
 * @param questionNum - Номер вопроса (question_number)
 * @param score - Оценка (0-5)
 * @returns Новая статистика позиции с обновленным вопросом
 */
export function updateQuestionScore(
  stats: PositionStatistics,
  chapterNum: number,
  questionNum: number,
  score: number
): PositionStatistics {
  // Валидация оценки
  if (score < 0 || score > 5) {
    throw new Error(`Invalid score: ${score}. Score must be between 0 and 5`)
  }

  // Создаем новую статистику (immutable)
  const newStatistics = stats.statistics.map((chapter: ChapterStatistics) => {
    if (chapter.chapterNumber !== chapterNum) {
      return chapter
    }

    // Обновляем вопрос в этой главе
    const newQuestions = chapter.questions.map((question: QuestionStatistics) => {
      if (question.questionNumber !== questionNum) {
        return question
      }

      // Обновляем оценку вопроса
      return {
        ...question,
        answerScore: score
      }
    })

    // Пересчитываем статистику главы
    const updatedChapter: ChapterStatistics = {
      ...chapter,
      questions: newQuestions
    }

    // Пересчитываем chapterScore и answeredCount
    updatedChapter.chapterScore = calculateChapterScore(updatedChapter)
    updatedChapter.answeredCount = calculateAnsweredCount(updatedChapter)

    return updatedChapter
  })

  // Создаем новую статистику позиции
  const newStats: PositionStatistics = {
    ...stats,
    statistics: newStatistics,
    lastUpdated: new Date().toISOString()
  }

  // Пересчитываем общий балл
  newStats.overallScore = calculateOverallScore(newStats)

  return newStats
}

/**
 * Сбросить статистику всей позиции
 * Переинициализирует все вопросы (answerScore: null)
 *
 * @param position - Название позиции
 * @param guide - Interview guide для переинициализации
 */
export function resetPositionStatistics(_position: string, guide: InterviewGuide): void {
  const newStats = initializeStatistics(guide)
  savePositionStatistics(newStats)
}

/**
 * Сбросить статистику конкретной главы
 * Устанавливает answerScore: null для всех вопросов главы
 *
 * @param position - Название позиции
 * @param chapterNum - Номер главы
 * @param guide - Interview guide (для получения структуры)
 */
export function resetChapterStatistics(
  position: string,
  chapterNum: number,
  guide: InterviewGuide
): void {
  const stats = getPositionStatistics(position)
  if (!stats) {
    console.error(`Position statistics not found: ${position}`)
    return
  }

  // Находим главу в guide для получения структуры вопросов
  const guideChapter = guide.guide_chapters.find(ch => ch.chapter_number === chapterNum)
  if (!guideChapter) {
    console.error(`Chapter not found: ${chapterNum}`)
    return
  }

  // Сбрасываем статистику главы
  const newStatistics = stats.statistics.map((chapter: ChapterStatistics) => {
    if (chapter.chapterNumber !== chapterNum) {
      return chapter
    }

    // Сбрасываем все вопросы в null
    const resetQuestions = chapter.questions.map((question: QuestionStatistics) => ({
      ...question,
      answerScore: null
    }))

    const resetChapter: ChapterStatistics = {
      ...chapter,
      questions: resetQuestions,
      chapterScore: 0,
      answeredCount: 0
    }

    return resetChapter
  })

  const newStats: PositionStatistics = {
    ...stats,
    statistics: newStatistics,
    lastUpdated: new Date().toISOString()
  }

  // Пересчитываем общий балл
  newStats.overallScore = calculateOverallScore(newStats)

  savePositionStatistics(newStats)
}

/**
 * Сбросить оценку конкретного вопроса
 * Устанавливает answerScore: null
 *
 * @param position - Название позиции
 * @param chapterNum - Номер главы
 * @param questionNum - Номер вопроса
 */
export function resetQuestionScore(
  position: string,
  chapterNum: number,
  questionNum: number
): void {
  const stats = getPositionStatistics(position)
  if (!stats) {
    console.error(`Position statistics not found: ${position}`)
    return
  }

  const newStatistics = stats.statistics.map((chapter: ChapterStatistics) => {
    if (chapter.chapterNumber !== chapterNum) {
      return chapter
    }

    const newQuestions = chapter.questions.map((question: QuestionStatistics) => {
      if (question.questionNumber !== questionNum) {
        return question
      }

      return {
        ...question,
        answerScore: null
      }
    })

    const updatedChapter: ChapterStatistics = {
      ...chapter,
      questions: newQuestions
    }

    updatedChapter.chapterScore = calculateChapterScore(updatedChapter)
    updatedChapter.answeredCount = calculateAnsweredCount(updatedChapter)

    return updatedChapter
  })

  const newStats: PositionStatistics = {
    ...stats,
    statistics: newStatistics,
    lastUpdated: new Date().toISOString()
  }

  newStats.overallScore = calculateOverallScore(newStats)

  savePositionStatistics(newStats)
}

/**
 * Получить все статистики из localStorage
 * @returns Объект со всеми статистиками позиций
 */
export function getAllStatistics(): LocalStorageStatistics {
  return getStorageData()
}

/**
 * Удалить статистику позиции
 * @param position - Название позиции для удаления
 */
export function deletePositionStatistics(position: string): void {
  const allStats = getStorageData()
  delete allStats[position]
  setStorageData(allStats)
}

/**
 * Очистить все статистики
 * ОПАСНАЯ ОПЕРАЦИЯ! Используйте с осторожностью
 */
export function clearAllStatistics(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear localStorage:', error)
  }
}
