/**
 * Interview Context для управления состоянием интервью
 *
 * Управляет:
 * - Сессией интервью (старт, выход, следующий вопрос)
 * - Weighted randomization (приоритет вопросам с низкими оценками)
 * - Статистикой сессии (количество ответов, средний балл)
 * - Интеграция со StatisticsContext для сохранения оценок
 */

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { Question, InterviewGuide, PositionStatistics } from '@/types'

/**
 * Вопрос с метаданными для weighted randomization
 */
interface QuestionWithMeta {
  question: Question
  chapterNumber: number
  currentScore: number | null
  weight: number
}

/**
 * Статистика текущей сессии интервью
 */
interface SessionStats {
  /** Количество отвеченных вопросов в сессии */
  questionsAnswered: number

  /** Общая сумма баллов в сессии */
  totalScore: number

  /** Средний балл в сессии */
  averageScore: number

  /** Всего вопросов в интервью */
  totalQuestions: number

  /** Время начала сессии (timestamp) */
  startTime: number
}

/**
 * Тип контекста интервью
 */
interface InterviewContextType {
  /** Режим интервью активен */
  isInterviewMode: boolean

  /** Текущий вопрос */
  currentQuestion: Question | null

  /** Номер главы текущего вопроса */
  currentChapterNumber: number | null

  /** Фильтр по главе (null = все главы) */
  chapterFilter: number | null

  /** Статистика текущей сессии */
  sessionStats: SessionStats

  /**
   * Начать интервью
   * @param guide - Interview guide
   * @param statistics - Position statistics для weighted randomization
   * @param chapterFilter - Номер главы для фильтрации (опционально)
   */
  startInterview: (
    guide: InterviewGuide,
    statistics: PositionStatistics,
    chapterFilter?: number
  ) => void

  /**
   * Перейти к следующему вопросу
   * Автоматически завершает интервью если вопросы закончились
   */
  nextQuestion: () => void

  /**
   * Отправить ответ на вопрос
   * @param score - Оценка (0-5)
   */
  submitAnswer: (score: number) => void

  /**
   * Выйти из режима интервью
   */
  exitInterview: () => void

  /**
   * Поставить интервью на паузу
   * TODO: Реализовать в будущем
   */
  pauseInterview: () => void

  /**
   * Возобновить интервью
   * TODO: Реализовать в будущем
   */
  resumeInterview: () => void
}

/**
 * Context для интервью
 */
const InterviewContext = createContext<InterviewContextType | undefined>(undefined)

/**
 * Props для InterviewProvider
 */
interface InterviewProviderProps {
  children: React.ReactNode
}

/**
 * Provider для Interview Context
 * @param props - Props компонента
 * @returns JSX элемент провайдера
 */
