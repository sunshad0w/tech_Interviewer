# Position Overview Screen - Экран обзора должности

**Назначение**: Детальная информация о должности, метаданные, оглавление с вопросами, статистика
**Маршрут**: `/position/:positionId`

---

## ASCII Wireframe

### Desktop Layout (с боковым оглавлением)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  ← Назад      Angular Senior Developer                     [🌙 Theme]  [Reset] │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────────┐  ┌────────────────────────────────────────┐ │
│  │ 📋 Метаданные                 │  │ 📚 Оглавление                          │ │
│  ├───────────────────────────────┤  ├────────────────────────────────────────┤ │
│  │                               │  │                                        │ │
│  │ 🎯 Целевая аудитория:         │  │ ▼ 1. Angular Core & Fundamentals      │ │
│  │    Senior Angular Developers  │  │    10 вопросов | Балл: 3.5 | 8/10 ✅  │ │
│  │                               │  │                                        │ │
│  │ 📦 Охваченные версии:         │  │    1.1 Что такое Angular?              │ │
│  │    Angular 14-17              │  │        [●●●●○] 4/5                     │ │
│  │                               │  │                                        │ │
│  │ 📊 Уровень сложности:         │  │    1.2 Change Detection механизм       │ │
│  │    Senior                     │  │        [●●●○○] 3/5                     │ │
│  │                               │  │                                        │ │
│  │ 📚 Всего вопросов: 70         │  │    1.3 Dependency Injection            │ │
│  │ 📖 Всего глав: 8              │  │        [○○○○○] не отвечено             │ │
│  │                               │  │                                        │ │
│  │ ──────────────────────────    │  │    ...еще 7 вопросов                   │ │
│  │                               │  │                                        │ │
│  │ 📊 Общий балл: 3.2/5          │  │ ▶ 2. RxJS & Reactive Programming       │ │
│  │ ✅ Прогресс: 42/70 (60%)      │  │    12 вопросов | Балл: 2.1 | 5/12 ✅  │ │
│  │                               │  │                                        │ │
│  │ ┌───────────────────────┐     │  │ ▶ 3. Angular Router                    │ │
│  │ │ ████████████░░░░░ 60% │     │  │    8 вопросов | Балл: 4.2 | 7/8 ✅    │ │
│  │ └───────────────────────┘     │  │                                        │ │
│  │                               │  │ ▶ 4. Forms & Validation                │ │
│  ├───────────────────────────────┤  │    9 вопросов | Балл: 3.0 | 6/9 ✅    │ │
│  │ 📝 Описание                   │  │                                        │ │
│  ├───────────────────────────────┤  │ ▶ 5. State Management                  │ │
│  │                               │  │    11 вопросов | Балл: 2.8 | 4/11 ✅   │ │
│  │ Подробное руководство для     │  │                                        │ │
│  │ подготовки к интервью на      │  │ ▶ 6. Performance & Optimization        │ │
│  │ позицию Senior Angular        │  │    10 вопросов | Балл: 3.5 | 6/10 ✅   │ │
│  │ Developer. Включает темы:     │  │                                        │ │
│  │ - Core концепции              │  │ ▶ 7. Testing                           │ │
│  │ - Advanced patterns           │  │    7 вопросов | не начато              │ │
│  │ - Best practices              │  │                                        │ │
│  │ ...                           │  │ ▶ 8. Security & Best Practices         │ │
│  │                               │  │    3 вопроса | не начато               │ │
│  │                               │  │                                        │ │
│  └───────────────────────────────┘  └────────────────────────────────────────┘ │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  [📖 Приступить к интервью ▼]  [Все главы ▼]  [⟲ Сбросить статистику]  │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Tablet/Mobile Layout (вертикальный scroll)
```
┌──────────────────────────────────────┐
│  ← Назад  Angular Senior Dev  [🌙]   │
├──────────────────────────────────────┤
│                                      │
│  📊 Общая статистика                 │
│  ┌────────────────────────────────┐  │
│  │ Балл: 3.2/5                    │  │
│  │ Прогресс: 42/70 (60%)          │  │
│  │ ███████████░░░░░░░              │  │
│  └────────────────────────────────┘  │
│                                      │
│  📋 Метаданные                       │
│  ┌────────────────────────────────┐  │
│  │ 🎯 Senior                      │  │
│  │ 📚 70 вопросов | 📖 8 глав     │  │
│  │ 📦 Angular 14-17               │  │
│  │                                │  │
│  │ [Показать описание ▼]          │  │
│  └────────────────────────────────┘  │
│                                      │
│  📚 Оглавление                       │
│  ┌────────────────────────────────┐  │
│  │ ▼ 1. Angular Core              │  │
│  │    10 вопр. | 3.5 | 8/10 ✅    │  │
│  │                                │  │
│  │    1.1 Что такое Angular?      │  │
│  │        [●●●●○] 4/5             │  │
│  │                                │  │
│  │    1.2 Change Detection        │  │
│  │        [●●●○○] 3/5             │  │
│  │                                │  │
│  │    1.3 Dependency Injection    │  │
│  │        не отвечено             │  │
│  │                                │  │
│  │    [...еще 7 вопросов]         │  │
│  │                                │  │
│  │ ▶ 2. RxJS & Reactive           │  │
│  │    12 вопр. | 2.1 | 5/12 ✅    │  │
│  │                                │  │
│  │ ▶ 3. Angular Router            │  │
│  │    8 вопр. | 4.2 | 7/8 ✅      │  │
│  │                                │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ [Начать интервью]              │  │
│  │ [Фильтр: Все главы ▼]          │  │
│  │ [⟲ Сбросить]                   │  │
│  └────────────────────────────────┘  │
│                                      │
└──────────────────────────────────────┘
```

