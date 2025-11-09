# Metadata Section Component - Секция с метаданными

**Назначение**: Отображение метаданных должности
**Используется в**: Position Overview Screen

---

## ASCII Wireframe

```
┌─────────────────────────────────────┐
│ 📋 Метаданные                       │
├─────────────────────────────────────┤
│                                     │
│ 🎯 Целевая аудитория:               │
│    Senior Angular Developers        │
│                                     │
│ 📦 Охваченные версии:               │
│    [v14] [v15] [v16] [v17]          │
│                                     │
│ 📊 Уровень сложности:               │
│    [Senior]                         │
│                                     │
│ ───────────────────────             │
│                                     │
│ 📚 Всего вопросов: 70               │
│ 📖 Всего глав: 8                    │
│                                     │
│ ───────────────────────             │
│                                     │
│ 📊 Общий балл: 3.2/5                │
│ ✅ Прогресс: 42/70 (60%)            │
│ ████████████░░░░░░░                 │
│                                     │
│ ───────────────────────             │
│                                     │
│ 📝 Описание                  [▼]   │
│                                     │
└─────────────────────────────────────┘
```

---

## Component Props

```typescript
interface MetadataSectionProps {
  metadata: GuideMetadata;
  statistics: PositionStatistics;
  className?: string;
}

interface GuideMetadata {
  created_date: string;
  last_updated: string;
  target_audience: string;
  covered_versions: string[];
  total_questions: number;
  total_chapters: number;
  difficulty_level: string;
  guide_description: string;
}
```

---

