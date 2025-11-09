import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useInterview, useStatistics } from '@/contexts'
import { usePositionData } from '@/hooks/usePositionData'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import QuestionDisplay from '@/components/QuestionDisplay'
import RatingSlider from '@/components/RatingSlider'
import { Moon, Sun, X } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

/**
 * Страница режима интервью с weighted randomization
 *
 * @description
 * Основной режим прохождения интервью:
 * - Вопросы выбираются случайно с учетом весов (низкие оценки = выше вероятность)
 * - Вес вопроса = (5 - score)²
 * - Показывает один вопрос за раз
 * - После оценки АВТОМАТИЧЕСКИ переходит к следующему вопросу (instant, no delay)
 * - Отслеживает прогресс сессии
 * - Можно фильтровать по главам
 *
 * @example
 * ```tsx
 * // Роут: /interview/:positionName?chapter=1
 * <Route path="/interview/:positionName" element={<InterviewPage />} />
 * ```
 */
export default function InterviewPage() {
  const { positionName } = useParams<{ positionName: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { theme, setTheme } = useTheme()

  // Contexts
  const {
    isInterviewMode,
    currentQuestion,
    currentChapterNumber,
    sessionStats,
    startInterview,
    nextQuestion,
    submitAnswer,
    exitInterview
  } = useInterview()

  const { updateScore } = useStatistics()

  // Data loading
  const { guide, statistics, loading, error } = usePositionData(positionName ?? '')

  // Local state
  const [showAnswer, setShowAnswer] = useState(false)
  const [currentRating, setCurrentRating] = useState<number | null>(null)
  const [exitDialogOpen, setExitDialogOpen] = useState(false)

  /**
   * Initialize interview on mount
   */
  useEffect(() => {
    if (guide && statistics && !isInterviewMode && !loading) {
      const chapterFilter = searchParams.get('chapter')
      const chapterNum = chapterFilter ? Number(chapterFilter) : undefined

      startInterview(guide, statistics, chapterNum)
    }
  }, [guide, statistics, loading, searchParams])

  /**
   * Reset state when question changes
   * IMPORTANT: Depend on question_number to ensure effect runs on every question change
   */
  useEffect(() => {
    if (currentQuestion) {
      setShowAnswer(false)
      setCurrentRating(null)
    }
  }, [currentQuestion?.question_number])

  /**
   * Handle rating submission with auto-advance
   * CRITICAL: Instant transition, no delay, no loading spinner
   */
  const handleRatingSubmit = () => {
    if (currentRating === null || !currentQuestion || currentChapterNumber === null) {
      return
    }

    // Save to statistics (localStorage)
    updateScore(currentChapterNumber, currentQuestion.question_number, currentRating)

    // Update session stats
    submitAnswer(currentRating)

    // Auto-advance to next question IMMEDIATELY
    nextQuestion()

    // State will reset via useEffect when currentQuestion changes
  }

  /**
   * Handle exit interview
   */
  const handleExit = () => {
    exitInterview()
    navigate(`/position/${positionName}`)
  }

  /**
   * Get current chapter info
   */
  const getCurrentChapter = () => {
    if (!guide || currentChapterNumber === null) return null

    return guide.guide_chapters.find(ch => ch.chapter_number === currentChapterNumber)
  }

  const currentChapter = getCurrentChapter()

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin text-6xl">⏳</div>
          <p className="text-lg text-muted-foreground">Загрузка интервью...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !guide || !statistics) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold">Ошибка загрузки</h2>
          <p className="text-muted-foreground">{error || 'Не удалось загрузить данные'}</p>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    )
  }

  // Interview complete screen
  if (isInterviewMode && !currentQuestion) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
          <div className="text-center space-y-8">
            <div className="text-8xl animate-bounce">🎉</div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Интервью завершено!</h1>
              <p className="text-xl text-muted-foreground">Отличная работа!</p>
            </div>

            {/* Session Summary */}
            <div className="bg-card border rounded-lg p-6 space-y-4 max-w-md mx-auto">
              <h3 className="text-lg font-semibold">Результаты сессии</h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Вопросов отвечено:</span>
                  <span className="font-bold text-lg">
                    {sessionStats.questionsAnswered} / {sessionStats.totalQuestions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Средний балл:</span>
                  <span className="font-bold text-lg text-primary">
                    {sessionStats.averageScore.toFixed(1)} / 5.0
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate(`/position/${positionName}`)}
              >
                Вернуться к обзору позиции
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/')}
              >
                На главную
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // No question available (shouldn't happen if interview started correctly)
  if (!currentQuestion || currentChapterNumber === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">Загрузка вопроса...</p>
        </div>
      </div>
    )
  }

  // Calculate progress
  const progressPercentage = sessionStats.totalQuestions > 0
    ? (sessionStats.questionsAnswered / sessionStats.totalQuestions) * 100
    : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Position Name */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-xl font-bold truncate">
                {guide.guide_name}
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                Вопрос {sessionStats.questionsAnswered + 1} из {sessionStats.totalQuestions}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Переключить тему"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Exit Button */}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setExitDialogOpen(true)}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Завершить</span>
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 space-y-1">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Прогресс: {Math.round(progressPercentage)}%</span>
              {sessionStats.questionsAnswered > 0 && (
                <span>Средний балл: {sessionStats.averageScore.toFixed(1)}/5.0</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Chapter Badge */}
        {currentChapter && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              Глава {currentChapter.chapter_number}: {currentChapter.chapter_title}
            </Badge>
          </div>
        )}

        {/* Question Display */}
        <QuestionDisplay
          question={currentQuestion}
          chapterNumber={currentChapterNumber}
          showAnswer={showAnswer}
          onShowAnswer={() => setShowAnswer(true)}
        />

        {/* Rating Section (only after answer shown) */}
        {showAnswer && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <RatingSlider
              value={currentRating}
              onChange={setCurrentRating}
              onSubmit={handleRatingSubmit}
              isInterviewMode={true}
              showLabels={true}
              showDescription={true}
            />
          </div>
        )}
      </div>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={exitDialogOpen} onOpenChange={setExitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Завершить интервью?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Вы ответили на <strong>{sessionStats.questionsAnswered}</strong> из{' '}
                <strong>{sessionStats.totalQuestions}</strong> вопросов.
              </p>
              {sessionStats.questionsAnswered > 0 && (
                <p>
                  Средний балл: <strong>{sessionStats.averageScore.toFixed(1)}/5.0</strong>
                </p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                Прогресс будет сохранен в статистике.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Продолжить интервью</AlertDialogCancel>
            <AlertDialogAction onClick={handleExit}>
              Завершить и выйти
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
