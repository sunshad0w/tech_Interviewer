# Chapter Accordion Component - Раскрываемый список глав

**Назначение**: Отображение глав с вопросами в оглавлении
**Используется в**: Position Overview Screen

---

## ASCII Wireframe

### Collapsed State
```
┌─────────────────────────────────────────────────────────┐
│ ▶ 1. Angular Core & Fundamentals                        │
│    10 вопросов | Балл: 3.5 | 8/10 ✅                    │
└─────────────────────────────────────────────────────────┘
```

### Expanded State
```
┌─────────────────────────────────────────────────────────┐
│ ▼ 1. Angular Core & Fundamentals                        │
│    10 вопросов | Балл: 3.5 | 8/10 ✅                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   1.1 Что такое Angular?                                │
│       [●●●●○] 4/5                                       │
│                                                         │
│   1.2 Change Detection механизм                         │
│       [●●●○○] 3/5                                       │
│                                                         │
│   1.3 Dependency Injection                              │
│       не отвечено                                       │
│                                                         │
│   1.4 Модули и компоненты                               │
│       [●●●●●] 5/5                                       │
│                                                         │
│   ... еще 6 вопросов                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Component Props

```typescript
interface ChapterAccordionProps {
  chapter: Chapter;
  chapterStats: ChapterStatistics;
  isExpanded?: boolean;
  onQuestionClick: (questionNumber: number) => void;
  onChapterClick?: (chapterNumber: number) => void;
  className?: string;
}

interface Chapter {
  chapter_number: number;
  chapter_title: string;
  chapter_description?: string;
  questions: Question[];
}

interface ChapterStatistics {
  chapterNumber: number;
  chapterScore: number;
  answeredCount: number;
  totalQuestions: number;
  questions: QuestionStatistics[];
}
```

---

## Implementation

```tsx
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Award, CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuestionListItem } from './QuestionListItem';

