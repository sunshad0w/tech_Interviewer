import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePositionData } from '../hooks/usePositionData';
import { useStatistics } from '../contexts/StatisticsContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  Button,
  Progress,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Accordion,
} from '@/components/ui';
import ChapterAccordion from '../components/ChapterAccordion';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { Moon, Sun, ArrowLeft, Play, RotateCcw } from 'lucide-react';

/**
 * Route parameters type
 */
interface PositionOverviewParams extends Record<string, string | undefined> {
  positionName: string;
}

/**
 * Position Overview Page
 *
 * Displays:
 * - Position metadata with markdown description
 * - Statistics summary (overall score, progress)
 * - Table of contents with ChapterAccordion
 * - Actions: Start Interview (with chapter filter), Reset Statistics
 */
export default function PositionOverviewPage() {
  const { positionName } = useParams<PositionOverviewParams>();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { resetPosition, resetChapter } = useStatistics();

  const { guide, statistics, summaryStats, loading, error, reload } = usePositionData(
    positionName || ''
  );

  // State for reset dialog
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetType, setResetType] = useState<'position' | 'chapter' | null>(null);
  const [selectedChapterForReset, setSelectedChapterForReset] = useState<number | null>(null);

  // State for chapter filter when starting interview
  const [selectedChapterFilter, setSelectedChapterFilter] = useState<number | null>(null);

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Handle reset confirmation
  const handleResetConfirm = () => {
    if (!guide) return;

    if (resetType === 'position') {
      resetPosition(guide);
      reload(); // Reload data after reset
    } else if (resetType === 'chapter' && selectedChapterForReset !== null) {
      resetChapter(selectedChapterForReset, guide);
      reload(); // Reload data after reset
    }

    setResetDialogOpen(false);
    setResetType(null);
    setSelectedChapterForReset(null);
  };

  // Handle start interview
  const handleStartInterview = () => {
    if (!guide) return;

    const baseUrl = `/interview/${encodeURIComponent(guide.guide_name)}`;
    const url = selectedChapterFilter !== null
      ? `${baseUrl}?chapter=${selectedChapterFilter}`
      : baseUrl;

    navigate(url);
  };

  // Handle question click
  const handleQuestionClick = (chapterNumber: number, questionNumber: number) => {
    if (!guide) return;

    navigate(
      `/question/${encodeURIComponent(guide.guide_name)}/${chapterNumber}/${questionNumber}`
    );
  };

  // Difficulty badge color
  const getDifficultyColor = (level: string) => {
    const normalized = level.toLowerCase();
    if (normalized.includes('junior') || normalized.includes('начальный')) {
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
    if (normalized.includes('middle') || normalized.includes('средний')) {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
    if (normalized.includes('senior') || normalized.includes('продвинутый')) {
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
    return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Loading skeleton */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-6 animate-pulse">
            <div className="h-12 bg-muted rounded w-2/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error || !guide || !statistics) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Error message */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center space-y-4">
            <div className="text-6xl">⚠️</div>
            <h2 className="text-2xl font-bold">Ошибка загрузки</h2>
            <p className="text-muted-foreground">{error || 'Не удалось загрузить данные позиции'}</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Вернуться на главную
              </Button>
              <Button variant="outline" onClick={reload}>
                Повторить попытку
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold truncate">{guide.guide_name}</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-8">
          {/* Metadata Section */}
          <section className="rounded-lg border bg-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">О позиции</h2>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Целевая аудитория</dt>
                <dd className="mt-1 text-sm">{guide.guide_metadata.target_audience}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-muted-foreground">Охваченные версии</dt>
                <dd className="mt-1 text-sm">{guide.guide_metadata.covered_versions}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-muted-foreground">Уровень сложности</dt>
                <dd className="mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                      guide.guide_metadata.difficulty_level || 'Middle'
                    )}`}
                  >
                    {guide.guide_metadata.difficulty_level || 'Middle'}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-muted-foreground">Всего вопросов</dt>
                <dd className="mt-1 text-sm font-semibold">{guide.guide_metadata.total_questions}</dd>
              </div>
            </div>

            {/* Guide Description (Markdown) */}
            {guide.guide_description && (
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">Описание</h3>
                <MarkdownRenderer content={guide.guide_description} />
              </div>
            )}
          </section>

          {/* Statistics Summary */}
          <section className="rounded-lg border bg-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Ваша статистика</h2>

            <div className="space-y-4">
              {/* Overall Score */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Общий балл</span>
                <span className="text-2xl font-bold">
                  {summaryStats.answeredCount > 0
                    ? summaryStats.overallScore.toFixed(1)
                    : '—'}
                  <span className="text-sm text-muted-foreground font-normal">/5.0</span>
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Прогресс</span>
                  <span className="text-muted-foreground">
                    {summaryStats.answeredCount} из {summaryStats.totalQuestions} вопросов (
                    {summaryStats.progressPercentage}%)
                  </span>
                </div>
                <Progress value={summaryStats.progressPercentage} className="h-2" />
              </div>
            </div>
          </section>

          {/* Actions Section */}
          <section className="rounded-lg border bg-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Действия</h2>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Start Interview with Chapter Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Начать собеседование
                    {selectedChapterFilter !== null && (
                      <span className="ml-2 text-xs opacity-80">
                        (Глава {selectedChapterFilter})
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedChapterFilter(null);
                      handleStartInterview();
                    }}
                  >
                    <span className="font-medium">Все главы</span>
                  </DropdownMenuItem>
                  {guide.guide_chapters.map((chapter) => (
                    <DropdownMenuItem
                      key={chapter.chapter_number}
                      onClick={() => {
                        setSelectedChapterFilter(chapter.chapter_number);
                        setTimeout(() => handleStartInterview(), 0);
                      }}
                    >
                      {chapter.chapter_number}. {chapter.chapter_title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Reset Statistics */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="lg" className="sm:w-auto">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Сбросить статистику
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuItem
                    onClick={() => {
                      setResetType('position');
                      setResetDialogOpen(true);
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    Сбросить всю позицию
                  </DropdownMenuItem>
                  {guide.guide_chapters.map((chapter) => (
                    <DropdownMenuItem
                      key={chapter.chapter_number}
                      onClick={() => {
                        setResetType('chapter');
                        setSelectedChapterForReset(chapter.chapter_number);
                        setResetDialogOpen(true);
                      }}
                    >
                      Сбросить главу {chapter.chapter_number}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </section>

          {/* Table of Contents */}
          <section className="rounded-lg border bg-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Оглавление</h2>

            <Accordion type="multiple">
              {guide.guide_chapters.map((chapter) => {
                const chapterStats = statistics.statistics.find(
                  (stat) => stat.chapterNumber === chapter.chapter_number
                );

                if (!chapterStats) return null;

                return (
                  <ChapterAccordion
                    key={chapter.chapter_number}
                    chapter={chapter}
                    chapterStats={chapterStats}
                    onQuestionClick={handleQuestionClick}
                  />
                );
              })}
            </Accordion>
          </section>
        </div>
      </main>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение сброса</AlertDialogTitle>
            <AlertDialogDescription>
              {resetType === 'position' ? (
                <>
                  Вы уверены, что хотите сбросить статистику для позиции{' '}
                  <strong>{guide.guide_name}</strong>?
                  <br />
                  <br />
                  Все оценки и прогресс будут удалены. Это действие нельзя отменить.
                </>
              ) : resetType === 'chapter' && selectedChapterForReset !== null ? (
                <>
                  Вы уверены, что хотите сбросить статистику для главы{' '}
                  <strong>
                    {guide.guide_chapters.find((ch) => ch.chapter_number === selectedChapterForReset)
                      ?.chapter_title || selectedChapterForReset}
                  </strong>
                  ?
                  <br />
                  <br />
                  Все оценки вопросов в этой главе будут удалены. Это действие нельзя отменить.
                </>
              ) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResetConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Сбросить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
