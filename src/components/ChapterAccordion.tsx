import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { Chapter, ChapterStatistics, Question, QuestionStatistics } from '@/types'

/**
 * Props интерфейс для ChapterAccordion компонента
 */
interface ChapterAccordionProps {
  /** Данные главы */
  chapter: Chapter
  /** Статистика главы */
  chapterStats: ChapterStatistics
  /** Callback при клике на вопрос */
  onQuestionClick: (chapterNumber: number, questionNumber: number) => void
  /** Callback при клике на trigger главы (опционально) */
  onChapterClick?: (chapterNumber: number) => void
  /** Дополнительные CSS классы */
  className?: string
}

/**
 * Props для QuestionListItem
 */
interface QuestionListItemProps {
  /** Данные вопроса */
  question: Question
  /** Статистика вопроса */
  stats?: QuestionStatistics
  /** Callback при клике */
  onClick: () => void
  /** Дополнительные CSS классы */
  className?: string
}

/**
 * Компонент элемента списка вопросов
 *
 * Отображает:
 * - Номер вопроса
 * - Название вопроса
 * - Оценку (если отвечено) или badge "не отвечено"
 * - Визуальные звездочки для оценки
 */
function QuestionListItem({ question, stats, onClick, className }: QuestionListItemProps) {
  const hasScore = stats?.answerScore !== null && stats?.answerScore !== undefined

  return (
    <button
      onClick={onClick}
      className={cn(
        // Base styles
        'w-full group',
        'flex items-center justify-between gap-3',
        'px-3 py-2.5',
        'rounded-md',
        'text-left',
        'transition-colors duration-200',
        'cursor-pointer',

        // Hover
        'hover:bg-muted',

        // Focus
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-ring',
        'focus-visible:ring-offset-2',

        className
      )}
      aria-label={`${question.question_title}, ${hasScore ? `оценка ${stats?.answerScore} из 5` : 'не отвечено'}`}
    >
      {/* Left Side - Question Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Question Number */}
        <span className="text-xs font-medium text-muted-foreground shrink-0 w-8">
          {question.question_number_in_chapter}
        </span>

        {/* Question Title */}
        <span className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
          {question.question_title}
        </span>
      </div>

      {/* Right Side - Score */}
      <div className="shrink-0">
        {hasScore ? (
          <div className="flex items-center gap-2">
            {/* Score Stars */}
            <div className="hidden sm:flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-colors',
                    star <= (stats?.answerScore ?? 0)
                      ? 'bg-primary'
                      : 'bg-muted-foreground/20'
                  )}
                />
              ))}
            </div>

            {/* Score Number */}
            <span className="text-sm font-semibold min-w-[2rem] text-right">
              {stats?.answerScore}/5
            </span>
          </div>
        ) : (
          <Badge variant="outline" className="text-xs">
            не отвечено
          </Badge>
        )}
      </div>
    </button>
  )
}

/**
 * Компонент раскрываемого списка главы с вопросами
 *
 * Отображает:
 * - Заголовок главы с номером
 * - Описание главы (если есть)
 * - Статистику (количество вопросов, балл, прогресс)
 * - Список вопросов при раскрытии
 * - Прогресс бар (если глава начата)
 *
 * @example
 * ```tsx
 * <Accordion type="multiple" value={expanded}>
 *   {chapters.map(chapter => (
 *     <ChapterAccordion
 *       key={chapter.chapter_number}
 *       chapter={chapter}
 *       chapterStats={getChapterStats(chapter.chapter_number)}
 *       onQuestionClick={handleQuestionClick}
 *     />
 *   ))}
 * </Accordion>
 * ```
 */
export default function ChapterAccordion({
  chapter,
  chapterStats,
  onQuestionClick,
  onChapterClick,
  className,
}: ChapterAccordionProps) {
  const progressPercent = Math.round(
    (chapterStats.answeredCount / chapterStats.totalQuestions) * 100
  )

  const hasScore = chapterStats.answeredCount > 0

  return (
    <AccordionItem
      value={`chapter-${chapter.chapter_number}`}
      className={cn('border rounded-lg overflow-hidden mb-3 last:mb-0', className)}
    >
      <AccordionTrigger
        className={cn(
          'hover:no-underline hover:bg-muted/50 transition-colors px-4 py-4 cursor-pointer',
          '[&[data-state=open]]:bg-muted/30'
        )}
        onClick={() => onChapterClick?.(chapter.chapter_number)}
      >
        <div className="flex items-center justify-between w-full pr-4">
          {/* Left Side - Chapter Info */}
          <div className="flex items-center gap-3 text-left flex-1 min-w-0">
            {/* Chapter Number Badge */}
            <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {chapter.chapter_number}
              </span>
            </div>

            {/* Chapter Title */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold leading-tight pr-2">
                {chapter.chapter_title}
              </h3>

              {/* Chapter Description (if exists) */}
              {chapter.chapter_description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {chapter.chapter_description}
                </p>
              )}
            </div>
          </div>

          {/* Right Side - Stats (Desktop) */}
          <div className="hidden md:flex items-center gap-4 shrink-0 text-sm text-muted-foreground">
            {/* Questions Count */}
            <div className="flex items-center gap-1.5">
              <span className="shrink-0">📚</span>
              <span>{chapter.questions.length} вопросов</span>
            </div>

            {/* Score */}
            {hasScore && (
              <div className="flex items-center gap-1.5">
                <span className="shrink-0">🏆</span>
                <span className="font-medium text-foreground">
                  {chapterStats.chapterScore.toFixed(1)}
                </span>
              </div>
            )}

            {/* Progress */}
            <div className="flex items-center gap-1.5">
              <span className={cn('shrink-0', hasScore ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground')}>
                ✓
              </span>
              <span className={hasScore ? 'font-medium text-foreground' : ''}>
                {chapterStats.answeredCount}/{chapterStats.totalQuestions}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Stats (below title) */}
        <div className="flex md:hidden items-center gap-3 text-xs text-muted-foreground mt-2 pr-4">
          <span className="flex items-center gap-1">
            <span className="shrink-0">📚</span>
            {chapter.questions.length}
          </span>

          {hasScore && (
            <>
              <span className="flex items-center gap-1">
                <span className="shrink-0">🏆</span>
                {chapterStats.chapterScore.toFixed(1)}
              </span>

              <span className="flex items-center gap-1">
                <span className="shrink-0 text-green-600 dark:text-green-500">✓</span>
                {chapterStats.answeredCount}/{chapterStats.totalQuestions}
              </span>
            </>
          )}

          {!hasScore && (
            <Badge variant="outline" className="text-xs">
              не начато
            </Badge>
          )}
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-4 pb-4 pt-2">
        <div className="space-y-1">
          {/* Progress Bar (if started) */}
          {hasScore && (
            <div className="mb-4 px-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                <span>Прогресс главы</span>
                <span className="font-medium">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-1.5" />
            </div>
          )}

          {/* Questions List */}
          {chapter.questions.map((question) => {
            const questionStat = chapterStats.questions.find(
              (q) => q.questionNumber === question.question_number
            )

            return (
              <QuestionListItem
                key={question.question_number}
                question={question}
                stats={questionStat}
                onClick={() => onQuestionClick(chapter.chapter_number, question.question_number)}
              />
            )
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
