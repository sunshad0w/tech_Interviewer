# Руководство по разработке - Interview Preparation App

**Дата**: 8 ноября 2025
**Версия**: 1.0
**Статус**: Готово к разработке

---

## Быстрые команды

```bash
# Запустить dev сервер
npm run dev

# Собрать для production
npm run build

# Просмотреть production сборку
npm run preview

# Линтинг (если настроен)
npm run lint

# Type checking
npm run type-check
```

---

## Структура проекта

```
interviewer/
├── src/
│   ├── App.tsx                    # Корневой компонент
│   ├── main.tsx                   # Entry point
│   ├── components/
│   │   ├── ui/                    # shadcn/ui компоненты
│   │   ├── examples/              # Примеры компонентов
│   │   └── [business]/            # Ваши компоненты (создать)
│   │       ├── PositionCard.tsx
│   │       ├── QuestionView.tsx
│   │       └── ...
│   ├── pages/                     # Страницы приложения (создать)
│   │   ├── PositionSelectionPage.tsx
│   │   ├── PositionOverviewPage.tsx
│   │   └── InterviewModePage.tsx
│   ├── hooks/                     # Custom hooks (создать)
│   │   ├── useStatistics.ts
│   │   └── useInterview.ts
│   ├── contexts/                  # React Context (создать)
│   │   └── ThemeContext.tsx
│   ├── types/
│   │   └── components.ts          # TypeScript типы
│   ├── lib/
│   │   └── utils.ts               # Утилиты
│   ├── assets/                    # Изображения, шрифты
│   └── styles/                    # Глобальные стили
│
├── jsons/                         # Symlink к данным интервью
├── public/
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Этап 1: Интеграция React Router

### 1. Установить react-router-dom

```bash
npm install react-router-dom
```

### 2. Создать структуру маршрутов

Файл: `src/routes/index.tsx`

```typescript
import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '@/pages/RootLayout'
import PositionSelectionPage from '@/pages/PositionSelectionPage'
import PositionOverviewPage from '@/pages/PositionOverviewPage'
import InterviewModePage from '@/pages/InterviewModePage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <PositionSelectionPage />,
      },
      {
        path: 'position/:positionId',
        element: <PositionOverviewPage />,
      },
      {
        path: 'interview/:positionId',
        element: <InterviewModePage />,
      },
    ],
  },
])
```

### 3. Обновить App.tsx

```typescript
import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { Toaster } from '@/components/ui'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
```

---

## Этап 2: Создать компоненты бизнес-логики

### PositionCard.tsx

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Progress, Button } from '@/components/ui'
import { Position, PositionStatistic } from '@/types/components'

interface PositionCardProps {
  position: Position
  statistics: PositionStatistic | null
  onSelect: (id: string) => void
}

export function PositionCard({ position, statistics, onSelect }: PositionCardProps) {
  const scorePercentage = (statistics?.overallScore || 0) * 20 // 0-5 to 0-100

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelect(position.id)}>
      <CardHeader>
        <CardTitle>{position.name}</CardTitle>
        <CardDescription>
          {position.totalQuestions} вопросов в {position.totalChapters} главах
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant={position.difficulty === 'hard' ? 'destructive' : 'default'}>
            {position.difficulty}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Общая оценка: {statistics?.overallScore?.toFixed(1) || 'не начинал'} / 5
          </p>
          <Progress value={scorePercentage} />
        </div>
      </CardContent>
    </Card>
  )
}
```

### QuestionView.tsx

```typescript
import { Card, CardContent, CardHeader, CardTitle, Button, Dialog, DialogContent, Slider } from '@/components/ui'
import { Question } from '@/types/components'
import ReactMarkdown from 'react-markdown'
import { SyntaxHighlighter } from 'react-syntax-highlighter'

interface QuestionViewProps {
  question: Question
  currentScore: number | null
  onRate: (score: number) => void
  onNext: () => void
  isLast: boolean
}

export function QuestionView({ question, currentScore, onRate, onNext, isLast }: QuestionViewProps) {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{question.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{question.content}</p>
          <Button onClick={() => setShowAnswer(true)} className="mt-4">
            Показать ответ
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showAnswer} onOpenChange={setShowAnswer}>
        <DialogContent className="max-w-2xl">
          <div className="prose dark:prose-invert">
            <ReactMarkdown
              components={{
                code: ({ node, inline, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props}>{children}</code>
                  )
                },
              }}
            >
              {question.answerMarkdown}
            </ReactMarkdown>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Ваша оценка</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {currentScore !== null ? `Текущая оценка: ${currentScore}/5` : 'Не оценено'}
            </p>
            <Slider
              min={0}
              max={5}
              step={1}
              value={[currentScore || 0]}
              onValueChange={(value) => onRate(value[0])}
            />
          </div>
          <Button onClick={onNext} className="w-full">
            {isLast ? 'Завершить' : 'Следующий вопрос'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## Этап 3: Создать Hooks для логики

### useStatistics.ts

```typescript
import { useState, useEffect } from 'react'
import { PositionStatistic, ChapterStatistic, QuestionStatistic } from '@/types/components'

const STORAGE_KEY = 'interviewer-statistics'

