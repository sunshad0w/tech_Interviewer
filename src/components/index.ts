/**
 * Централизованный экспорт всех UI компонентов
 *
 * Основные компоненты приложения:
 * - PositionCard: карточка позиции на главной странице
 * - RatingSlider: слайдер для оценки ответа (0-5)
 * - ChapterAccordion: раскрываемый список глав с вопросами
 * - QuestionDisplay: отображение вопроса с ответом
 * - MarkdownRenderer: рендеринг markdown с syntax highlighting
 * - Breadcrumb: навигация по иерархии (Position > Chapter > Question)
 * - MigrationDialog: диалог для миграции данных в SQLite
 */

export { default as PositionCard } from './PositionCard'
export { default as RatingSlider } from './RatingSlider'
export { default as ChapterAccordion } from './ChapterAccordion'
export { default as QuestionDisplay } from './QuestionDisplay'
export { default as MarkdownRenderer } from './MarkdownRenderer'
export { default as Breadcrumb } from './Breadcrumb'
export { default as MigrationDialog } from './MigrationDialog'
