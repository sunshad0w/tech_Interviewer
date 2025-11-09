# shadcn/ui Компоненты - Быстрый Старт

## Что установлено?

Все 17 основных shadcn/ui компонентов готовы к использованию в проекте Interview Preparation App.

## Быстрое использование

### 1. Импорт компонентов

```typescript
// Рекомендуемый способ - импорт из индекса
import { Button, Card, Slider, useToast } from "@/components/ui"

// Или прямой импорт (если нужны только определенные компоненты)
import { Button } from "@/components/ui/button"
```

### 2. Примеры кода

#### Button - Кнопка

```tsx
import { Button } from "@/components/ui"

export function MyComponent() {
  return (
    <>
      <Button>Primary Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button disabled>Disabled</Button>
    </>
  )
}
```

#### Card - Карточка

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"

export function PositionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>React Developer</CardTitle>
        <CardDescription>Senior Level</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  )
}
```

#### Slider - Слайдер (для оценок 0-5)

```tsx
import { Slider } from "@/components/ui"
import { useState } from "react"

export function RatingSlider() {
  const [score, setScore] = useState([3])

  const labels = ["Совсем не знает", "Плохо", "Удовлетворительно", "Хорошо", "Отлично", "Идеально"]

  return (
    <div className="w-full max-w-xs">
      <Slider
        min={0}
        max={5}
        step={1}
        value={score}
        onValueChange={setScore}
      />
      <p className="mt-2 text-sm text-gray-600">
        {labels[score[0]]}
      </p>
    </div>
  )
}
```

#### Accordion - Аккордеон (для Table of Contents)

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui"

export function TableOfContents({ chapters }) {
  return (
    <Accordion type="single" collapsible>
      {chapters.map((chapter, idx) => (
        <AccordionItem key={idx} value={`chapter-${idx}`}>
          <AccordionTrigger>
            <span className="font-semibold">{chapter.title}</span>
            <span className="ml-auto text-sm text-gray-500">
              {chapter.questions.length} вопросов
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="pl-4 space-y-2">
              {chapter.questions.map((q, qIdx) => (
                <li key={qIdx} className="text-sm">{q.title}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
```

#### Select - Выпадающий список

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"

export function ChapterFilter() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Выберите главу" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Все главы</SelectItem>
        <SelectItem value="chapter1">Глава 1: Основы</SelectItem>
        <SelectItem value="chapter2">Глава 2: Продвинутые темы</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

#### Toast - Уведомления

```tsx
import { Button, useToast } from "@/components/ui"

export function SaveButton() {
  const { toast } = useToast()

  const handleSave = () => {
    // Ваша логика сохранения...
    toast({
      title: "Успех!",
      description: "Ваш ответ был сохранен",
    })
  }

  return <Button onClick={handleSave}>Сохранить</Button>
}
```

#### Dialog - Модальное окно

```tsx
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui"

export function ViewAnswerDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Показать ответ</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ответ на вопрос</DialogTitle>
          <DialogDescription>
            Полное объяснение ответа
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Markdown контент */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

#### Alert Dialog - Диалог подтверждения

```tsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button } from "@/components/ui"

export function ResetStatsButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Сбросить статистику</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя отменить. Все ваши результаты будут удалены.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction onClick={() => resetStats()}>
          Да, сбросить
        </AlertDialogAction>
        <AlertDialogCancel>Отмена</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

#### Badge - Метка

```tsx
import { Badge } from "@/components/ui"

export function DifficultyBadge({ level }) {
  const variants = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  }

  return <Badge variant="outline">{level}</Badge>
}
```

#### Progress - Прогресс-бар

```tsx
import { Progress } from "@/components/ui"

export function ProgressBar({ answeredCount, totalCount }) {
  const percentage = (answeredCount / totalCount) * 100

  return (
    <div>
      <p>{answeredCount} из {totalCount} вопросов</p>
      <Progress value={percentage} />
    </div>
  )
}
```

#### Tooltip - Подсказка

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Button } from "@/components/ui"

export function HelpButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">?</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Движущимся слайдер слева направо оцените ваш ответ</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

## Варианты стилей компонентов

### Button Variants
- `default` - основной стиль
- `secondary` - вторичный
- `destructive` - опасное действие (красный)
- `outline` - с рамкой
- `ghost` - минималистичный
- `link` - как ссылка

### Button Sizes
- `default` - стандартный размер
- `sm` - маленький
- `lg` - большой
- `icon` - для иконок

### Badge Variants
- `default` - заполненный черный
- `secondary` - светлый фон
- `destructive` - красный
- `outline` - только рамка

## Темный режим

Все компоненты поддерживают темный режим через Tailwind CSS:

```tsx
// Компоненты автоматически адаптируются к классу 'dark' на корневом элементе
<html className="dark">
  <App />
</html>
```

## Структура папок

```
src/
├── components/
│   ├── ui/                      # shadcn/ui компоненты
│   │   ├── index.ts             # Экспорт всех компонентов
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ... другие компоненты
│   └── examples/
│       └── ComponentExamples.tsx # Примеры использования
└── lib/
    └── utils.ts                  # Функция cn() для классов
```

## Следующие шаги

1. **Создать специфичные компоненты:**
   - `PositionCard` - карточка позиции
   - `QuestionView` - вид вопроса
   - `StatisticsPanel` - панель статистики
   - `InterviewMode` - режим интервью

2. **Интегрировать react-markdown:**
   ```tsx
   npm install react-markdown react-syntax-highlighter
   npm install -D @types/react-syntax-highlighter
   ```

3. **Добавить react-router:**
   ```tsx
   npm install react-router-dom
   ```

4. **Создать контекст для темы:**
   ```tsx
   // contexts/ThemeContext.tsx
   ```

5. **Реализовать localStorage для статистики:**
   ```tsx
   // hooks/useStatistics.ts
   ```

## Полезные ссылки

- Официальная документация: https://ui.shadcn.com/docs
- Radix UI примитивы: https://www.radix-ui.com/
- Tailwind CSS: https://tailwindcss.com/
- Lucide иконки: https://lucide.dev/

## Помощь

Для просмотра примеров всех компонентов, откройте файл:
`src/components/examples/ComponentExamples.tsx`

Вы можете использовать компонент `AllComponentsShowcase` для демонстрации всех компонентов в одном месте.
