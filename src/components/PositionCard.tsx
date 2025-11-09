import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { InterviewGuide, PositionStatistics } from '@/types'

/**
 * Props интерфейс для PositionCard компонента
 */
interface PositionCardProps {
  /** Interview guide данные */
  guide: InterviewGuide
  /** Статистика позиции (если есть) */
  statistics?: PositionStatistics
  /** Callback при клике на карточку */
  onClick?: () => void
  /** Дополнительные CSS классы */
  className?: string
}

/**
 * Определяет variant для Badge на основе уровня сложности
 * @param level - уровень сложности
 * @returns соответствующий variant для Badge
 */
const getDifficultyVariant = (level?: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (!level) return 'secondary'

  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Junior': 'secondary',
    'Middle': 'default',
    'Senior': 'destructive',
    'Lead': 'destructive',
  }

  return variants[level] || 'secondary'
}

/**
 * Определяет текст кнопки на основе прогресса
 * @param progressPercent - процент выполнения
 * @returns текст для кнопки
 */
const getButtonText = (progressPercent: number): string => {
  if (progressPercent === 0) return 'Начать'
  if (progressPercent === 100) return 'Просмотреть'
  return 'Продолжить'
}

/**
 * Компонент карточки позиции для главной страницы
 *
 * Отображает:
 * - Название позиции
 * - Badge с уровнем сложности
 * - Количество вопросов и глав
 * - Средний балл (если есть статистика)
 * - Прогресс бар
 * - Кнопку действия
 *
 * @example
 * ```tsx
 * <PositionCard
 *   guide={guideData}
 *   statistics={stats}
 *   onClick={() => navigate(`/position/${guideData.guide_name}`)}
 * />
 * ```
 */
export default function PositionCard({
  guide,
  statistics,
  onClick,
  className,
}: PositionCardProps) {
  // Вычисляем прогресс
  const totalQuestions = guide.guide_metadata.total_questions
  const answeredCount = statistics?.statistics.reduce((sum, chapter) => sum + chapter.answeredCount, 0) ?? 0
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0

  // Средний балл
  const overallScore = statistics?.overallScore ?? 0

  return (
    <Card
      className={cn(
        // Base styles
        'group relative overflow-hidden',
        'h-full flex flex-col',
        'cursor-pointer',
        'transition-all duration-300',

        // Hover effects
        'hover:shadow-lg',
        'hover:border-primary',
        'hover:-translate-y-1',

        // Focus styles
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-ring',
        'focus-visible:ring-offset-2',

        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      aria-label={`${guide.guide_name}, уровень ${guide.guide_metadata.difficulty_level ?? 'не указан'}, ${answeredCount} из ${totalQuestions} вопросов отвечено`}
    >
      {/* Header */}
      <CardHeader className="pb-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl md:text-2xl font-bold line-clamp-2 leading-tight">
            {guide.guide_name}
          </CardTitle>

          <Badge
            variant={getDifficultyVariant(guide.guide_metadata.difficulty_level)}
            className="shrink-0"
          >
            {guide.guide_metadata.difficulty_level ?? 'N/A'}
          </Badge>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1 flex flex-col space-y-4 pt-0">
        {/* Metadata */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="shrink-0">📚</span>
            <span>{guide.guide_metadata.total_questions} вопросов</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="shrink-0">📖</span>
            <span>{guide.guide_metadata.total_chapters} глав</span>
          </div>
        </div>

        {/* Score Section */}
        <div className="p-3 bg-muted/50 rounded-lg border border-muted h-[58px] flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Средний балл
          </span>

          {overallScore > 0 ? (
            <div className="flex items-baseline gap-1">
              <span className="shrink-0">🏆</span>
              <span className="text-xl font-bold">
                {overallScore.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">/5</span>
            </div>
          ) : (
            <Badge variant="outline" className="text-xs">
              не начато
            </Badge>
          )}

          {/* Star Rating Visual */}
          {overallScore > 0 && (
            <div className="flex gap-0.5 mt-2 justify-end">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-colors',
                    star <= Math.round(overallScore)
                      ? 'bg-primary'
                      : 'bg-muted-foreground/20'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div className="space-y-2 mt-auto">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <span className="shrink-0">📈</span>
              Прогресс
            </span>
            <span className="font-medium">
              {answeredCount}/{totalQuestions}
              <span className="text-muted-foreground ml-1">
                ({progressPercent}%)
              </span>
            </span>
          </div>

          <Progress
            value={progressPercent}
            className="h-2"
            aria-label={`Прогресс выполнения: ${progressPercent}%`}
          />
        </div>

        {/* Action Button */}
        <Button
          className="w-full mt-2"
          variant="default"
          size="default"
          onClick={(e) => {
            e.stopPropagation()
            onClick?.()
          }}
        >
          {getButtonText(progressPercent)}
        </Button>
      </CardContent>

      {/* Hover Indicator */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  )
}
