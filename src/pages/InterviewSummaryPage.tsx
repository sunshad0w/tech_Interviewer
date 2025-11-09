import { useParams, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useInterview } from '@/contexts'
import { usePositionData } from '@/hooks/usePositionData'
import { Button, Card, Badge, Separator } from '@/components/ui'
import type { ChapterStatistics } from '@/types'

/**
 * Props для страницы итогов интервью
 */
interface InterviewSummaryParams extends Record<string, string | undefined> {
  positionName: string
}

/**
 * Статистика главы для отображения в резюме
 */
interface ChapterSummary {
  chapterNumber: number
  chapterTitle: string
  answeredCount: number
  totalQuestions: number
  averageScore: number
  progressPercent: number
}

/**
 * Распределение оценок
 */
interface ScoreDistribution {
  excellent: number  // 5
  good: number       // 4
  average: number    // 3
  poor: number       // 1-2
  none: number       // 0
}

/**
 * Получить текстовый лейбл оценки
 * @param score - Средний балл
 * @returns Текстовое описание
 */
function getScoreLabel(score: number): string {
  if (score >= 4.5) return 'Отлично'
  if (score >= 3.5) return 'Хорошо'
  if (score >= 2.5) return 'Удовлетворительно'
  if (score >= 1.5) return 'Слабо'
  return 'Очень слабо'
}

/**
 * Получить цвет бэйджа по оценке
 * @param score - Средний балл
 * @returns Tailwind классы цвета
 */
function getScoreColor(score: number): string {
  if (score >= 4.0) return 'bg-green-500 text-white dark:bg-green-600'
  if (score >= 3.0) return 'bg-blue-500 text-white dark:bg-blue-600'
  if (score >= 2.0) return 'bg-yellow-500 text-white dark:bg-yellow-600'
  if (score >= 1.0) return 'bg-orange-500 text-white dark:bg-orange-600'
  return 'bg-red-500 text-white dark:bg-red-600'
}

/**
 * Получить цвет прогресс-бара по оценке
 * @param score - Средний балл
 * @returns Tailwind классы
 */
function getProgressColor(score: number): string {
  if (score >= 4.0) return 'bg-green-500 dark:bg-green-600'
  if (score >= 3.0) return 'bg-blue-500 dark:bg-blue-600'
  if (score >= 2.0) return 'bg-yellow-500 dark:bg-yellow-600'
  if (score >= 1.0) return 'bg-orange-500 dark:bg-orange-600'
  return 'bg-red-500 dark:bg-red-600'
}

/**
 * Отрисовать звездный рейтинг
 * @param score - Средний балл (0-5)
 * @returns JSX элемент со звездами
 */
function renderStars(score: number): React.JSX.Element {
  const fullStars = Math.floor(score)
  const hasHalfStar = score % 1 >= 0.5

  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          // Полная звезда
          return (
            <svg
              key={i}
              className="h-5 w-5 fill-yellow-400 text-yellow-400"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )
        } else if (i === fullStars && hasHalfStar) {
          // Половина звезды
          return (
            <svg
              key={i}
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id={`half-${i}`}>
                  <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#half-${i})`}
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          )
        } else {
          // Пустая звезда
          return (
            <svg
              key={i}
              className="h-5 w-5 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )
        }
      })}
    </div>
  )
}

/**
 * Вычислить распределение оценок
 * @param statistics - Статистика по главам
 * @returns Распределение оценок
 */
function calculateScoreDistribution(statistics: ChapterStatistics[]): ScoreDistribution {
  const distribution: ScoreDistribution = {
    excellent: 0,
    good: 0,
    average: 0,
    poor: 0,
    none: 0
  }

  for (const chapter of statistics) {
    for (const question of chapter.questions) {
      if (question.answerScore === null) continue

      if (question.answerScore === 5) {
        distribution.excellent++
      } else if (question.answerScore === 4) {
        distribution.good++
      } else if (question.answerScore === 3) {
        distribution.average++
      } else if (question.answerScore >= 1) {
        distribution.poor++
      } else {
        distribution.none++
      }
    }
  }

  return distribution
}

/**
 * Вычислить длительность сессии
 * @param startTime - Timestamp начала
 * @returns Форматированная строка
 */
function formatDuration(startTime: number): string {
  const now = Date.now()
  const durationMs = now - startTime
  const minutes = Math.floor(durationMs / 60000)

  if (minutes < 1) return 'меньше минуты'
  if (minutes === 1) return '1 минута'
  if (minutes < 5) return `${minutes} минуты`
  return `${minutes} минут`
}

/**
 * Страница итогов завершенного интервью
 *
 * @description
 * Отображает результаты пройденной сессии интервью:
 * - Общая статистика (количество ответов, средний балл, длительность)
 * - Распределение оценок с визуализацией
 * - Детальная статистика по каждой главе
 * - Анализ слабых и сильных сторон
 * - Рекомендации для улучшения
 * - Кнопки для продолжения работы
 *
 * @example
 * ```tsx
 * // Роут: /interview-summary/:positionName
 * <Route
 *   path="/interview-summary/:positionName"
 *   element={<InterviewSummaryPage />}
 * />
 * ```
 */
