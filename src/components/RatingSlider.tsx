import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

/**
 * Props интерфейс для RatingSlider компонента
 */
interface RatingSliderProps {
  /** Текущее значение оценки (0-5) или null если не выбрано */
  value: number | null
  /** Callback при изменении значения */
  onChange: (value: number) => void
  /** Callback при подтверждении оценки */
  onSubmit: () => void
  /** Флаг загрузки (disabled submit button) */
  isSubmitting?: boolean
  /** Режим интервью (меняет текст кнопки) */
  isInterviewMode?: boolean
  /** Disabled состояние */
  disabled?: boolean
  /** Показывать ли labels над слайдером */
  showLabels?: boolean
  /** Показывать ли описания оценок */
  showDescription?: boolean
  /** Дополнительные CSS классы */
  className?: string
}

/**
 * Описания для каждой оценки
 */
const SCORE_LABELS: Record<number, { label: string; shortLabel: string }> = {
  0: { label: 'Совсем не знает ответ', shortLabel: 'Не знаю' },
  1: { label: 'Минимальное понимание', shortLabel: 'Мин.' },
  2: { label: 'Частичное понимание', shortLabel: 'Частично' },
  3: { label: 'Среднее знание', shortLabel: 'Средне' },
  4: { label: 'Хорошее знание', shortLabel: 'Хорошо' },
  5: { label: 'Полный ответ', shortLabel: 'Отлично' },
}

/**
 * Диапазоны оценок с описаниями и цветами
 */
const SCORE_DESCRIPTIONS = [
  { range: [0], text: 'Совсем не знает ответ', color: 'text-muted-foreground' },
  { range: [1, 2], text: 'Частичное понимание', color: 'text-orange-500' },
  { range: [3, 4], text: 'Хорошее знание', color: 'text-blue-500' },
  { range: [5], text: 'Полный ответ', color: 'text-green-600 dark:text-green-500' },
]

/**
 * Компонент слайдера для оценки ответа пользователя
 *
 * Позволяет оценить свой ответ по шкале 0-5:
 * - 0: Совсем не знает ответ
 * - 1-2: Частичное понимание
 * - 3-4: Хорошее знание
 * - 5: Полный ответ
 *
 * Поддерживает:
 * - Слайдер для выбора
 * - Кнопки-кружки для быстрого выбора
 * - Keyboard navigation
 * - Визуальные подсказки
 *
 * @example
 * ```tsx
 * const [rating, setRating] = useState<number | null>(null)
 *
 * <RatingSlider
 *   value={rating}
 *   onChange={setRating}
 *   onSubmit={handleSubmit}
 *   isInterviewMode={true}
 * />
 * ```
 */
export default function RatingSlider({
  value,
  onChange,
  onSubmit,
  isSubmitting = false,
  isInterviewMode = false,
  disabled = false,
  showLabels = true,
  showDescription = true,
  className,
}: RatingSliderProps) {
  const [isTouched, setIsTouched] = useState(false)

  // Получаем текущее описание оценки
  const getCurrentDescription = () => {
    if (value === null) return null

    return SCORE_DESCRIPTIONS.find((desc) =>
      desc.range.includes(value)
    )
  }

  const currentDesc = getCurrentDescription()

  // Handler для изменения слайдера
  const handleSliderChange = (newValue: number[]) => {
    if (!isTouched) setIsTouched(true)
    onChange(newValue[0])
  }

  // Handler для клика по кружку
  const handleCircleClick = (score: number) => {
    if (!isTouched) setIsTouched(true)
    onChange(score)
  }

  // Handler для submit
  const handleSubmit = () => {
    if (value === null || disabled || isSubmitting) return
    onSubmit()
  }

  return (
    <Card className={cn('max-w-4xl mx-auto', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="shrink-0">📊</span>
          Как вы оцениваете свой ответ?
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Slider */}
        <div className="space-y-4">
          <div className="px-2">
            {/* Labels above slider */}
            {showLabels && (
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Совсем не знает ответ</span>
                <span>Полный ответ</span>
              </div>
            )}

            {/* Slider */}
            <Slider
              value={value !== null ? [value] : [0]}
              onValueChange={handleSliderChange}
              min={0}
              max={5}
              step={1}
              disabled={disabled}
              className={cn(
                'w-full cursor-pointer touch-none',
                value !== null && 'opacity-100',
                value === null && 'opacity-50'
              )}
              aria-label="Оценка вашего ответа от 0 до 5"
              aria-valuemin={0}
              aria-valuemax={5}
              aria-valuenow={value ?? 0}
              aria-valuetext={value !== null ? SCORE_LABELS[value].label : 'не выбрано'}
            />

            {/* Number labels below slider */}
            <div className="flex items-center justify-between mt-2 px-1">
              {[0, 1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => handleCircleClick(score)}
                  disabled={disabled}
                  className={cn(
                    'text-xs font-medium transition-colors',
                    'hover:text-primary cursor-pointer',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    'rounded px-1',
                    value === score && 'text-primary font-bold scale-110',
                    disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  aria-label={`Выбрать оценку ${score}: ${SCORE_LABELS[score].label}`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Score Indicators (Circles) */}
          <div className="flex items-center justify-center gap-2 md:gap-3 py-4">
            {[0, 1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                onClick={() => handleCircleClick(score)}
                disabled={disabled}
                className={cn(
                  // Base styles
                  'w-10 h-10 md:w-12 md:h-12',
                  'rounded-full border-2',
                  'flex items-center justify-center',
                  'font-semibold text-sm md:text-base',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

                  // Active state
                  value === score && [
                    'border-primary bg-primary text-primary-foreground',
                    'scale-110 shadow-lg shadow-primary/25',
                  ],

                  // Inactive state
                  value !== score && [
                    'border-muted-foreground/30 bg-background',
                    'hover:border-primary/50 hover:bg-primary/5 hover:scale-105',
                  ],

                  // Disabled state
                  disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
                )}
                aria-label={`Оценка ${score}: ${SCORE_LABELS[score].label}`}
                aria-pressed={value === score}
              >
                {score}
              </button>
            ))}
          </div>

          {/* Current Selection Display */}
          {value !== null && currentDesc && (
            <div
              className={cn(
                'text-center py-2 px-4 rounded-lg bg-muted/50',
                'transition-colors duration-200',
                isTouched && 'animate-in fade-in slide-in-from-top-1'
              )}
            >
              <p className={cn('font-medium', currentDesc.color)}>
                {currentDesc.text}
              </p>
            </div>
          )}
        </div>

        {/* Score Descriptions */}
        {showDescription && (
          <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
            {SCORE_DESCRIPTIONS.map((desc, idx) => {
              const isActive = value !== null && desc.range.includes(value)

              return (
                <div
                  key={idx}
                  className={cn(
                    'flex items-start gap-2 transition-all duration-200',
                    isActive && 'font-medium',
                    isActive && desc.color
                  )}
                >
                  <span className="font-semibold shrink-0">
                    {desc.range.length === 1 ? desc.range[0] : `${desc.range[0]}-${desc.range[1]}`}
                  </span>
                  <span>—</span>
                  <span className="flex-1">{desc.text}</span>
                  {isActive && <span className="shrink-0 text-primary">✓</span>}
                </div>
              )
            })}
          </div>
        )}

        {/* Submit Button */}
        <Button
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={value === null || disabled || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Сохранение...
            </>
          ) : isInterviewMode ? (
            <>
              Сохранить оценку и продолжить
              <span className="ml-2">→</span>
            </>
          ) : (
            'Сохранить оценку'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