---

## Детальное описание секций

### 1. Header Navigation
```tsx
<header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
  <div className="container flex h-16 items-center justify-between px-4">
    {/* Left - Back Button */}
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={20} />
      </Button>
      <h1 className="text-xl font-bold line-clamp-1">
        {position.guide_name}
      </h1>
    </div>

    {/* Right - Actions */}
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <RefreshCw size={16} />
            <span className="hidden md:inline ml-2">Сброс</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={resetAllStats}>
            Сбросить всю статистику
          </DropdownMenuItem>
          <DropdownMenuItem onClick={resetChapterStats}>
            Сбросить главу
          </DropdownMenuItem>
          <DropdownMenuItem onClick={resetQuestionStat}>
            Сбросить вопрос
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</header>
```

**Tailwind классы**:
- Sticky header: `sticky top-0 z-20 border-b bg-background/95 backdrop-blur`
- Flex layout: `flex items-center justify-between`
- Responsive text: `text-xl font-bold line-clamp-1`

---

### 2. Metadata Section (левая колонка на desktop)

```tsx
<Card className="h-fit sticky top-20">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <FileText size={20} />
      Метаданные
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">
    {/* Target Audience */}
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Target size={16} />
        <span className="font-medium">Целевая аудитория:</span>
      </div>
      <p className="text-sm pl-6">{metadata.target_audience}</p>
    </div>

    {/* Covered Versions */}
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Package size={16} />
        <span className="font-medium">Охваченные версии:</span>
      </div>
      <div className="flex flex-wrap gap-2 pl-6">
        {metadata.covered_versions.map(version => (
          <Badge key={version} variant="secondary">
            {version}
          </Badge>
        ))}
      </div>
    </div>

    {/* Difficulty */}
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <BarChart3 size={16} />
        <span className="font-medium">Уровень сложности:</span>
      </div>
      <Badge variant="default" className="ml-6">
        {metadata.difficulty_level}
      </Badge>
    </div>

    <Separator />

    {/* Totals */}
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Всего вопросов:</span>
        <span className="font-semibold">{metadata.total_questions}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Всего глав:</span>
        <span className="font-semibold">{metadata.total_chapters}</span>
      </div>
    </div>

    <Separator />

    {/* Overall Statistics */}
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Общий балл:</span>
        <div className="flex items-center gap-1.5">
          <Award size={16} className="text-primary" />
          <span className="text-lg font-bold">{stats.overallScore.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">/5</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Прогресс:</span>
          <span className="font-medium">
            {stats.answeredCount}/{stats.totalQuestions} ({progressPercent}%)
          </span>
        </div>
        <Progress value={progressPercent} className="h-2.5" />
      </div>
    </div>

    <Separator />

    {/* Description (collapsible) */}
    <Accordion type="single" collapsible>
      <AccordionItem value="description">
        <AccordionTrigger className="text-sm font-medium">
          Описание
        </AccordionTrigger>
        <AccordionContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{metadata.guide_description}</ReactMarkdown>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </CardContent>
</Card>
```

