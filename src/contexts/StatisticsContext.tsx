/**
 * Statistics Context для управления статистикой позиций
 *
 * Предоставляет глобальное состояние и методы для:
 * - Загрузки статистики позиции
 * - Обновления оценок вопросов
 * - Сброса статистики (позиция, глава, вопрос)
 */

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { PositionStatistics, InterviewGuide } from '@/types'
import {
  getPositionStatistics,
  savePositionStatistics,
  initializeStatistics,
  updateQuestionScore,
  resetPositionStatistics,
  resetChapterStatistics,
  resetQuestionScore
} from '@/services/localStorage'

/**
 * Тип контекста статистики
 */
interface StatisticsContextType {
  /** Текущая выбранная позиция */
  currentPosition: string | null

  /** Статистика текущей позиции */
  statistics: PositionStatistics | null

  /**
   * Установить текущую позицию и загрузить её статистику
   * @param position - Название позиции
   * @param guide - Interview guide для инициализации (если статистика не существует)
   */
  setCurrentPosition: (position: string, guide: InterviewGuide) => void

  /**
   * Обновить оценку вопроса
   * @param chapterNum - Номер главы (chapter_number)
   * @param questionNum - Номер вопроса (question_number)
   * @param score - Оценка (0-5)
   */
  updateScore: (chapterNum: number, questionNum: number, score: number) => void

  /**
   * Сбросить всю статистику позиции
   * @param guide - Interview guide для переинициализации
   */
  resetPosition: (guide: InterviewGuide) => void

  /**
   * Сбросить статистику главы
   * @param chapterNum - Номер главы
   * @param guide - Interview guide для переинициализации
   */
  resetChapter: (chapterNum: number, guide: InterviewGuide) => void

  /**
   * Сбросить оценку конкретного вопроса
   * @param chapterNum - Номер главы
   * @param questionNum - Номер вопроса
   */
  resetQuestion: (chapterNum: number, questionNum: number) => void

  /**
   * Обновить статистику из localStorage (для синхронизации)
   */
  refreshStatistics: () => void
}

/**
 * Context для статистики
 */
const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined)

/**
 * Props для StatisticsProvider
 */
interface StatisticsProviderProps {
  children: React.ReactNode
}

/**
 * Provider для Statistics Context
 * @param props - Props компонента
 * @returns JSX элемент провайдера
 */
export function StatisticsProvider({ children }: StatisticsProviderProps): React.JSX.Element {
  const [currentPosition, setCurrentPositionState] = useState<string | null>(null)
  const [statistics, setStatistics] = useState<PositionStatistics | null>(null)

  /**
   * Установить текущую позицию и загрузить статистику
   */
  const setCurrentPosition = useCallback((position: string, guide: InterviewGuide): void => {
    setCurrentPositionState(position)
    let stats = getPositionStatistics(position)

    // Инициализировать если не существует
    if (!stats) {
      stats = initializeStatistics(guide)
      savePositionStatistics(stats)
    }

    setStatistics(stats)
  }, [])

  /**
   * Обновить оценку вопроса
   */
  const updateScore = useCallback((chapterNum: number, questionNum: number, score: number): void => {
    if (!statistics) {
      console.warn('Cannot update score: no statistics loaded')
      return
    }

    const updated = updateQuestionScore(statistics, chapterNum, questionNum, score)
    savePositionStatistics(updated)
    setStatistics(updated)
  }, [statistics])

  /**
   * Сбросить всю статистику позиции
   */
  const resetPosition = useCallback((guide: InterviewGuide): void => {
    if (!currentPosition) {
      console.warn('Cannot reset position: no position selected')
      return
    }

    resetPositionStatistics(currentPosition, guide)
    const stats = getPositionStatistics(currentPosition)
    setStatistics(stats)
  }, [currentPosition])

  /**
   * Сбросить статистику главы
   */
  const resetChapter = useCallback((chapterNum: number, guide: InterviewGuide): void => {
    if (!currentPosition) {
      console.warn('Cannot reset chapter: no position selected')
      return
    }

    resetChapterStatistics(currentPosition, chapterNum, guide)
    const stats = getPositionStatistics(currentPosition)
    setStatistics(stats)
  }, [currentPosition])

  /**
   * Сбросить оценку конкретного вопроса
   */
  const resetQuestion = useCallback((chapterNum: number, questionNum: number): void => {
    if (!currentPosition) {
      console.warn('Cannot reset question: no position selected')
      return
    }

    resetQuestionScore(currentPosition, chapterNum, questionNum)
    const stats = getPositionStatistics(currentPosition)
    setStatistics(stats)
  }, [currentPosition])

  /**
   * Обновить статистику из localStorage
   */
  const refreshStatistics = useCallback((): void => {
    if (!currentPosition) {
      console.warn('Cannot refresh statistics: no position selected')
      return
    }

    const stats = getPositionStatistics(currentPosition)
    setStatistics(stats)
  }, [currentPosition])

  const value: StatisticsContextType = {
    currentPosition,
    statistics,
    setCurrentPosition,
    updateScore,
    resetPosition,
    resetChapter,
    resetQuestion,
    refreshStatistics
  }

  return (
    <StatisticsContext.Provider value={value}>
      {children}
    </StatisticsContext.Provider>
  )
}

/**
 * Hook для использования Statistics Context
 * @throws Ошибка если используется вне StatisticsProvider
 * @returns Statistics context
 * @example
 * ```tsx
 * const { statistics, updateScore } = useStatistics();
 * ```
 */
export function useStatistics(): StatisticsContextType {
  const context = useContext(StatisticsContext)
  if (context === undefined) {
    throw new Error('useStatistics must be used within StatisticsProvider')
  }
  return context
}