export default function InterviewSummaryPage() {
  const { positionName } = useParams<InterviewSummaryParams>()
  const navigate = useNavigate()
  const { sessionStats, exitInterview } = useInterview()
  const { guide, statistics, loading } = usePositionData(positionName || '')

  /**
   * Вычислить статистику глав на основе sessionStats или localStorage
   */
  const chapterSummaries = useMemo((): ChapterSummary[] => {
    if (!guide || !statistics) return []

    return guide.guide_chapters
      .map(chapter => {
        const chapterStat = statistics.statistics.find(
          s => s.chapterNumber === chapter.chapter_number
        )

        if (!chapterStat) return null

        const answeredQuestions = chapterStat.questions.filter(
          q => q.answerScore !== null
        )

        const averageScore = answeredQuestions.length > 0
          ? answeredQuestions.reduce((sum, q) => sum + (q.answerScore || 0), 0) / answeredQuestions.length
          : 0

        return {
          chapterNumber: chapter.chapter_number,
          chapterTitle: chapter.chapter_title,
          answeredCount: answeredQuestions.length,
          totalQuestions: chapterStat.totalQuestions,
          averageScore,
          progressPercent: Math.round((answeredQuestions.length / chapterStat.totalQuestions) * 100)
        }
      })
      .filter((s): s is ChapterSummary => s !== null && s.answeredCount > 0)
  }, [guide, statistics])

  /**
   * Распределение оценок
   */
  const scoreDistribution = useMemo((): ScoreDistribution => {
    if (!statistics) {
      return { excellent: 0, good: 0, average: 0, poor: 0, none: 0 }
    }
    return calculateScoreDistribution(statistics.statistics)
  }, [statistics])

  /**
   * Общее количество отвеченных вопросов
   */
  const totalAnswered = useMemo((): number => {
    return Object.values(scoreDistribution).reduce((sum, count) => sum + count, 0)
  }, [scoreDistribution])

  /**
   * Средний балл (из sessionStats или вычислить из statistics)
   */
  const averageScore = useMemo((): number => {
    if (sessionStats.questionsAnswered > 0) {
      return sessionStats.averageScore
    }
    if (statistics) {
      return statistics.overallScore
    }
    return 0
  }, [sessionStats, statistics])

  /**
   * Количество отвеченных вопросов (из sessionStats или statistics)
   */
  const questionsAnswered = useMemo((): number => {
    if (sessionStats.questionsAnswered > 0) {
      return sessionStats.questionsAnswered
    }
    return totalAnswered
  }, [sessionStats, totalAnswered])

  /**
   * Общее количество вопросов
   */
  const totalQuestions = useMemo((): number => {
    if (sessionStats.totalQuestions > 0) {
      return sessionStats.totalQuestions
    }
    if (guide) {
      return guide.guide_metadata.total_questions
    }
    return 0
  }, [sessionStats, guide])

  /**
   * Слабые главы (средний балл < 3.0)
   */
  const weakChapters = useMemo((): ChapterSummary[] => {
    return chapterSummaries.filter(ch => ch.averageScore < 3.0 && ch.answeredCount > 0)
  }, [chapterSummaries])

  /**
   * Сильные главы (средний балл >= 4.0)
   */
  const strongChapters = useMemo((): ChapterSummary[] => {
    return chapterSummaries.filter(ch => ch.averageScore >= 4.0)
  }, [chapterSummaries])

  /**
   * Начать новое интервью
   */
  const handleStartNewInterview = () => {
    exitInterview()
    navigate(`/interview/${encodeURIComponent(positionName || '')}`)
  }

  /**
   * Вернуться к обзору позиции
   */
  const handleReturnToOverview = () => {
    exitInterview()
    navigate(`/position/${encodeURIComponent(positionName || '')}`)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-muted-foreground">Загрузка статистики...</div>
        </div>
      </div>
    )
  }

  // Error state
  if (!guide || !statistics) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-destructive mb-4">Ошибка загрузки данных</div>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{guide.guide_name}</h1>
              <p className="text-sm text-muted-foreground">Итоги интервью</p>
            </div>
            <Button
              variant="outline"
              onClick={handleReturnToOverview}
            >
              К обзору позиции
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <h2 className="text-4xl font-bold">Отличная работа!</h2>
            <p className="text-xl text-muted-foreground">
              Вы завершили интервью
            </p>
          </div>

          {/* Overall Statistics Card */}
          <Card className="p-6">
            <h3 className="text-2xl font-semibold mb-6">Общая статистика</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {/* Answered Questions */}
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{questionsAnswered}</div>
                <div className="text-sm text-muted-foreground">
                  Отвечено вопросов из {totalQuestions}
                </div>
              </div>

              {/* Average Score */}
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {averageScore > 0 ? averageScore.toFixed(1) : '-'}
                  <span className="text-xl text-muted-foreground">/5.0</span>
                </div>
                <div className="text-sm text-muted-foreground">Средний балл</div>
                {averageScore > 0 && (
                  <div className="mt-2 flex items-center justify-center gap-2">
                    {renderStars(averageScore)}
                  </div>
                )}
              </div>

              {/* Duration */}
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {sessionStats.startTime > 0
                    ? formatDuration(sessionStats.startTime)
                    : '-'}
                </div>
                <div className="text-sm text-muted-foreground">Продолжительность</div>
              </div>
            </div>

            {/* Score Distribution */}
            {totalAnswered > 0 && (
              <>
                <Separator className="my-6" />
                <h4 className="text-lg font-semibold mb-4">Распределение оценок</h4>
                <div className="space-y-3">
                  {[
                    {
                      label: 'Отлично (5)',
                      count: scoreDistribution.excellent,
                      color: 'bg-green-500 dark:bg-green-600'
                    },
                    {
                      label: 'Хорошо (4)',
                      count: scoreDistribution.good,
                      color: 'bg-blue-500 dark:bg-blue-600'
                    },
                    {
                      label: 'Удовлетворительно (3)',
                      count: scoreDistribution.average,
                      color: 'bg-yellow-500 dark:bg-yellow-600'
                    },
                    {
                      label: 'Слабо (1-2)',
                      count: scoreDistribution.poor,
                      color: 'bg-orange-500 dark:bg-orange-600'
                    },
                    {
                      label: 'Очень слабо (0)',
                      count: scoreDistribution.none,
                      color: 'bg-red-500 dark:bg-red-600'
                    }
                  ].map(item => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-semibold">{item.count}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${item.color}`}
                          style={{ width: `${totalAnswered > 0 ? (item.count / totalAnswered) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Card>

          {/* Chapter Breakdown */}
          {chapterSummaries.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Статистика по главам</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapterSummaries.map(chapter => (
                  <Card key={chapter.chapterNumber} className="p-6">
                    <h4 className="text-lg font-semibold mb-4">
                      Глава {chapter.chapterNumber}: {chapter.chapterTitle}
                    </h4>

                    <div className="space-y-4">
                      {/* Statistics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Отвечено</div>
                          <div className="text-2xl font-bold">
                            {chapter.answeredCount}/{chapter.totalQuestions}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Средний балл</div>
                          <div className="text-2xl font-bold">
                            {chapter.averageScore.toFixed(1)}/5.0
                          </div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-semibold">{chapter.progressPercent}%</span>
                        </div>
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${getProgressColor(chapter.averageScore)}`}
                            style={{ width: `${chapter.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Score indicator */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {renderStars(chapter.averageScore)}
                        </div>
                        <Badge className={getScoreColor(chapter.averageScore)}>
                          {getScoreLabel(chapter.averageScore)}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Рекомендации</h3>

            {/* Weak Areas */}
            {weakChapters.length > 0 && (
              <div className="rounded-lg border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 p-6">
                <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Слабые стороны</span>
                </h4>
                <p className="text-sm mb-4 text-muted-foreground">
                  Рекомендуем уделить особое внимание следующим темам:
                </p>
                <ul className="space-y-2">
                  {weakChapters.map(chapter => (
                    <li key={chapter.chapterNumber} className="text-sm">
                      • <strong>{chapter.chapterTitle}</strong>{' '}
                      <span className="text-muted-foreground">
                        (балл: {chapter.averageScore.toFixed(1)})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Strong Areas */}
            {strongChapters.length > 0 && (
              <div className="rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-950/30 p-6">
                <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span>✅</span>
                  <span>Сильные стороны</span>
                </h4>
                <p className="text-sm mb-4 text-muted-foreground">
                  Вы показали отличные результаты в следующих темах:
                </p>
                <ul className="space-y-2">
                  {strongChapters.map(chapter => (
                    <li key={chapter.chapterNumber} className="text-sm">
                      • <strong>{chapter.chapterTitle}</strong>{' '}
                      <span className="text-muted-foreground">
                        (балл: {chapter.averageScore.toFixed(1)})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* General Recommendations */}
            {weakChapters.length === 0 && strongChapters.length === 0 && (
              <div className="rounded-lg border bg-card p-6">
                <h4 className="text-lg font-semibold mb-2">💡 Общие рекомендации</h4>
                <p className="text-sm text-muted-foreground">
                  {averageScore >= 4
                    ? 'Отличный результат! Продолжайте практиковаться и углублять свои знания.'
                    : averageScore >= 2.5
                    ? 'Хороший прогресс! Продолжайте изучение материала и повторяйте сложные темы.'
                    : 'Продолжайте учиться! Начните с базовых концепций и постепенно углубляйте знания.'}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={handleStartNewInterview}
              className="flex-1"
            >
              Начать новое интервью
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleReturnToOverview}
              className="flex-1"
            >
              Вернуться к обзору
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Ваша статистика сохранена. Вы можете вернуться к обзору позиции,
              чтобы посмотреть детальную статистику по главам и вопросам.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
