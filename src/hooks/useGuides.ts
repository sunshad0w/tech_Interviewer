/**
 * Custom hook для загрузки всех interview guides с их статистикой
 *
 * Загружает все доступные guides из jsons/ директории
 * и подгружает соответствующую статистику из localStorage
 *
 * @example
 * ```tsx
 * function HomePage() {
 *   const { guides, loading, error, refetch } = useGuides()
 *
 *   if (loading) return <LoadingSpinner />
 *   if (error) return <ErrorMessage error={error} />
 *
 *   return guides.map(({ guide, statistics }) => (
 *     <PositionCard key={guide.guide_name} guide={guide} statistics={statistics} />
 *   ))
 * }
 * ```
 */

import { useState, useEffect, useCallback } from 'react'
import { getGuides as getGuidesAdapter } from '@/database/adapter'
import type { InterviewGuide, PositionStatistics } from '@/types'

/**
 * Интерфейс для guide с загруженной статистикой
 */
export interface GuideWithStats {
  /** Загруженный interview guide */
  guide: InterviewGuide

  /** Статистика позиции (null если еще не начата) */
  statistics: PositionStatistics | null

  /** Имя файла guide */
  filename: string
}

/**
 * Возвращаемый интерфейс useGuides hook
 */
export interface UseGuidesReturn {
  /** Массив guides с их статистикой */
  guides: GuideWithStats[]

  /** Флаг загрузки */
  loading: boolean

  /** Ошибка загрузки (если есть) */
  error: string | null

  /** Функция для перезагрузки guides */
  refetch: () => void
}

/**
 * Hook для загрузки всех interview guides с их статистикой из localStorage
 *
 * @returns {UseGuidesReturn} Объект с guides, loading state, error и refetch функцией
 */
export function useGuides(): UseGuidesReturn {
  const [guides, setGuides] = useState<GuideWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refetchCounter, setRefetchCounter] = useState(0)

  // Функция для перезагрузки данных
  const refetch = useCallback(() => {
    setRefetchCounter((prev) => prev + 1)
  }, [])

  useEffect(() => {
    async function fetchGuides() {
      try {
        setLoading(true)
        setError(null)

        // Используем адаптер для получения guides (SQLite или JSON + localStorage)
        const guidesData = await getGuidesAdapter()

        if (guidesData.length === 0) {
          setGuides([])
          setLoading(false)
          return
        }

        // Преобразуем в формат GuideWithStats
        const validGuides = guidesData.map(({ guide, statistics }) => ({
          guide,
          statistics,
          filename: guide.guide_name + '.json',
        }))

        setGuides(validGuides)
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Неизвестная ошибка при загрузке guides'
        setError(errorMessage)
        console.error('Error loading guides:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGuides()
  }, [refetchCounter])

  return {
    guides,
    loading,
    error,
    refetch
  }
}