**Tailwind классы**:
- Sticky card: `h-fit sticky top-20`
- Spacing: `space-y-4` (между блоками)
- Icons: `size={16}` для маленьких иконок
- Progress bar: `h-2.5` (немного толще стандартного)

---

### 3. Table of Contents (правая колонка / основной контент)

#### 3.1 Chapter Item (свернутый)
```tsx
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <BookOpen size={20} />
      Оглавление
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-2">
    <Accordion type="multiple" defaultValue={expandedChapters}>
      {chapters.map((chapter, idx) => (
        <AccordionItem key={chapter.chapter_number} value={`chapter-${idx}`}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full pr-4">
              {/* Chapter Title */}
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">
                  {chapter.chapter_number}. {chapter.chapter_title}
                </span>
              </div>

              {/* Chapter Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} />
                  {chapter.questions.length} вопросов
                </span>

                {chapterStats.answeredCount > 0 && (
                  <>
                    <span className="flex items-center gap-1.5">
                      <Award size={14} className="text-primary" />
                      {chapterStats.chapterScore.toFixed(1)}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-success" />
                      {chapterStats.answeredCount}/{chapterStats.totalQuestions}
                    </span>
                  </>
                )}
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="space-y-1 pt-2">
              {chapter.questions.map((question) => (
                <QuestionItem
                  key={question.question_number}
                  question={question}
                  stats={getQuestionStats(question.question_number)}
                  onClick={() => navigateToQuestion(question.question_number)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </CardContent>
</Card>
```

#### 3.2 Question Item (внутри раскрытой главы)
```tsx
<button
  className="
    w-full
    group
    flex items-center justify-between
    px-4 py-3
    rounded-md
    hover:bg-muted
    transition-colors
    cursor-pointer
  "
  onClick={onClick}
>
  {/* Question Info */}
  <div className="flex items-center gap-3 flex-1 text-left">
    {/* Question Number */}
    <span className="text-sm font-medium text-muted-foreground shrink-0">
      {question.question_number}
    </span>

    {/* Question Title */}
    <span className="text-sm font-medium group-hover:text-primary transition-colors">
      {question.question_title}
    </span>
  </div>

  {/* Question Score */}
  <div className="flex items-center gap-2 shrink-0">
    {stats?.answerScore !== null ? (
      <div className="flex items-center gap-1.5">
        {/* Score Stars */}
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={cn(
                "w-3 h-3 rounded-full",
                star <= stats.answerScore
                  ? "bg-primary"
                  : "bg-muted-foreground/20"
              )}
            />
          ))}
        </div>

        {/* Score Number */}
        <span className="text-sm font-semibold">
          {stats.answerScore}/5
        </span>
      </div>
    ) : (
      <Badge variant="outline" className="text-xs">
        не отвечено
      </Badge>
    )}
  </div>
</button>
```

**Tailwind классы**:
- Button: `w-full group flex items-center justify-between`
- Hover: `hover:bg-muted hover:text-primary transition-colors`
- Stars: `w-3 h-3 rounded-full bg-primary`

---

### 4. Action Buttons Section (внизу страницы)

