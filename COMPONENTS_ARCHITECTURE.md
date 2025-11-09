# shadcn/ui Компоненты - Архитектура и использование

## ASCII Диаграмма архитектуры

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx                                  │
│  (Корневой компонент с Toaster)                                │
└──────────────────┬──────────────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌────────▼───────────────┐
│   Navigation   │   │  Toaster Provider      │
│   (React Router)   │  (Toast notifications)│
└───────┬────────┘   └────────┬───────────────┘
        │                     │
        │         ┌───────────┘
        │         │
┌───────▼──────────▼──────────────────────┐
│         Pages/Screens                   │
│  ┌─────────────────────────────────────┐│
│  │ PositionSelectionPage               ││
│  │ ┌──────────────────────────────────┐││
│  │ │ PositionCard  (Card, Badge, ...) │││
│  │ └──────────────────────────────────┘││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │ PositionOverviewPage                ││
│  │ ┌──────────────────────────────────┐││
│  │ │ Card: Metadata                   │││
│  │ │ Accordion: Table of Contents     │││
│  │ │ Select: Chapter Filter           │││
│  │ │ Button: Start Interview          │││
│  │ └──────────────────────────────────┘││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │ InterviewModePage                   ││
│  │ ┌──────────────────────────────────┐││
│  │ │ Card: Question                   │││
│  │ │ Button: Show Answer              │││
│  │ │ Dialog: Answer with Markdown     │││
│  │ │ Slider: Rating (0-5)             │││
│  │ │ Button: Next Question            │││
│  │ └──────────────────────────────────┘││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

## Компонентная иерархия

```
App
├── Toaster (для уведомлений)
└── Router
    ├── PositionSelectionPage
    │   └── PositionCard (повторяется)
    │       ├── Card
    │       ├── Badge (difficulty)
    │       ├── Progress (overall score)
    │       └── Button (select position)
    │
    ├── PositionOverviewPage
    │   ├── Card (metadata)
    │   ├── Accordion (table of contents)
    │   │   └── AccordionItem (per chapter)
    │   │       └── AccordionContent
    │   │           └── Table (questions)
    │   ├── Select (chapter filter)
    │   ├── Button (start interview)
    │   ├── AlertDialog (reset statistics)
    │   └── Separator
    │
    └── InterviewModePage
        ├── Card (current question)
        │   ├── CardHeader (question title)
        │   ├── CardContent (question text)
        │   └── CardFooter
        │       ├── Button (show answer)
        │       └── Button (next)
        │
        ├── Dialog (answer display)
        │   ├── DialogHeader
        │   ├── DialogContent (markdown)
        │   └── DialogClose
        │
        ├── Card (rating)
        │   ├── Label ("Ваша оценка:")
        │   ├── Slider (0-5)
        │   └── Button (submit rating)
        │
        ├── Progress (interview progress)
        └── Button (exit interview)
```

## Core компоненты и их назначение

### 1. Button
- **Назначение**: Все действия пользователя
- **Варианты**:
  - `default` - основные действия (Start Interview, Next)
  - `secondary` - менее важные действия
  - `destructive` - опасные (Reset Stats)
  - `outline` - вторичные
  - `ghost` - минималистичные
  - `link` - как ссылка

**Примеры использования в приложении:**
```
- "Начать интервью"
- "Показать ответ"
- "Следующий вопрос"
- "Сбросить статистику"
- "Назад"
```

### 2. Card
- **Назначение**: Контейнер для группировки контента
- **Подкомпоненты**: Header, Title, Description, Content, Footer

**Примеры использования:**
```
- PositionCard (карточка позиции)
- QuestionCard (карточка вопроса)
- MetadataCard (метаданные позиции)
- StatisticsCard (статистика)
```

### 3. Slider
- **Назначение**: Рейтинг ответа (0-5)
- **Диапазон**: 0-5 шагов
- **Интеграция**: Автосохранение в localStorage

**Использование:**
```tsx
<Slider
  min={0}
  max={5}
  step={1}
  value={[userScore]}
  onValueChange={handleScoreChange}
/>
```

### 4. Accordion
- **Назначение**: Раскрывающаяся таблица содержания
- **Элементы**: Главы с вопросами

**Структура:**
```
Глава 1
  - Вопрос 1
  - Вопрос 2
  - Вопрос 3
Глава 2
  - Вопрос 4
  - Вопрос 5
```

### 5. Dialog
- **Назначение**: Модальное окно для ответов
- **Содержимое**: Markdown с кодом и примерами

### 6. Select
- **Назначение**: Выбор главы для интервью
- **Опции**: "Все главы", "Глава 1", "Глава 2", ...

### 7. Progress
- **Назначение**: Визуализация прогресса
- **Использование**:
  - Общая оценка позиции
  - Прогресс интервью (X вопросов из Y)
  - Прогресс главы (X вопросов из Y)

### 8. Badge
- **Назначение**: Визуализация статусов
- **Примеры**:
  - Уровень сложности (Easy, Medium, Hard)
  - Статус вопроса (Answered, Not answered)
  - Теги (JavaScript, React, etc.)

## Дополнительные компоненты

### Alert Dialog
- **Назначение**: Подтверждение опасных действий
- **Использование**: Сброс статистики

### Toast
- **Назначение**: Уведомления об действиях
- **Примеры**:
  - "Ваш ответ был сохранен"
  - "Статистика сброшена"
  - "Ошибка при загрузке"

