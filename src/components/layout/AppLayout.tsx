import { useTheme } from '@/contexts'
import { Outlet } from 'react-router-dom'
import { Button } from '@/components/ui'

/**
 * Общий layout для всех страниц приложения
 *
 * @description
 * Предоставляет:
 * - Общий header с переключателем темы
 * - Outlet для вложенных роутов
 * - Единообразный стиль для всех страниц
 *
 * @example
 * ```tsx
 * // В App.tsx можно использовать вместо отдельных страниц:
 * <Route element={<AppLayout />}>
 *   <Route path="/" element={<HomePage />} />
 *   <Route path="/position/:name" element={<PositionPage />} />
 * </Route>
 * ```
 *
 * @remarks
 * Этот компонент опциональный и может быть использован позже
 * для унификации layout на всех страницах.
 */
export default function AppLayout() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Interview Prep</h1>
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant="outline"
            size="sm"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer (опционально) */}
      <footer className="border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Interview Preparation App © 2025
        </div>
      </footer>
    </div>
  )
}