```tsx
<div className="sticky bottom-0 bg-background border-t p-4">
  <div className="container max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
      {/* Start Interview Button */}
      <Button
        size="lg"
        className="flex-1 md:flex-none"
        onClick={startInterview}
      >
        <Play size={20} className="mr-2" />
        Приступить к интервью
      </Button>

      {/* Chapter Filter */}
      <Select value={selectedChapter} onValueChange={setSelectedChapter}>
        <SelectTrigger className="w-full md:w-[240px]">
          <SelectValue placeholder="Выберите главу" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все главы</SelectItem>
          <SelectSeparator />
          {chapters.map((chapter) => (
            <SelectItem key={chapter.chapter_number} value={chapter.chapter_number.toString()}>
              Глава {chapter.chapter_number}: {chapter.chapter_title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Reset Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="lg">
            <RefreshCw size={18} className="mr-2" />
            <span className="hidden md:inline">Сбросить</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={resetAllStats}>
            Сбросить всю статистику
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</div>
```

**Tailwind классы**:
- Sticky footer: `sticky bottom-0 bg-background border-t p-4`
- Flex layout: `flex flex-col md:flex-row gap-4`
- Responsive width: `w-full md:w-[240px]`

---

## Адаптивность

### Desktop (>= 1024px)
```tsx
<div className="container max-w-7xl mx-auto px-6 py-8">
  <div className="grid grid-cols-12 gap-6">
    {/* Metadata Sidebar */}
    <aside className="col-span-4">
      <MetadataCard />
    </aside>

    {/* Table of Contents */}
    <main className="col-span-8">
      <TableOfContents />
    </main>
  </div>
</div>
```

### Tablet (768px - 1023px)
```tsx
<div className="container mx-auto px-6 py-8">
  <div className="space-y-6">
    {/* Metadata Card (collapsible) */}
    <Accordion type="single" collapsible>
      <AccordionItem value="metadata">
        <AccordionTrigger>Метаданные и статистика</AccordionTrigger>
        <AccordionContent>
          <MetadataCard />
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    {/* Table of Contents */}
    <TableOfContents />
  </div>
</div>
```

### Mobile (< 768px)
```tsx
<div className="px-4 py-6 space-y-6">
  {/* Compact Stats Card */}
  <Card>
    <CardContent className="pt-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Балл:</span>
        <span className="text-lg font-bold">{stats.overallScore.toFixed(1)}/5</span>
      </div>
      <Progress value={progressPercent} />
      <div className="text-sm text-muted-foreground text-center">
        {stats.answeredCount}/{stats.totalQuestions} ({progressPercent}%)
      </div>
    </CardContent>
  </Card>

  {/* Collapsible Metadata */}
  <Accordion type="single" collapsible>
    <AccordionItem value="metadata">
      <AccordionTrigger>Метаданные</AccordionTrigger>
      <AccordionContent>
        <MetadataContent />
      </AccordionContent>
    </AccordionItem>
  </Accordion>

  {/* Table of Contents */}
  <TableOfContents />

  {/* Sticky Action Buttons */}
  <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
    <Button className="w-full" onClick={startInterview}>
      Начать интервью
    </Button>
  </div>
</div>
```

---

## Интерактивные состояния

### 1. Hover на вопросе
```tsx
className="
  hover:bg-muted
  hover:text-primary
  hover:scale-[1.01]
  transition-all
  duration-200
"
```

### 2. Expanded/Collapsed главы
```tsx
// Используем Accordion от shadcn/ui с анимацией
<Accordion type="multiple" defaultValue={['chapter-0', 'chapter-1']}>
  {/* Анимация раскрытия/сворачивания встроена в компонент */}
</Accordion>
```

### 3. Score visualization (звездочки)
```tsx
function ScoreStars({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={cn(
            "w-3 h-3 rounded-full transition-colors",
            star <= score
              ? "bg-primary"
              : "bg-muted-foreground/20"
          )}
        />
      ))}
    </div>
  );
}
```

### 4. Progress indicator по главам
```tsx
<div className="flex items-center gap-2">
  <Progress value={chapterProgress} className="h-1.5 flex-1" />
  <span className="text-xs text-muted-foreground">
    {answeredCount}/{totalQuestions}
  </span>
</div>
```

---

## Dark Mode

**Автоматически применяется через Tailwind dark: классы**:

```tsx
<Card className="bg-card text-card-foreground border-border">
  <div className="prose prose-sm dark:prose-invert">
    {/* Markdown content */}
  </div>
</Card>
```

**Особые случаи**:
- Code blocks в markdown: автоматически через `vscDarkPlus` / `vs` темы
- Progress bars: `bg-primary` автоматически адаптируется
- Stars: `bg-primary` / `bg-muted-foreground/20` работают в обеих темах

---

## Accessibility

### Keyboard Navigation
```tsx
// Навигация по вопросам
<button
  role="button"
  tabIndex={0}
  aria-label={`${question.question_title}, ${score ? `балл ${score} из 5` : 'не отвечено'}`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  }}
>
```

### Screen Reader Support
```tsx
<Progress
  value={progressPercent}
  aria-label={`Прогресс по должности: ${progressPercent}%`}
  aria-valuenow={progressPercent}
  aria-valuemin={0}
  aria-valuemax={100}
/>

<Accordion
  type="multiple"
  aria-label="Оглавление с вопросами"
>
```

---

## Анимации

### Chapter Expand/Collapse
```tsx
// Встроено в shadcn/ui Accordion
// Использует Radix UI анимации
<AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
```

### Question Item Hover
```tsx
className="
  transition-all
  duration-200
  hover:scale-[1.01]
  hover:shadow-sm
"
```

### Progress Bar Animation
```tsx
<Progress
  value={progressPercent}
  className="transition-all duration-500 ease-out"
/>
```

---

## shadcn/ui Components Used

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog  # для reset confirmation
```

---

## Пример полной реализации

```tsx
// src/pages/PositionOverviewPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft, Play, RefreshCw, Award, BookOpen, CheckCircle,
  Target, Package, BarChart3, FileText
} from 'lucide-react';
import { usePosition } from '@/hooks/usePosition';
import { useStatistics } from '@/hooks/useStatistics';
import ReactMarkdown from 'react-markdown';

export function PositionOverviewPage() {
  const { positionId } = useParams();
  const navigate = useNavigate();
  const { position, isLoading } = usePosition(positionId);
  const { getPositionStats, resetPositionStats } = useStatistics();
  const [selectedChapter, setSelectedChapter] = useState<string>('all');

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!position) {
    return <ErrorState />;
  }

  const stats = getPositionStats(positionId);
  const progressPercent = Math.round((stats.answeredCount / stats.totalQuestions) * 100);

  const startInterview = () => {
    navigate(`/interview/${positionId}?chapter=${selectedChapter}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold line-clamp-1">{position.guide_name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ResetDropdown onReset={resetPositionStats} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Metadata Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4">
            <MetadataCard position={position} stats={stats} progressPercent={progressPercent} />
          </aside>

          {/* Metadata Accordion (Mobile/Tablet) */}
          <div className="lg:hidden">
            <CompactStatsCard stats={stats} progressPercent={progressPercent} />
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="metadata">
                <AccordionTrigger>Метаданные и описание</AccordionTrigger>
                <AccordionContent>
                  <MetadataContent position={position} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Table of Contents */}
          <main className="lg:col-span-8">
            <TableOfContentsCard
              chapters={position.chapters}
              stats={stats}
              onQuestionClick={(questionNumber) => navigate(`/question/${positionId}/${questionNumber}`)}
            />
          </main>
        </div>
      </div>

      {/* Action Buttons (Sticky Footer) */}
      <div className="sticky bottom-0 bg-background border-t p-4">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <Button size="lg" className="flex-1 md:flex-none" onClick={startInterview}>
              <Play size={20} className="mr-2" />
              Приступить к интервью
            </Button>

            <Select value={selectedChapter} onValueChange={setSelectedChapter}>
              <SelectTrigger className="w-full md:w-[240px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все главы</SelectItem>
                {position.chapters.map((ch) => (
                  <SelectItem key={ch.chapter_number} value={ch.chapter_number.toString()}>
                    Глава {ch.chapter_number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

**Файлы маршрутов**:
- `/Users/sunshad0w/Work/interviewer/ui-previews/screens/position-overview.md`