export function InterviewProvider({ children }: InterviewProviderProps): React.JSX.Element {
  const [isInterviewMode, setIsInterviewMode] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [currentChapterNumber, setCurrentChapterNumber] = useState<number | null>(null)
  const [chapterFilter, setChapterFilter] = useState<number | null>(null)
  const [questionPool, setQuestionPool] = useState<QuestionWithMeta[]>([])
  const [askedQuestions, setAskedQuestions] = useState<Set<number>>(new Set())
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    questionsAnswered: 0,
    totalScore: 0,
    averageScore: 0,
    totalQuestions: 0,
    startTime: 0
  })

  /**
   * Вычислить вес вопроса на основе текущей оценки
   * Формула: (5 - score)²
   * - null/0 → вес 25 (максимальный приоритет)
   * - 1 → вес 16
   * - 2 → вес 9
   * - 3 → вес 4
   * - 4 → вес 1
   * - 5 → вес 0 (минимальный приоритет, но не исключается)
   */
  const calculateWeight = useCallback((score: number | null): number => {
    const effectiveScore = score ?? 0
    return Math.pow(5 - effectiveScore, 2)
  }, [])

  /**
   * Выбрать следующий вопрос с учетом весов
   * Использует weighted random selection
   */
  const selectNextQuestion = useCallback((): QuestionWithMeta | null => {
    // Фильтруем вопросы, которые еще не задавались
    const availableQuestions = questionPool.filter(
      q => !askedQuestions.has(q.question.question_number)
    )

    if (availableQuestions.length === 0) {
      return null
    }

    // Если остался один вопрос, возвращаем его
    if (availableQuestions.length === 1) {
      return availableQuestions[0]
    }

    // Weighted random selection
    const totalWeight = availableQuestions.reduce((sum, q) => sum + q.weight, 0)

    // Если все веса 0, выбираем случайно
    if (totalWeight === 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length)
      return availableQuestions[randomIndex]
    }

    // Выбираем случайное число от 0 до totalWeight
    let random = Math.random() * totalWeight

    // Находим вопрос соответствующий этому весу
    for (const question of availableQuestions) {
      random -= question.weight
      if (random <= 0) {
        return question
      }
    }

    // Fallback (не должно случиться)
    return availableQuestions[0]
  }, [questionPool, askedQuestions])

  /**
   * Начать интервью с weighted randomization
   */
  const startInterview = useCallback((
    guide: InterviewGuide,
    statistics: PositionStatistics,
    filter?: number
  ): void => {
    setChapterFilter(filter ?? null)

    // Собрать вопросы с метаданными для weighted randomization
    const questionsWithMeta: QuestionWithMeta[] = []

    const chaptersToInclude = filter !== undefined
      ? guide.guide_chapters.filter(ch => ch.chapter_number === filter)
      : guide.guide_chapters

    if (chaptersToInclude.length === 0) {
      console.warn(`No chapters found for filter: ${filter}`)
      return
    }

    // Создаем пул вопросов с весами
    for (const chapter of chaptersToInclude) {
      // Находим статистику главы
      const chapterStats = statistics.statistics.find(
        cs => cs.chapterNumber === chapter.chapter_number
      )

      for (const question of chapter.questions) {
        // Находим текущую оценку вопроса
        const questionStats = chapterStats?.questions.find(
          qs => qs.questionNumber === question.question_number
        )

        const currentScore = questionStats?.answerScore ?? null
        const weight = calculateWeight(currentScore)

        questionsWithMeta.push({
          question,
          chapterNumber: chapter.chapter_number,
          currentScore,
          weight
        })
      }
    }

    if (questionsWithMeta.length === 0) {
      console.warn('No questions found for interview')
      return
    }

    // Инициализируем состояние
    setQuestionPool(questionsWithMeta)
    setAskedQuestions(new Set())

    // Выбираем первый вопрос
    const firstQuestion = selectNextQuestionFromPool(questionsWithMeta, new Set())
    if (firstQuestion) {
      setCurrentQuestion(firstQuestion.question)
      setCurrentChapterNumber(firstQuestion.chapterNumber)
      setAskedQuestions(new Set([firstQuestion.question.question_number]))
    }

    setIsInterviewMode(true)
    setSessionStats({
      questionsAnswered: 0,
      totalScore: 0,
      averageScore: 0,
      totalQuestions: questionsWithMeta.length,
      startTime: Date.now()
    })
  }, [calculateWeight])

  /**
   * Вспомогательная функция для выбора вопроса из пула
   */
  const selectNextQuestionFromPool = (
    pool: QuestionWithMeta[],
    asked: Set<number>
  ): QuestionWithMeta | null => {
    const availableQuestions = pool.filter(
      q => !asked.has(q.question.question_number)
    )

    if (availableQuestions.length === 0) {
      return null
    }

    if (availableQuestions.length === 1) {
      return availableQuestions[0]
    }

    const totalWeight = availableQuestions.reduce((sum, q) => sum + q.weight, 0)

    if (totalWeight === 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length)
      return availableQuestions[randomIndex]
    }

    let random = Math.random() * totalWeight

    for (const question of availableQuestions) {
      random -= question.weight
      if (random <= 0) {
        return question
      }
    }

    return availableQuestions[0]
  }

  /**
   * Отправить ответ и обновить статистику сессии
   */
  const submitAnswer = useCallback((score: number): void => {
    if (score < 0 || score > 5) {
      console.error(`Invalid score: ${score}. Score must be between 0 and 5`)
      return
    }

    setSessionStats(prev => {
      const newTotal = prev.totalScore + score
      const newAnswered = prev.questionsAnswered + 1
      return {
        ...prev,
        questionsAnswered: newAnswered,
        totalScore: newTotal,
        averageScore: Number((newTotal / newAnswered).toFixed(2))
      }
    })
  }, [])

  /**
   * Перейти к следующему вопросу с weighted randomization
   */
  const nextQuestion = useCallback((): void => {
    const nextQ = selectNextQuestion()

    if (nextQ) {
      setCurrentQuestion(nextQ.question)
      setCurrentChapterNumber(nextQ.chapterNumber)
      setAskedQuestions(prev => new Set([...prev, nextQ.question.question_number]))
    } else {
      // Интервью завершено
      setIsInterviewMode(false)
      setCurrentQuestion(null)
      setCurrentChapterNumber(null)
    }
  }, [selectNextQuestion])

  /**
   * Выйти из режима интервью
   */
  const exitInterview = useCallback((): void => {
    setIsInterviewMode(false)
    setCurrentQuestion(null)
    setCurrentChapterNumber(null)
    setQuestionPool([])
    setAskedQuestions(new Set())
    setChapterFilter(null)
  }, [])

  /**
   * Поставить интервью на паузу
   * TODO: Реализовать в будущем (сохранить состояние, показать диалог)
   */
  const pauseInterview = useCallback((): void => {
    console.log('Pause interview - not implemented yet')
    // Будущая реализация: показать диалог паузы, сохранить состояние
  }, [])

  /**
   * Возобновить интервью
   * TODO: Реализовать в будущем (восстановить состояние)
   */
  const resumeInterview = useCallback((): void => {
    console.log('Resume interview - not implemented yet')
    // Будущая реализация: восстановить состояние из сохраненного
  }, [])

  const value: InterviewContextType = {
    isInterviewMode,
    currentQuestion,
    currentChapterNumber,
    chapterFilter,
    sessionStats,
    startInterview,
    nextQuestion,
    submitAnswer,
    exitInterview,
    pauseInterview,
    resumeInterview
  }

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  )
}

/**
 * Hook для использования Interview Context
 * @throws Ошибка если используется вне InterviewProvider
 * @returns Interview context
 * @example
 * ```tsx
 * const { startInterview, currentQuestion } = useInterview();
 * ```
 */
export function useInterview(): InterviewContextType {
  const context = useContext(InterviewContext)
  if (context === undefined) {
    throw new Error('useInterview must be used within InterviewProvider')
  }
  return context
}
