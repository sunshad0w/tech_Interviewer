/**
 * Question Page - Просмотр отдельного вопроса
 *
 * Страница для просмотра и оценки отдельного вопроса (вне режима интервью).
 * Доступна при клике на вопрос в Table of Contents.
 *
 * Функционал:
 * - Отображение вопроса с markdown ответом
 * - Оценка ответа (0-5)
 * - Навигация между вопросами (Previous/Next)
 * - Breadcrumb навигация
 * - Сохранение оценки в localStorage
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button, Skeleton, toast } from '@/components/ui'
import { useTheme } from '@/contexts/ThemeContext'
import { useStatistics } from '@/contexts/StatisticsContext'
import { useQuestion } from '@/hooks/useQuestion'
import QuestionDisplay from '@/components/QuestionDisplay'
import RatingSlider from '@/components/RatingSlider'
import Breadcrumb, { type BreadcrumbItem } from '@/components/Breadcrumb'
import { cn } from '@/lib/utils'
import { Moon, Sun, ArrowLeft, Home } from 'lucide-react'

/**
 * Props для route параметров
 */
interface QuestionPageParams extends Record<string, string | undefined> {
  positionName: string
  chapterNum: string
  questionNum: string
}

/**
 * Страница отдельного вопроса
 *
 * Route: /question/:positionName/:chapterNum/:questionNum
 *
 * @returns JSX элемент страницы
 */
