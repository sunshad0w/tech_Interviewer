import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, StatisticsProvider, InterviewProvider } from '@/contexts'
import { Toaster } from '@/components/ui'
import {
  HomePage,
  PositionOverviewPage,
  QuestionPage,
  InterviewPage,
  InterviewSummaryPage,
  MarkdownTestPage,
} from '@/pages'

/**
 * Главный компонент приложения
 *
 * @description
 * Настраивает:
 * - React Router с 5 основными маршрутами
 * - Context providers (Theme, Statistics, Interview)
 * - Глобальные UI компоненты (Toaster)
 *
 * @example
 * ```tsx
 * // Доступные маршруты:
 * / → HomePage (список позиций)
 * /position/:positionName → PositionOverviewPage (обзор позиции)
 * /question/:positionName/:chapterNum/:questionNum → QuestionPage (отдельный вопрос)
 * /interview/:positionName → InterviewPage (режим интервью)
 * /interview-summary/:positionName → InterviewSummaryPage (итоги интервью)
 * /test-markdown → MarkdownTestPage (тестирование markdown)
 * ```
 */
function App() {
  return (
    <ThemeProvider>
      <StatisticsProvider>
        <InterviewProvider>
          <BrowserRouter>
            <Routes>
              {/* Главная страница - список позиций */}
              <Route path="/" element={<HomePage />} />

              {/* Обзор выбранной позиции */}
              <Route path="/position/:positionName" element={<PositionOverviewPage />} />

              {/* Просмотр отдельного вопроса (из оглавления) */}
              <Route
                path="/question/:positionName/:chapterNum/:questionNum"
                element={<QuestionPage />}
              />

              {/* Режим интервью с weighted randomization */}
              <Route path="/interview/:positionName" element={<InterviewPage />} />

              {/* Итоги завершенного интервью */}
              <Route
                path="/interview-summary/:positionName"
                element={<InterviewSummaryPage />}
              />

              {/* Тестовая страница для проверки markdown */}
              <Route path="/test-markdown" element={<MarkdownTestPage />} />
            </Routes>
          </BrowserRouter>

          {/* Глобальные UI компоненты */}
          <Toaster />
        </InterviewProvider>
      </StatisticsProvider>
    </ThemeProvider>
  )
}

export default App