export function ChapterAccordion({
  chapter,
  chapterStats,
  onQuestionClick,
  onChapterClick,
  className,
}: ChapterAccordionProps) {
  const progressPercent = Math.round(
    (chapterStats.answeredCount / chapterStats.totalQuestions) * 100
  );

  const hasScore = chapterStats.answeredCount > 0;

  return (
    <AccordionItem
      value={`chapter-${chapter.chapter_number}`}
      className={cn("border rounded-lg overflow-hidden", className)}
    >
      <AccordionTrigger
        className={cn(
          "hover:no-underline hover:bg-muted/50 transition-colors px-4 py-4",
          "[&[data-state=open]]:bg-muted/30"
        )}
        onClick={() => onChapterClick?.(chapter.chapter_number)}
      >
        <div className="flex items-center justify-between w-full pr-4">
          {/* Left Side - Chapter Info */}
          <div className="flex items-start gap-3 text-left flex-1 min-w-0">
            {/* Chapter Number Badge */}
            <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <span className="text-sm font-bold text-primary">
                {chapter.chapter_number}
              </span>
            </div>

            {/* Chapter Title */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold leading-tight mb-1 pr-2">
                {chapter.chapter_title}
              </h3>

              {/* Chapter Description (if exists) */}
              {chapter.chapter_description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {chapter.chapter_description}
                </p>
              )}
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="hidden md:flex items-center gap-4 shrink-0 text-sm text-muted-foreground">
            {/* Questions Count */}
            <div className="flex items-center gap-1.5">
              <BookOpen size={14} />
              <span>{chapter.questions.length} вопросов</span>
            </div>

            {/* Score */}
            {hasScore && (
              <div className="flex items-center gap-1.5">
                <Award size={14} className="text-primary" />
                <span className="font-medium text-foreground">
                  {chapterStats.chapterScore.toFixed(1)}
                </span>
              </div>
            )}

            {/* Progress */}
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className={hasScore ? "text-success" : "text-muted-foreground"} />
              <span className={hasScore ? "font-medium text-foreground" : ""}>
                {chapterStats.answeredCount}/{chapterStats.totalQuestions}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Stats (below title) */}
        <div className="flex md:hidden items-center gap-3 text-xs text-muted-foreground mt-2 pr-4">
          <span className="flex items-center gap-1">
            <BookOpen size={12} />
            {chapter.questions.length}
          </span>

          {hasScore && (
            <>
              <span className="flex items-center gap-1">
                <Award size={12} className="text-primary" />
                {chapterStats.chapterScore.toFixed(1)}
              </span>

              <span className="flex items-center gap-1">
                <CheckCircle size={12} className="text-success" />
                {chapterStats.answeredCount}/{chapterStats.totalQuestions}
              </span>
            </>
          )}

          {!hasScore && (
            <Badge variant="outline" className="text-xs">
              не начато
            </Badge>
          )}
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-4 pb-4 pt-2">
        <div className="space-y-1">
          {/* Progress Bar (if started) */}
          {hasScore && (
            <div className="mb-4 px-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                <span>Прогресс главы</span>
                <span className="font-medium">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-1.5" />
            </div>
          )}

          {/* Questions List */}
          {chapter.questions.map((question) => {
            const questionStat = chapterStats.questions.find(
              (q) => q.questionNumber === question.question_number
            );

            return (
              <QuestionListItem
                key={question.question_number}
                question={question}
                stats={questionStat}
                onClick={() => onQuestionClick(question.question_number)}
              />
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
```

---

## Question List Item Component

```tsx
interface QuestionListItemProps {
  question: Question;
  stats?: QuestionStatistics;
  onClick: () => void;
  className?: string;
}

export function QuestionListItem({
  question,
  stats,
  onClick,
  className,
}: QuestionListItemProps) {
  const hasScore = stats?.answerScore !== null;

  return (
    <button
      onClick={onClick}
      className={cn(
        // Base styles
        "w-full group",
        "flex items-center justify-between gap-3",
        "px-3 py-2.5",
        "rounded-md",
        "text-left",
        "transition-colors duration-200",

        // Hover
        "hover:bg-muted",

        // Focus
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",

        className
      )}
      aria-label={`${question.question_title}, ${hasScore ? `оценка ${stats.answerScore} из 5` : 'не отвечено'}`}
    >
      {/* Left Side - Question Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Question Number */}
        <span className="text-xs font-medium text-muted-foreground shrink-0 w-8">
          {question.question_number}
        </span>

        {/* Question Title */}
        <span className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
          {question.question_title}
        </span>
      </div>

      {/* Right Side - Score */}
      <div className="shrink-0">
        {hasScore ? (
          <div className="flex items-center gap-2">
            {/* Score Stars */}
            <div className="hidden sm:flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors",
                    star <= stats.answerScore
                      ? "bg-primary"
                      : "bg-muted-foreground/20"
                  )}
                />
              ))}
            </div>

            {/* Score Number */}
            <span className="text-sm font-semibold min-w-[2rem] text-right">
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
  );
}
```

---

## Full Usage Example

```tsx
import { Accordion } from '@/components/ui/accordion';
import { ChapterAccordion } from '@/components/ChapterAccordion';

export function TableOfContents({ chapters, statistics, onQuestionClick }: TOCProps) {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([
    'chapter-1', // Expand first chapter by default
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen size={20} />
          Оглавление
        </CardTitle>
      </CardHeader>

      <CardContent className="px-2">
        <Accordion
          type="multiple"
          value={expandedChapters}
          onValueChange={setExpandedChapters}
        >
          {chapters.map((chapter) => {
            const chapterStats = statistics.statistics.find(
              (s) => s.chapterNumber === chapter.chapter_number
            );

            return (
              <ChapterAccordion
                key={chapter.chapter_number}
                chapter={chapter}
                chapterStats={chapterStats}
                onQuestionClick={onQuestionClick}
              />
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
```

---

## Variants

### 1. Compact Variant (Mobile)
```tsx
export function ChapterAccordionCompact({ chapter, chapterStats, onQuestionClick }: ChapterAccordionProps) {
  return (
    <AccordionItem value={`chapter-${chapter.chapter_number}`}>
      <AccordionTrigger className="px-3 py-3 text-sm">
        <div className="flex items-center justify-between w-full pr-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">{chapter.chapter_number}.</span>
            <span className="font-medium">{chapter.chapter_title}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {chapterStats.answeredCount}/{chapterStats.totalQuestions}
          </Badge>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-3 pb-3">
        <div className="space-y-1">
          {chapter.questions.map(question => (
            <QuestionListItemCompact
              key={question.question_number}
              question={question}
              stats={getQuestionStats(question.question_number)}
              onClick={() => onQuestionClick(question.question_number)}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
```

### 2. With Chapter Actions (Reset, Stats)
```tsx
export function ChapterAccordionWithActions({
  chapter,
  chapterStats,
  onQuestionClick,
  onResetChapter,
}: ChapterAccordionProps & { onResetChapter: () => void }) {
  return (
    <AccordionItem value={`chapter-${chapter.chapter_number}`}>
      <AccordionTrigger>
        {/* ... chapter header ... */}
      </AccordionTrigger>

      <AccordionContent>
        {/* Chapter Actions Bar */}
        <div className="flex items-center justify-between mb-3 px-2 py-2 bg-muted/30 rounded-md">
          <div className="text-sm text-muted-foreground">
            Средний балл: <span className="font-semibold text-foreground">{chapterStats.chapterScore.toFixed(1)}/5</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onResetChapter}>
                <RefreshCw size={14} className="mr-2" />
                Сбросить главу
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Questions */}
        <div className="space-y-1">
          {/* ... questions list ... */}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
```

---

## Interactive States

### 1. Hover State
```tsx
// Для trigger
className="hover:bg-muted/50"

// Для question item
className="hover:bg-muted group-hover:text-primary"
```

### 2. Active/Expanded State
```tsx
// Автоматически применяется shadcn/ui Accordion
[&[data-state=open]]:bg-muted/30
```

### 3. Loading State
```tsx
export function ChapterAccordionSkeleton() {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
        <Skeleton className="w-20 h-5" />
      </div>
    </div>
  );
}
```

---

## Animations

### Expand/Collapse Animation
```tsx
// Встроено в shadcn/ui Accordion
// Использует Radix UI анимации

// Можно кастомизировать в globals.css:
@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes accordion-up {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}
```

### Question Items Stagger Animation
```tsx
import { motion } from 'framer-motion';

<AccordionContent>
  <div className="space-y-1">
    {chapter.questions.map((question, index) => (
      <motion.div
        key={question.question_number}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.03 }}
      >
        <QuestionListItem ... />
      </motion.div>
    ))}
  </div>
</AccordionContent>
```

---

## Tailwind CSS Classes

### Accordion Trigger
```css
/* Base */
hover:no-underline
hover:bg-muted/50
transition-colors
px-4 py-4

/* Expanded state */
[&[data-state=open]]:bg-muted/30
```

### Question Item
```css
/* Base */
w-full group
flex items-center justify-between gap-3
px-3 py-2.5
rounded-md
text-left
transition-colors duration-200

/* Hover */
hover:bg-muted

/* Focus */
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

### Score Stars
```css
w-2.5 h-2.5 rounded-full transition-colors
bg-primary /* filled */
bg-muted-foreground/20 /* empty */
```

---

## Accessibility

### Keyboard Navigation
- `Tab` - navigate between accordion triggers
- `Enter` / `Space` - expand/collapse chapter
- `Tab` inside expanded - navigate questions
- `Enter` on question - open question

### ARIA Labels
```tsx
<AccordionItem
  aria-label={`Глава ${chapter.chapter_number}: ${chapter.chapter_title}`}
>

<button
  aria-label={`${question.question_title}, ${hasScore ? `оценка ${score} из 5` : 'не отвечено'}`}
  role="button"
>
```

### Screen Reader Support
```tsx
// Progress announcement
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {`Прогресс главы ${chapter.chapter_number}: ${progressPercent}%`}
</div>
```

---

## Performance Optimizations

### Virtualization for Long Lists
```tsx
import { FixedSizeList } from 'react-window';

// Если в главе > 50 вопросов
{chapter.questions.length > 50 ? (
  <FixedSizeList
    height={400}
    itemCount={chapter.questions.length}
    itemSize={50}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>
        <QuestionListItem question={chapter.questions[index]} ... />
      </div>
    )}
  </FixedSizeList>
) : (
  chapter.questions.map(question => ...)
)}
```

### Memoization
```tsx
const ChapterAccordion = memo(
  function ChapterAccordion({ chapter, chapterStats, ... }: ChapterAccordionProps) {
    // ... component code
  },
  (prev, next) => {
    return (
      prev.chapter.chapter_number === next.chapter.chapter_number &&
      prev.chapterStats.chapterScore === next.chapterStats.chapterScore &&
      prev.chapterStats.answeredCount === next.chapterStats.answeredCount
    );
  }
);
```

---

## Dark Mode

Автоматически адаптируется через CSS переменные:

```tsx
// Light mode
bg-muted/50
text-muted-foreground
border-border

// Dark mode (автоматически)
dark:bg-muted/50
dark:text-muted-foreground
dark:border-border
```

---

## shadcn/ui Components Used

```bash
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add dropdown-menu  # for actions
npx shadcn-ui@latest add skeleton  # for loading states
```

---

**Файлы маршрутов**:
- `/Users/sunshad0w/Work/interviewer/ui-previews/components/chapter-accordion.md`