export default function QuestionPage() {
  // ✅ ВСЕ ХУКИ В НАЧАЛЕ (Rules of Hooks)
  const { positionName, chapterNum, questionNum } = useParams<QuestionPageParams>()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const { setCurrentPosition, updateScore } = useStatistics()

  // State для рейтинга
  const [currentRating, setCurrentRating] = useState<number>(0)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isAnswerVisible, setIsAnswerVisible] = useState(false)

  // Парсим параметры маршрута
  const chapterNumber = Number(chapterNum)
  const questionNumber = Number(questionNum)

  // Валидация параметров (НО НЕ EARLY RETURN!)
  const hasInvalidParams = !positionName || isNaN(chapterNumber) || isNaN(questionNumber)

  // Загружаем данные вопроса (хук всегда вызывается, даже с невалидными параметрами)
  const {
    guide,
    chapter,
    question,
    questionStats,
    navigation,
    loading,
    error,
    statistics,
  } = useQuestion(positionName || '', chapterNumber, questionNumber)

  // Устанавливаем текущую позицию в StatisticsContext
  useEffect(() => {
    if (guide && positionName) {
      setCurrentPosition(positionName, guide)
    }
  }, [guide, positionName, setCurrentPosition])

  // Инициализируем рейтинг из статистики
  useEffect(() => {
    if (questionStats) {
      setCurrentRating(questionStats.answerScore ?? 0)
    }
  }, [questionStats])

  // Сбрасываем видимость ответа при переходе к новому вопросу
  useEffect(() => {
    setIsAnswerVisible(false)
  }, [questionNumber])

  // Автоматически скрываем success message через 3 секунды
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showSuccessMessage])

  // ✅ УСЛОВНЫЙ RETURN ПОСЛЕ ВСЕХ ХУКОВ
  if (hasInvalidParams) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">
            Неверные параметры маршрута
          </h1>
          <p className="text-muted-foreground">
            Проверьте URL и попробуйте снова
          </p>
          <Button onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            На главную
          </Button>
        </div>
      </div>
    )
  }

  // Handler для сохранения оценки
  const handleSaveRating = () => {
    if (!statistics) {
      toast({
        title: 'Ошибка',
        description: 'Статистика не загружена',
      })
      return
    }

    // Обновляем оценку
    updateScore(chapterNumber, questionNumber, currentRating)

    // Показываем сообщение об успехе
    setShowSuccessMessage(true)

    // Показываем toast
    toast({
      title: 'Оценка сохранена',
      description: `Ваша оценка: ${currentRating}/5`,
    })
  }

  // Handler для навигации
  const handleNavigate = (
    targetChapterNum: number,
    targetQuestionNum: number
  ) => {
    navigate(
      `/question/${encodeURIComponent(positionName)}/${targetChapterNum}/${targetQuestionNum}`
    )
  }

  // Формируем breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: positionName,
      href: `/position/${encodeURIComponent(positionName)}`,
      truncate: true,
    },
    {
      label: chapter
        ? `Глава ${chapter.chapter_number}: ${chapter.chapter_title}`
        : `Глава ${chapterNumber}`,
      href: `/position/${encodeURIComponent(positionName)}`,
      truncate: true,
    },
    {
      label: question
        ? `Вопрос ${question.question_number_in_chapter}: ${question.question_title}`
        : `Вопрос ${questionNumber}`,
      href: null,
      truncate: true,
    },
  ]

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
          <Skeleton className="h-6 w-full max-w-2xl" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </main>
      </div>
    )
  }

  // Error state
  if (error || !guide || !chapter || !question) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold text-destructive">
            {error || 'Вопрос не найден'}
          </h1>
          <p className="text-muted-foreground">
            {error || `Не удалось найти вопрос №${questionNumber} в главе №${chapterNumber}`}
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate(`/position/${encodeURIComponent(positionName)}`)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              К обзору позиции
            </Button>
            <Button onClick={() => navigate('/')}>
              <Home className="mr-2 h-4 w-4" />
              На главную
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Back Button + Title */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/position/${encodeURIComponent(positionName)}`)}
                className="shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>

              <h1 className="text-lg md:text-xl font-semibold truncate">
                {question.question_title}
              </h1>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="shrink-0"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Question Display */}
          <QuestionDisplay
            question={question}
            chapterNumber={chapterNumber}
            onAnswerVisibilityChange={setIsAnswerVisible}
          />

          {/* Rating Section - показывается только когда ответ виден */}
          {isAnswerVisible && (
            <div className="space-y-4">
              {/* Current Rating Display */}
              {questionStats && questionStats.answerScore !== null && (
                <div
                  className={cn(
                    'p-4 rounded-lg border bg-card text-center',
                    showSuccessMessage && 'animate-in fade-in slide-in-from-top-2'
                  )}
                >
                  <p className="text-sm text-muted-foreground mb-1">
                    Текущая оценка
                  </p>
                  <p className="text-2xl font-bold">
                    {questionStats.answerScore}/5 ⭐
                  </p>
                </div>
              )}

              {questionStats && questionStats.answerScore === null && (
                <div className="p-4 rounded-lg border bg-muted/30 text-center">
                  <p className="text-sm text-muted-foreground">
                    Ещё не отвечено
                  </p>
                </div>
              )}

              {/* Success Message */}
              {showSuccessMessage && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center animate-in fade-in slide-in-from-top-2">
                  <p className="text-green-600 dark:text-green-500 font-medium">
                    ✓ Оценка успешно сохранена!
                  </p>
                </div>
              )}

              {/* Rating Slider */}
              <RatingSlider
                value={currentRating}
                onChange={setCurrentRating}
                onSubmit={handleSaveRating}
                isInterviewMode={false}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="border-t pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Previous Question */}
              {navigation.hasPrevious && navigation.previousQuestion ? (
                <Button
                  variant="outline"
                  onClick={() =>
                    handleNavigate(
                      navigation.previousQuestion!.chapterNumber,
                      navigation.previousQuestion!.questionNumber
                    )
                  }
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Предыдущий вопрос
                </Button>
              ) : (
                <Button
                  variant="outline"
                  disabled
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Предыдущий вопрос
                </Button>
              )}

              {/* Back to Overview */}
              <Button
                variant="secondary"
                onClick={() => navigate(`/position/${encodeURIComponent(positionName)}`)}
                className="flex-1"
              >
                Вернуться к обзору
              </Button>

              {/* Next Question */}
              {navigation.hasNext && navigation.nextQuestion ? (
                <Button
                  variant="outline"
                  onClick={() =>
                    handleNavigate(
                      navigation.nextQuestion!.chapterNumber,
                      navigation.nextQuestion!.questionNumber
                    )
                  }
                  className="flex-1"
                >
                  Следующий вопрос
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  disabled
                  className="flex-1"
                >
                  Следующий вопрос
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              )}
            </div>
          </div>

          {/* Back to Position (Mobile) */}
          <div className="sm:hidden">
            <Link
              to={`/position/${encodeURIComponent(positionName)}`}
              className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Вернуться к {positionName}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