### Tooltip
- **Назначение**: Подсказки при наведении
- **Примеры**:
  - Объяснение шкалы оценок
  - Помощь по интерфейсу

### Skeleton
- **Назначение**: Загрузочные состояния
- **Использование**: Пока загружаются JSON файлы

### Scroll Area
- **Назначение**: Кастомная прокрутка
- **Примеры**:
  - Длинные ответы
  - Таблица содержания

### Separator
- **Назначение**: Визуальный разделитель
- **Использование**: Между секциями интерфейса

### Radio Group + Label
- **Назначение**: Выбор одного варианта
- **Примеры**:
  - Режим интервью (Random, Sequential)
  - Фильтр сложности

## Использование компонентов по страницам

### PositionSelectionPage
```
Layout:
  Grid of Cards
    ├── Card
    │   ├── CardHeader (Position name)
    │   ├── CardContent (Description)
    │   ├── CardFooter
    │   │   ├── Badge (difficulty)
    │   │   ├── Progress (score)
    │   │   └── Button (select)
    │   └── Separator
```

### PositionOverviewPage
```
Layout:
  Container
    ├── Card (metadata)
    │   ├── CardHeader
    │   ├── CardContent (guide_description markdown)
    │   └── CardFooter
    │
    ├── Select (chapter filter)
    ├── Separator
    ├── Accordion (table of contents)
    │   └── AccordionItem (per chapter)
    │       └── Table (questions)
    │
    ├── Separator
    ├── Progress (overall)
    ├── Button (start interview)
    └── AlertDialog (reset)
```

### InterviewModePage
```
Layout:
  Container
    ├── Card (current question)
    │   ├── CardHeader (Q#, title)
    │   ├── CardContent (question text)
    │   └── Button (show answer)
    │
    ├── Dialog (answer)
    │   ├── DialogHeader
    │   ├── Markdown content (answer_markdown)
    │   └── DialogClose
    │
    ├── Card (rating section)
    │   ├── Label
    │   ├── Slider (0-5)
    │   ├── Tooltip (help)
    │   └── Button (submit)
    │
    ├── Progress (interview)
    ├── DropdownMenu (options)
    │   ├── Change chapter
    │   ├── View statistics
    │   └── Exit interview
    └── Button (exit)
```

## Интеграция со State Management

```typescript
// Context/Zustand state structure example
interface AppState {
  // Navigation
  currentPage: 'selection' | 'overview' | 'interview'
  selectedPosition: string | null

  // Interview mode
  currentChapter: number | null
  currentQuestion: number | null
  currentQuestionIndex: number

  // Filters
  selectedChapterFilter: string | null

  // Theme
  isDarkMode: boolean

  // Statistics
  statistics: Statistics[]
}

// Actions
{
  selectPosition: (position: string) => void
  startInterview: (chapter?: string) => void
  rateQuestion: (score: number) => void
  nextQuestion: () => void
  resetStatistics: () => void
  toggleTheme: () => void
}
```

## Интеграция с localStorage

```typescript
// Сохранение статистики
localStorage.setItem('interviewer-stats', JSON.stringify(stats))

// Загрузка статистики
const stats = JSON.parse(localStorage.getItem('interviewer-stats') || '[]')

// Сохранение темы
localStorage.setItem('interviewer-theme', isDarkMode ? 'dark' : 'light')

// Сохранение последней позиции
localStorage.setItem('interviewer-last-position', selectedPosition)
```

## TypeScript Types для компонентов

```typescript
// Common props
interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Button with variants
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

// Slider for scores
interface ScoreSliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  labels?: string[]
}

// Toast message
interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  action?: React.ReactNode
}
```

## CSS Variables (темы)

Все компоненты используют Tailwind классы с поддержкой dark mode:

```css
/* Light mode (default) */
--color-background: white
--color-foreground: #0f172a
--color-primary: #0f172a
--color-primary-foreground: #f8fafc

/* Dark mode (activated with class='dark') */
--color-background: #0f172a
--color-foreground: #f8fafc
--color-primary: #f8fafc
--color-primary-foreground: #0f172a
```

## Производительность и оптимизация

1. **Lazy Loading компонентов:**
```typescript
const InterviewModePage = lazy(() => import('./pages/InterviewModePage'))
```

2. **Memo для Card列表:**
```typescript
const PositionCard = memo(({ position, onSelect }) => (
  <Card>...</Card>
))
```

3. **Virtualization для长列表:**
```typescript
<ScrollArea>
  {/* Большие списки используют виртуализацию */}
</ScrollArea>
```

## Доступность (a11y)

Все компоненты Radix UI обеспечивают:
- ARIA атрибуты
- Клавиатурную навигацию
- Скрин-ридер поддержку
- Фокус управление

Пример:
```typescript
<Button
  aria-label="Next question"
  aria-disabled={isLastQuestion}
>
  Next
</Button>
```

## Заключение

Архитектура компонентов следует современным best practices:
- **Composition over inheritance** - использование подкомпонентов
- **Props drilling** - четкая передача данных
- **State management** - централизованное состояние
- **TypeScript** - полная типизация
- **Accessibility** - a11y из коробки
- **Responsive design** - мобильная поддержка
- **Dark mode** - встроенная поддержка

Все компоненты готовы к production использованию.