## Implementation

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import {
  FileText,
  Target,
  Package,
  BarChart3,
  BookOpen,
  Layers,
  Award,
  TrendingUp,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

export function MetadataSection({
  metadata,
  statistics,
  className,
}: MetadataSectionProps) {
  const progressPercent = Math.round(
    (statistics.answeredCount / statistics.totalQuestions) * 100
  );

  const getDifficultyColor = (level: string) => {
    const colors: Record<string, string> = {
      'Junior': 'bg-green-500/10 text-green-700 border-green-500/20',
      'Middle': 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      'Senior': 'bg-orange-500/10 text-orange-700 border-orange-500/20',
      'Advanced': 'bg-red-500/10 text-red-700 border-red-500/20',
    };
    return colors[level] || 'bg-muted';
  };

  return (
    <Card className={cn("h-fit", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText size={20} />
          Метаданные
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Target Audience */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Target size={16} className="shrink-0" />
            <span className="font-medium">Целевая аудитория:</span>
          </div>
          <p className="text-sm pl-6 leading-relaxed">
            {metadata.target_audience}
          </p>
        </div>

        {/* Covered Versions */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package size={16} className="shrink-0" />
            <span className="font-medium">Охваченные версии:</span>
          </div>
          <div className="flex flex-wrap gap-2 pl-6">
            {metadata.covered_versions.map((version) => (
              <Badge
                key={version}
                variant="secondary"
                className="text-xs font-medium"
              >
                {version}
              </Badge>
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BarChart3 size={16} className="shrink-0" />
            <span className="font-medium">Уровень сложности:</span>
          </div>
          <div className="pl-6">
            <Badge
              className={cn(
                "font-medium border",
                getDifficultyColor(metadata.difficulty_level)
              )}
            >
              {metadata.difficulty_level}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen size={14} />
              <span>Всего вопросов:</span>
            </div>
            <span className="font-semibold">{metadata.total_questions}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Layers size={14} />
              <span>Всего глав:</span>
            </div>
            <span className="font-semibold">{metadata.total_chapters}</span>
          </div>
        </div>

        <Separator />

        {/* Overall Statistics */}
        <div className="space-y-3">
          {/* Overall Score */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Общий балл:</span>
            {statistics.overallScore > 0 ? (
              <div className="flex items-center gap-1.5">
                <Award size={16} className="text-primary" />
                <span className="text-lg font-bold">
                  {statistics.overallScore.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">/5</span>
              </div>
            ) : (
              <Badge variant="outline" className="text-xs">
                не начато
              </Badge>
            )}
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <TrendingUp size={14} />
                <span>Прогресс:</span>
              </div>
              <span className="font-medium">
                {statistics.answeredCount}/{statistics.totalQuestions}
                <span className="text-muted-foreground ml-1">
                  ({progressPercent}%)
                </span>
              </span>
            </div>

            <Progress value={progressPercent} className="h-2.5" />
          </div>
        </div>

        <Separator />

        {/* Description (collapsible) */}
        <Accordion type="single" collapsible>
          <AccordionItem value="description" className="border-0">
            <AccordionTrigger className="text-sm font-medium py-2 hover:no-underline">
              Описание
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{metadata.guide_description}</ReactMarkdown>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Created/Updated Dates (optional) */}
        <div className="pt-2 text-xs text-muted-foreground space-y-1">
          <div>Создано: {new Date(metadata.created_date).toLocaleDateString('ru-RU')}</div>
          <div>Обновлено: {new Date(metadata.last_updated).toLocaleDateString('ru-RU')}</div>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## Compact Variant (для мобильных)

```tsx
export function MetadataSectionCompact({
  metadata,
  statistics,
}: MetadataSectionProps) {
  const progressPercent = Math.round(
    (statistics.answeredCount / statistics.totalQuestions) * 100
  );

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {/* Overall Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Общий балл</p>
            <p className="text-2xl font-bold">
              {statistics.overallScore > 0
                ? statistics.overallScore.toFixed(1)
                : '—'}
              <span className="text-sm text-muted-foreground">/5</span>
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Прогресс</p>
            <p className="text-2xl font-bold">
              {progressPercent}
              <span className="text-sm text-muted-foreground">%</span>
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progressPercent} className="h-2" />

        <div className="text-sm text-center text-muted-foreground">
          {statistics.answeredCount} из {statistics.totalQuestions} вопросов
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="secondary">{metadata.difficulty_level}</Badge>
          <Badge variant="outline">{metadata.total_questions} вопросов</Badge>
          <Badge variant="outline">{metadata.total_chapters} глав</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## Sidebar Sticky Variant (для desktop)

```tsx
export function MetadataSidebar({
  metadata,
  statistics,
}: MetadataSectionProps) {
  return (
    <div className="sticky top-20 space-y-4">
      {/* Main Metadata Card */}
      <MetadataSection metadata={metadata} statistics={statistics} />

      {/* Actions Card (optional) */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <Button className="w-full" variant="default">
            Начать интервью
          </Button>

          <Button className="w-full" variant="outline">
            Экспорт статистики
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full" variant="ghost">
                <RefreshCw size={16} className="mr-2" />
                Сброс
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem>
                Сбросить всю статистику
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## States

### Loading State
```tsx
export function MetadataSectionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        <Skeleton className="h-2 w-full" />
      </CardContent>
    </Card>
  );
}
```

---

## Tailwind CSS Classes

### Container
```css
h-fit /* Allow natural height */
sticky top-20 /* Sticky on desktop */
```

### Metadata Item
```css
space-y-1.5 /* Spacing between label and value */
text-sm text-muted-foreground /* Label style */
pl-6 /* Indent for alignment with icon */
```

### Difficulty Badge Colors
```css
/* Junior */
bg-green-500/10 text-green-700 border-green-500/20

/* Middle */
bg-blue-500/10 text-blue-700 border-blue-500/20

/* Senior */
bg-orange-500/10 text-orange-700 border-orange-500/20

/* Advanced */
bg-red-500/10 text-red-700 border-red-500/20
```

---

## Accessibility

### Screen Reader Support
```tsx
<div
  role="region"
  aria-label="Метаданные должности"
>
  <MetadataSection />
</div>

<Progress
  value={progressPercent}
  aria-label={`Прогресс: ${progressPercent}%`}
  aria-valuenow={progressPercent}
  aria-valuemin={0}
  aria-valuemax={100}
/>
```

---

## Dark Mode

Автоматически адаптируется:

```tsx
// Prose для markdown
<div className="prose prose-sm dark:prose-invert">

// Difficulty badges
className={cn(
  "dark:bg-green-500/20",
  "dark:text-green-400",
  "dark:border-green-500/30"
)}
```

---

## shadcn/ui Components Used

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add skeleton
```

---

## Usage Example

```tsx
import { MetadataSection } from '@/components/MetadataSection';
import { usePosition } from '@/hooks/usePosition';
import { useStatistics } from '@/hooks/useStatistics';

export function PositionOverviewPage({ positionId }: { positionId: string }) {
  const { position } = usePosition(positionId);
  const { getPositionStats } = useStatistics();

  const stats = getPositionStats(positionId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:col-span-4">
        <MetadataSection
          metadata={position.metadata}
          statistics={stats}
          className="sticky top-20"
        />
      </aside>

      {/* Mobile Compact */}
      <div className="lg:hidden">
        <MetadataSectionCompact
          metadata={position.metadata}
          statistics={stats}
        />
      </div>

      {/* Main Content */}
      <main className="lg:col-span-8">
        <TableOfContents />
      </main>
    </div>
  );
}
```

---

**Файлы маршрутов**:
- `/Users/sunshad0w/Work/interviewer/ui-previews/components/metadata-section.md`
