/**
 * Главная страница приложения - список доступных позиций
 *
 * Загружает все доступные interview guides из jsons/ директории
 * и отображает их в виде карточек с метаданными и статистикой
 *
 * @description
 * Страница выполняет следующие функции:
 * - Загружает все JSON guides из директории
 * - Подгружает статистику из localStorage для каждой позиции
 * - Отображает карточки в responsive grid layout
 * - Обрабатывает loading, error и empty states
 * - Предоставляет theme toggle
 * - Навигация на position overview по клику на карточку
 *
 * @example
 * ```tsx
 * <HomePage />
 * ```
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@/contexts'
import { useGuides } from '@/hooks'
import { PositionCard, MigrationDialog } from '@/components'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Moon, Sun, Database } from 'lucide-react'
import { isSQLiteEnabled } from '@/database/adapter'

/**
 * Компонент HomePage - главная страница приложения
 *
 * @returns React компонент с списком доступных позиций
 */
export default function HomePage() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const { guides, loading, error, refetch } = useGuides()
  const [migrationDialogOpen, setMigrationDialogOpen] = useState(false)
  const [isMigrated, setIsMigrated] = useState(isSQLiteEnabled())

  // Обработчик завершения миграции
  const handleMigrationComplete = () => {
    setIsMigrated(true)
    setMigrationDialogOpen(false)
    refetch() // Перезагрузить guides после миграции
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
              {/* Error Icon */}
              <div className="text-6xl mb-6">❌</div>

              {/* Error Title */}
              <h2 className="text-2xl font-bold text-destructive mb-4">
                Ошибка загрузки guides
              </h2>

              {/* Error Message */}
              <p className="text-muted-foreground mb-6">{error}</p>

              {/* Actions */}
              <div className="flex justify-center">
                <Button onClick={() => window.location.reload()} size="lg">
                  🔄 Попробовать снова
                </Button>
              </div>

              {/* Technical Details */}
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Технические детали
                </summary>
                <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto">
                  {JSON.stringify({ error, timestamp: new Date().toISOString() }, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Interview Preparation
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Подготовка к техническим собеседованиям
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Migration Button (только если еще не мигрировано) */}
              {!isMigrated && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMigrationDialogOpen(true)}
                  className="shrink-0"
                  aria-label="Миграция в SQLite"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Мигрировать в SQLite
                </Button>
              )}

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="shrink-0"
                aria-label="Переключить тему"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          // Loading State
          <div>
            <div className="mb-6">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 rounded-lg" />
              ))}
            </div>
          </div>
        ) : guides.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
              {/* Empty Icon */}
              <div className="text-6xl mb-6">📚</div>

              {/* Empty Title */}
              <h2 className="text-2xl font-semibold mb-2">Guides не найдены</h2>

              {/* Empty Description */}
              <p className="text-muted-foreground mb-6">
                В директории <code className="px-2 py-1 bg-muted rounded">/jsons</code> не
                найдено interview guides.
              </p>

              {/* Instructions */}
              <div className="text-left bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">Что делать:</p>
                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                  <li>Добавьте JSON файлы в директорию <code>/jsons</code></li>
                  <li>Убедитесь, что файлы соответствуют schema</li>
                  <li>Обновите страницу</li>
                </ol>
              </div>

              {/* Refresh Button */}
              <Button onClick={() => window.location.reload()} className="mt-6" size="lg">
                🔄 Обновить страницу
              </Button>
            </div>
          </div>
        ) : (
          // Guides Grid
          <div>
            {/* Section Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                Доступные позиции ({guides.length})
              </h2>
              <p className="text-muted-foreground mt-1">
                Выберите позицию для начала подготовки к собеседованию
              </p>
            </div>

            {/* Position Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map(({ guide, statistics }) => (
                <PositionCard
                  key={guide.guide_name}
                  guide={guide}
                  statistics={statistics ?? undefined}
                  onClick={() => {
                    const encodedName = encodeURIComponent(guide.guide_name)
                    navigate(`/position/${encodedName}`)
                  }}
                />
              ))}
            </div>

            {/* Statistics Summary (if any position has statistics) */}
            {guides.some(({ statistics }) => statistics !== null) && (
              <div className="mt-12 p-6 border rounded-lg bg-card">
                <h3 className="text-lg font-semibold mb-4">📊 Общая статистика</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">
                      {guides.filter(({ statistics }) => statistics !== null).length}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Начатых позиций
                    </div>
                  </div>

                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">
                      {guides.reduce((sum, { guide }) => sum + guide.guide_metadata.total_questions, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Всего вопросов
                    </div>
                  </div>

                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">
                      {guides.reduce((sum, { statistics }) => {
                        if (!statistics) return sum
                        return sum + statistics.statistics.reduce((acc, ch) => acc + ch.answeredCount, 0)
                      }, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Отвечено вопросов
                    </div>
                  </div>

                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">
                      {guides
                        .filter(({ statistics }) => statistics !== null && statistics.overallScore > 0)
                        .reduce((sum, { statistics }) => sum + statistics!.overallScore, 0)
                        .toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Средний балл
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instructions Card */}
        <div className="mt-12 p-6 border rounded-lg bg-card">
          <h3 className="text-lg font-semibold mb-3">💡 Как использовать приложение</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Выберите позицию для подготовки из списка выше</li>
            <li>Изучите обзор позиции и оглавление вопросов</li>
            <li>Начните интервью (случайные вопросы) или просматривайте отдельные вопросы</li>
            <li>
              Оценивайте свои ответы по шкале от <strong>0</strong> (совсем не знаю) до{' '}
              <strong>5</strong> (полный ответ)
            </li>
            <li>Отслеживайте прогресс и статистику по каждой позиции</li>
            <li>Возвращайтесь к слабым местам для повторной подготовки</li>
          </ol>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center items-center">
            <p className="text-sm text-muted-foreground text-center">
              Interview Preparation App © 2025
            </p>
          </div>
        </div>
      </footer>

      {/* Migration Dialog */}
      <MigrationDialog
        open={migrationDialogOpen}
        onOpenChange={setMigrationDialogOpen}
        onComplete={handleMigrationComplete}
      />
    </div>
  )
}