export function useStatistics(positionId: string) {
  const [statistics, setStatistics] = useState<PositionStatistic | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY}-${positionId}`)
    if (stored) {
      setStatistics(JSON.parse(stored))
    }
  }, [positionId])

  const saveStatistics = (stats: PositionStatistic) => {
    setStatistics(stats)
    localStorage.setItem(`${STORAGE_KEY}-${positionId}`, JSON.stringify(stats))
  }

  const updateQuestionScore = (chapterId: string, questionId: string, score: number) => {
    if (!statistics) return

    const updated = {
      ...statistics,
      statistics: statistics.statistics.map(chapter => {
        if (chapter.chapterId === chapterId) {
          return {
            ...chapter,
            questions: chapter.questions.map(q => {
              if (q.questionId === questionId) {
                return { ...q, answerScore: score }
              }
              return q
            }),
          }
        }
        return chapter
      }),
    }

    saveStatistics(updated)
  }

  const resetStatistics = () => {
    localStorage.removeItem(`${STORAGE_KEY}-${positionId}`)
    setStatistics(null)
  }

  return {
    statistics,
    updateQuestionScore,
    resetStatistics,
    saveStatistics,
  }
}
```

### useInterview.ts

```typescript
import { useState, useEffect } from 'react'
import { Question } from '@/types/components'

interface UseInterviewOptions {
  questions: Question[]
  filterChapter?: string
  excludeAnswered?: boolean
}

export function useInterview(options: UseInterviewOptions) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    // Фильтруем вопросы
    let filtered = options.questions

    if (options.filterChapter) {
      filtered = filtered.filter(q => q.chapterId === options.filterChapter)
    }

    // Перемешиваем (с взвешиванием по необходимости)
    const shuffled = filtered.sort(() => Math.random() - 0.5)
    setQuestions(shuffled)
  }, [options.questions, options.filterChapter])

  const currentQuestion = questions[currentIndex]

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const isLast = currentIndex === questions.length - 1
  const isFirst = currentIndex === 0

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    nextQuestion,
    previousQuestion,
    isLast,
    isFirst,
  }
}
```

---

## Этап 4: Markdown и Syntax Highlighting

### Установить зависимости

```bash
npm install react-markdown react-syntax-highlighter
npm install -D @types/react-syntax-highlighter
```

### Создать MarkdownRenderer.tsx

```typescript
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={oneDark}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
```

---

## Этап 5: Theme Context

### contexts/ThemeContext.tsx

```typescript
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    return stored || 'light'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

---

## Лучшие практики

### 1. Типизация

```typescript
// ✅ ХОРОШО
const handleClick = (id: string): void => {
  // ...
}

// ❌ ПЛОХО
const handleClick = (id) => {
  // ...
}
```

### 2. Условный рендеринг

```typescript
// ✅ ХОРОШО
{isLoading && <Skeleton />}
{!isLoading && <Content />}

// ❌ ПЛОХО
{isLoading ? <Skeleton /> : null}
```

### 3. Обработка пустых состояний

```typescript
// ✅ ХОРОШО
{questions.length === 0 ? (
  <div>No questions found</div>
) : (
  <QuestionList questions={questions} />
)}

// ❌ ПЛОХО
<QuestionList questions={questions} />
```

### 4. Мемоизация компонентов

```typescript
import { memo } from 'react'

// ✅ Для компонентов с тяжелой логикой
const PositionCard = memo(({ position, onSelect }: Props) => {
  return <Card>...</Card>
})
```

### 5. Работа с localStorage

```typescript
// ✅ ХОРОШО
const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setStoredValue = (value: any) => {
    try {
      setValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }

  return [value, setStoredValue]
}
```

---

## Тестирование компонентов

### Создать простую страницу тестирования

Файл: `src/pages/ComponentShowcase.tsx`

```typescript
import { AllComponentsShowcase } from '@/components/examples/ComponentExamples'

export default function ComponentShowcase() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">UI Components Showcase</h1>
      <AllComponentsShowcase />
    </div>
  )
}
```

Добавить маршрут:
```typescript
{
  path: 'components',
  element: <ComponentShowcase />,
}
```

Открыть: `http://localhost:5173/components`

---

## Отладка

### React DevTools

```bash
# Установить расширение для браузера
# Chrome: React Developer Tools
# Firefox: React Developer Tools
```

### Console логирование

```typescript
// ✅ Структурированное логирование
console.log('Component rendered:', { positionId, statistics })

// ❌ Бесполезное логирование
console.log('test')
```

### Network DevTools

Для отладки fetch запросов (когда добавите API):
- F12 → Network tab
- Фильтровать по типу (XHR, Fetch)

---

## Производительность

### Code Splitting

```typescript
import { lazy, Suspense } from 'react'

const InterviewModePage = lazy(() => import('./pages/InterviewModePage'))

<Suspense fallback={<LoadingSpinner />}>
  <InterviewModePage />
</Suspense>
```

### Оптимизация рендеринга

```typescript
// ✅ Правильно: зависимости в useEffect
useEffect(() => {
  loadStatistics(positionId)
}, [positionId])

// ❌ Неправильно: бесконечный цикл
useEffect(() => {
  loadStatistics(positionId)
})
```

---

## Checklist для разработки

- [ ] React Router настроена
- [ ] Компоненты страниц созданы
- [ ] Hooks для логики созданы
- [ ] localStorage интеграция работает
- [ ] Markdown рендеринг работает
- [ ] Dark mode работает
- [ ] Mobile responsive
- [ ] Все компоненты типизированы

---

## Полезные ссылки

- React Docs: https://react.dev/
- React Router: https://reactrouter.com/
- Tailwind CSS: https://tailwindcss.com/
- shadcn/ui: https://ui.shadcn.com/
- React Markdown: https://github.com/remarkjs/react-markdown

---

**Happy coding! 🚀**
