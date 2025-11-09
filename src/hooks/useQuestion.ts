/**
 * Custom hook для загрузки и работы с отдельным вопросом
 *
 * Загружает guide через usePositionData и находит конкретный вопрос
 * по параметрам chapterNumber и questionNumber
 */

import { useMemo } from 'react'
import { usePositionData } from './usePositionData'
import type { Question, Chapter } from '@/types/interview'
import type { QuestionStatistics } from '@/types/statistics'

/**
 * Интерфейс для навигации между вопросами
 */
export interface QuestionNavigation {
  /** Есть ли предыдущий вопрос */
  hasPrevious: boolean
  /** Есть ли следующий вопрос */
  hasNext: boolean
  /** Предыдущий вопрос (chapterNumber, questionNumber) */
  previousQuestion: { chapterNumber: number; questionNumber: number } | null
  /** Следующий вопрос (chapterNumber, questionNumber) */
  nextQuestion: { chapterNumber: number; questionNumber: number } | null
}

/**
 * Интерфейс результата хука
 */
export interface UseQuestionResult {
  /** Interview guide (если загружен) */
  guide: ReturnType<typeof usePositionData>['guide']
  /** Текущая глава */
  chapter: Chapter | null
  /** Текущий вопрос */
  question: Question | null
  /** Статистика по текущему вопросу */
  questionStats: QuestionStatistics | null
  /** Навигация между вопросами */
  navigation: QuestionNavigation
  /** Загрузка */
  loading: boolean
  /** Ошибка */
  error: string | null
  /** Весь объект статистики позиции */
  statistics: ReturnType<typeof usePositionData>['statistics']
  /** Summary stats для отображения */
  summaryStats: ReturnType<typeof usePositionData>['summaryStats']
}

/**
 * Custom hook для работы с отдельным вопросом
 *
 * @param positionName - Название позиции из route
 * @param chapterNumber - Номер главы (chapter_number)
 * @param questionNumber - Номер вопроса (question_number, глобальный)
 * @returns Объект с данными вопроса, статистикой и навигацией
 *
 * @example
 * ```tsx
 * const { question, questionStats, navigation, loading, error } = useQuestion(
 *   'React Developer',
 *   1,
 *   5
 * )
 * ```
 */
export function useQuestion(
  positionName: string,
  chapterNumber: number,
  questionNumber: number
): UseQuestionResult {
  // Загружаем данные позиции
  const { guide, statistics, summaryStats, loading, error } = usePositionData(positionName)

  // Мемоизируем поиск главы и вопроса
  const { chapter, question } = useMemo(() => {
    if (!guide) {
      return { chapter: null, question: null }
    }

    // Ищем главу по chapter_number
    const foundChapter = guide.guide_chapters.find(
      (ch) => ch.chapter_number === chapterNumber
    )

    if (!foundChapter) {
      return { chapter: null, question: null }
    }

    // Ищем вопрос по question_number (глобальный номер)
    const foundQuestion = foundChapter.questions.find(
      (q) => q.question_number === questionNumber
    )

    return {
      chapter: foundChapter,
      question: foundQuestion || null,
    }
  }, [guide, chapterNumber, questionNumber])

  // Мемоизируем статистику вопроса
  const questionStats = useMemo(() => {
    if (!statistics || !chapter || !question) {
      return null
    }

    // Находим статистику главы
    const chapterStats = statistics.statistics.find(
      (ch) => ch.chapterNumber === chapterNumber
    )

    if (!chapterStats) {
      return null
    }

    // Находим статистику вопроса
    const qStats = chapterStats.questions.find(
      (q) => q.questionNumber === questionNumber
    )

    return qStats || null
  }, [statistics, chapter, question, chapterNumber, questionNumber])

  // Мемоизируем навигацию
  const navigation = useMemo(() => {
    if (!guide) {
      return {
        hasPrevious: false,
        hasNext: false,
        previousQuestion: null,
        nextQuestion: null,
      }
    }

    // Создаем плоский список всех вопросов с их координатами
    const allQuestions = guide.guide_chapters.flatMap((ch) =>
      ch.questions.map((q) => ({
        chapterNumber: ch.chapter_number,
        questionNumber: q.question_number,
      }))
    )

    // Находим текущий индекс
    const currentIndex = allQuestions.findIndex(
      (q) =>
        q.chapterNumber === chapterNumber &&
        q.questionNumber === questionNumber
    )

    // Если не нашли текущий вопрос
    if (currentIndex === -1) {
      return {
        hasPrevious: false,
        hasNext: false,
        previousQuestion: null,
        nextQuestion: null,
      }
    }

    const hasPrevious = currentIndex > 0
    const hasNext = currentIndex < allQuestions.length - 1

    return {
      hasPrevious,
      hasNext,
      previousQuestion: hasPrevious ? allQuestions[currentIndex - 1] : null,
      nextQuestion: hasNext ? allQuestions[currentIndex + 1] : null,
    }
  }, [guide, chapterNumber, questionNumber])

  return {
    guide,
    chapter,
    question,
    questionStats,
    navigation,
    loading,
    error,
    statistics,
    summaryStats,
  }
}
