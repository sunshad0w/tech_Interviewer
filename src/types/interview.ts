/**
 * TypeScript интерфейсы для Interview Guides
 * Основано на GUIDE_JSON_SCHEMA.md
 */

/**
 * Уровень сложности гайда или вопроса
 */
export type DifficultyLevel = 'Junior' | 'Middle' | 'Senior' | 'Lead'

/**
 * Тип ресурса
 */
export type ResourceType = 'documentation' | 'tutorial' | 'video' | 'blog' | 'book' | 'course' | 'other'

/**
 * Тип контента подсекции
 */
export type SubsectionType = 'explanation' | 'example' | 'comparison' | 'code' | 'table' | 'list'

/**
 * Метаданные interview guide
 */
export interface GuideMetadata {
  /** Дата создания (формат: YYYY-MM-DD) */
  created_date: string

  /** Последнее обновление (формат: YYYY-MM-DD) */
  updated_date?: string

  /** Целевая аудитория (например, "Senior React разработчики") */
  target_audience: string

  /** Охваченные версии технологии (например, "React 18.x") */
  covered_versions: string

  /** Язык гайда */
  language: string

  /** Общее количество вопросов */
  total_questions: number

  /** Общее количество разделов */
  total_chapters: number

  /** Теги для категоризации */
  tags?: string[]

  /** Уровень сложности */
  difficulty_level?: DifficultyLevel
}

/**
 * Элемент оглавления
 */
export interface TableOfContents {
  /** Номер раздела */
  chapter_number: number

  /** Название раздела */
  chapter_title: string

  /** Якорь для навигации */
  anchor: string

  /** Количество вопросов в разделе */
  questions_count: number

  /** Диапазон номеров вопросов (например, "1-10") */
  questions_range?: string
}

/**
 * Подсекция внутри ответа
 */
export interface AnswerSubsection {
  /** Заголовок подсекции */
  subsection_title: string

  /** Содержимое подсекции в markdown */
  subsection_content_markdown: string

  /** Тип контента (для группировки) */
  subsection_type?: SubsectionType
}

/**
 * Вопрос с ответом
 */
export interface Question {
  /** Глобальный номер вопроса (сквозная нумерация) */
  question_number: number

  /** Номер вопроса внутри раздела */
  question_number_in_chapter: number

  /** Номер раздела, к которому относится вопрос */
  question_chapter: number

  /** Заголовок вопроса (сам текст вопроса) */
  question_title: string

  /** Полный ответ в формате markdown (включает таблицы, код, примеры) */
  answer_markdown: string

  /** Подсекции внутри ответа (опционально, для детализации) */
  answer_subsections?: AnswerSubsection[]

  /** Best Practices (массив строк в markdown) */
  best_practices: string[]

  /** Теги для вопроса */
  tags?: string[]

  /** Уровень сложности вопроса */
  difficulty?: DifficultyLevel
}

/**
 * Раздел (глава) гайда с вопросами
 */
export interface Chapter {
  /** Номер раздела */
  chapter_number: number

  /** Название раздела */
  chapter_title: string

  /** Описание раздела (markdown) */
  chapter_description?: string

  /** Количество вопросов в разделе */
  questions_count: number

  /** Массив вопросов */
  questions: Question[]
}

/**
 * Полезный ресурс
 */
export interface Resource {
  /** Название ресурса */
  title: string

  /** URL ресурса */
  url: string

  /** Описание */
  description?: string

  /** Тип ресурса */
  type?: ResourceType
}

/**
 * Заключение гайда
 */
export interface Conclusion {
  /** Ключевые темы для подготовки (markdown) */
  key_topics_markdown: string

  /** Рекомендации по подготовке (markdown) */
  recommendations_markdown: string

  /** Полезные ресурсы */
  useful_resources: Resource[]

  /** Финальные метаданные (если отличаются от основных) */
  final_metadata?: Partial<GuideMetadata>
}

/**
 * Полная структура Interview Guide
 */
export interface InterviewGuide {
  /** Метаданные гайда */
  guide_metadata: GuideMetadata

  /** Название гайда */
  guide_name: string

  /** Описание гайда (введение) - markdown */
  guide_description: string

  /** Оглавление */
  guide_table_of_contents: TableOfContents[]

  /** Разделы с вопросами */
  guide_chapters: Chapter[]

  /** Заключение */
  guide_conclusion: Conclusion
}
