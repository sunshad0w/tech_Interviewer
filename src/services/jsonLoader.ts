/**
 * JSON Loading Service для загрузки interview guides
 *
 * Использует dynamic import для code splitting
 * Загружает JSON файлы из директории jsons/
 */

import type { InterviewGuide, GuideMetadata } from '@/types/interview'

/**
 * Метаданные guide для отображения на главной странице
 */
export interface GuideListItem {
  /** Имя файла (например, "react_guide_2025-11-08_13-02.json") */
  filename: string

  /** Название позиции из guide_name */
  position: string

  /** Метаданные guide */
  metadata: GuideMetadata
}

/**
 * Список доступных interview guides
 * ВАЖНО: При добавлении новых JSON файлов обновить этот массив
 */
const AVAILABLE_GUIDES: string[] = [
  'react.json',
  'angular.json',
  'nodejs.json',
  'vue.json',
  'typescript.json'
]

/**
 * Загрузить interview guide из JSON файла
 *
 * @param filename - Имя файла (например, "react_guide_2025-11-08_13-02.json")
 * @returns Promise с загруженным interview guide
 * @throws Error если файл не найден или некорректен
 *
 * @example
 * ```typescript
 * const guide = await loadInterviewGuide('react_guide_2025-11-08_13-02.json')
 * console.log(guide.guide_name)
 * ```
 */
export async function loadInterviewGuide(filename: string): Promise<InterviewGuide> {
  try {
    // Dynamic import для code splitting
    // Vite обработает это как отдельный chunk
    const module = await import(/* @vite-ignore */ `../../jsons/${filename}`)

    // Валидация базовой структуры
    const guide = module.default as InterviewGuide

    if (!guide.guide_name || !guide.guide_metadata || !guide.guide_chapters) {
      throw new Error(`Invalid guide structure in ${filename}`)
    }

    return guide
  } catch (error) {
    console.error(`Failed to load interview guide: ${filename}`, error)
    throw new Error(
      `Guide "${filename}" not found or invalid. Please check the file exists in jsons/ directory.`
    )
  }
}

/**
 * Получить список всех доступных JSON файлов
 *
 * @returns Массив имен файлов
 *
 * @example
 * ```typescript
 * const guides = getAllGuides()
 * // ['react_guide_2025-11-08_13-02.json', 'angular_guide_2025-11-08_13-26.json', ...]
 * ```
 */
export function getAllGuides(): string[] {
  return [...AVAILABLE_GUIDES]
}

/**
 * Получить metadata всех guides (для HomePage)
 * Загружает только необходимую информацию для отображения карточек
 *
 * @returns Promise с массивом метаданных всех guides
 *
 * @example
 * ```typescript
 * const metadata = await getAllGuidesMetadata()
 * metadata.forEach(item => {
 *   console.log(item.position, item.metadata.difficulty_level)
 * })
 * ```
 */
export async function getAllGuidesMetadata(): Promise<GuideListItem[]> {
  const filenames = getAllGuides()

  // Загружаем все guides параллельно
  const promises = filenames.map(async (filename): Promise<GuideListItem | null> => {
    try {
      const guide = await loadInterviewGuide(filename)
      return {
        filename,
        position: guide.guide_name,
        metadata: guide.guide_metadata
      }
    } catch (error) {
      console.error(`Failed to load metadata for ${filename}:`, error)
      return null
    }
  })

  const results = await Promise.all(promises)

  // Фильтруем неудачные загрузки
  return results.filter((item): item is GuideListItem => item !== null)
}

/**
 * Проверить, существует ли guide с указанным именем файла
 *
 * @param filename - Имя файла для проверки
 * @returns true если файл существует в списке доступных guides
 *
 * @example
 * ```typescript
 * if (isGuideAvailable('react_guide_2025-11-08_13-02.json')) {
 *   const guide = await loadInterviewGuide('react_guide_2025-11-08_13-02.json')
 * }
 * ```
 */
export function isGuideAvailable(filename: string): boolean {
  return AVAILABLE_GUIDES.includes(filename)
}

/**
 * Получить краткую информацию о guide по имени файла
 * Без полной загрузки guide (только из списка AVAILABLE_GUIDES)
 *
 * @param filename - Имя файла
 * @returns Объект с информацией или null если не найден
 *
 * @example
 * ```typescript
 * const info = getGuideInfo('react_guide_2025-11-08_13-02.json')
 * console.log(info?.shortName) // 'react'
 * ```
 */
export function getGuideInfo(filename: string): {
  filename: string
  shortName: string
  date: string
} | null {
  if (!isGuideAvailable(filename)) {
    return null
  }

  // Парсим имя файла формата: <name>_guide_YYYY-MM-DD_HH-mm.json
  const match = filename.match(/^(.+?)_guide_(\d{4}-\d{2}-\d{2})_/)

  if (!match) {
    return {
      filename,
      shortName: filename.replace('.json', ''),
      date: 'unknown'
    }
  }

  return {
    filename,
    shortName: match[1], // например, 'react'
    date: match[2] // например, '2025-11-08'
  }
}
