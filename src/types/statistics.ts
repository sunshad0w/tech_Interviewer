/**
 * TypeScript интерфейсы для Statistics
 * Используется для отслеживания прогресса пользователя
 */

/**
 * Статистика отдельного вопроса
 */
export interface QuestionStatistics {
  /** Название вопроса */
  questionTitle: string

  /** Номер вопроса */
  questionNumber: number

  /**
   * Оценка ответа пользователя
   * - null: вопрос не был отвечен
   * - 0: пользователь совсем не знает ответ
   * - 1-2: частичное понимание
   * - 3-4: хорошее знание
   * - 5: полный ответ
   */
  answerScore: number | null
}

/**
 * Статистика главы (раздела)
 */
export interface ChapterStatistics {
  /** Название главы */
  chapterTitle: string

  /** Номер главы */
  chapterNumber: number

  /**
   * Средний балл главы
   * Вычисляется как среднее по всем отвеченным вопросам (игнорируя null)
   */
  chapterScore: number

  /**
   * Количество отвеченных вопросов
   * Используется для отображения прогресса (X/Y answered)
   */
  answeredCount: number

  /** Общее количество вопросов в главе */
  totalQuestions: number

  /** Массив статистики по вопросам */
  questions: QuestionStatistics[]
}

/**
 * Статистика позиции (interview guide)
 */
export interface PositionStatistics {
  /** Название позиции */
  position: string

  /** Имя исходного JSON файла */
  sourceJsonFile: string

  /**
   * Общий средний балл позиции
   * Вычисляется как среднее по всем главам
   */
  overallScore: number

  /** Временная метка последнего обновления (ISO 8601) */
  lastUpdated: string

  /** Массив статистики по главам */
  statistics: ChapterStatistics[]
}

/**
 * Структура хранения всех статистик в localStorage
 * Key: название позиции
 * Value: статистика позиции
 */
export interface LocalStorageStatistics {
  [positionName: string]: PositionStatistics
}
