/**
 * Database Adapter
 *
 * Адаптер для переключения между JSON/localStorage и SQLite
 * Обеспечивает обратную совместимость и плавный переход
 */

import { sqliteService } from './sqliteService'
import {
  getAllGuides,
  getGuideByName,
  getPositionStatistics,
  updateQuestionScore,
  resetPositionStatistics,
  resetChapterStatistics,
} from './dbQueries'
import { loadGuideFromJSON, getAllJSONGuides } from '@/services/jsonLoader'
import {
  getPositionStatistics as getStatsFromLocalStorage,
  updateQuestionScore as updateScoreInLocalStorage,
  resetPositionStatistics as resetPositionInLocalStorage,
  resetChapterStatistics as resetChapterInLocalStorage,
} from '@/services/localStorage'
import type { InterviewGuide, PositionStatistics } from '@/types'

const MIGRATION_FLAG = 'interviewer_sqlite_migrated'

/**
 * Проверить, был ли выполнен переход на SQLite
 */
export function isSQLiteEnabled(): boolean {
  return localStorage.getItem(MIGRATION_FLAG) === 'true' && sqliteService.isInitialized()
}

/**
 * Установить флаг миграции
 */
export function setSQLiteEnabled(enabled: boolean): void {
  if (enabled) {
    localStorage.setItem(MIGRATION_FLAG, 'true')
  } else {
    localStorage.removeItem(MIGRATION_FLAG)
  }
}

/**
 * Получить все guides
 */
export async function getGuides(): Promise<
  Array<{
    guide: InterviewGuide
    statistics: PositionStatistics | null
  }>
> {
  if (isSQLiteEnabled()) {
    // Использовать SQLite
    const guidesData = getAllGuides()

    return guidesData.map((g) => {
      const guide = getGuideByName(g.guide_name)
      const statistics = getPositionStatistics(g.guide_name)

      return {
        guide: guide!,
        statistics,
      }
    })
  } else {
    // Использовать JSON + localStorage (старый метод)
    return await getAllJSONGuides()
  }
}

/**
 * Получить guide по имени
 */
export async function getGuide(guideName: string): Promise<InterviewGuide | null> {
  if (isSQLiteEnabled()) {
    return getGuideByName(guideName)
  } else {
    return await loadGuideFromJSON(guideName)
  }
}

/**
 * Получить статистику позиции
 */
export function getStatistics(guideName: string): PositionStatistics | null {
  if (isSQLiteEnabled()) {
    return getPositionStatistics(guideName)
  } else {
    return getStatsFromLocalStorage(guideName)
  }
}

/**
 * Обновить оценку вопроса
 */
export function updateScore(
  guideName: string,
  chapterNumber: number,
  questionNumber: number,
  score: number
): void {
  if (isSQLiteEnabled()) {
    updateQuestionScore(guideName, chapterNumber, questionNumber, score)
  } else {
    const guide = { guide_name: guideName } as InterviewGuide
    updateScoreInLocalStorage(guide, chapterNumber, questionNumber, score)
  }
}

/**
 * Сбросить статистику позиции
 */
export function resetPosition(guideName: string): void {
  if (isSQLiteEnabled()) {
    resetPositionStatistics(guideName)
  } else {
    const guide = { guide_name: guideName } as InterviewGuide
    resetPositionInLocalStorage(guide)
  }
}

/**
 * Сбросить статистику главы
 */
export function resetChapter(guideName: string, chapterNumber: number): void {
  if (isSQLiteEnabled()) {
    resetChapterStatistics(guideName, chapterNumber)
  } else {
    const guide = { guide_name: guideName } as InterviewGuide
    resetChapterInLocalStorage(chapterNumber, guide)
  }
}
