# Position Card Component - Карточка должности

**Назначение**: Отображение должности с метаданными и статистикой на главной странице
**Используется в**: Home Screen

---

## ASCII Wireframe

### Desktop/Tablet Version
```
┌────────────────────────────────────┐
│ Angular Senior Developer      [●] │  ← Badge (difficulty)
│                                    │
│ 🎯 Senior                          │  ← Metadata row 1
│ 📚 70 вопросов  📖 8 глав          │  ← Metadata row 2
│                                    │
│ ┌────────────────────────────────┐ │
│ │ 📊 Средний балл                │ │
│ │           3.2/5   ⭐⭐⭐         │ │  ← Score display
│ └────────────────────────────────┘ │
│                                    │
│ Прогресс: 42/70 (60%)              │
│ ████████████░░░░░░░                │  ← Progress bar
│                                    │
│        [ Продолжить ]              │  ← Action button
└────────────────────────────────────┘
```

### Mobile Version (compact)
```
┌──────────────────────────┐
│ Angular Senior Dev  [●]  │
│                          │
│ 🎯 Senior | 📚 70 вопр.  │
│                          │
│ 📊 Балл: 3.2/5           │
│ ✅ Прогресс: 60%         │
│ ████████████░░░░░        │
│                          │
│   [ Продолжить ]         │
└──────────────────────────┘
```

---

## Component Props

```typescript
interface PositionCardProps {
  position: InterviewGuide;
  statistics: PositionStatistics;
  onClick: () => void;
  className?: string;
}
```

---

## Implementation

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Layers, Award, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PositionCard({
  position,
  statistics,
  onClick,
  className
}: PositionCardProps) {
  // Calculate progress
  const progressPercent = statistics.totalQuestions > 0
    ? Math.round((statistics.answeredCount / statistics.totalQuestions) * 100)
    : 0;

  // Determine button text
  const getButtonText = () => {
    if (progressPercent === 0) return 'Начать';
    if (progressPercent === 100) return 'Просмотреть';
    return 'Продолжить';
  };

  // Get difficulty badge variant
  const getDifficultyVariant = (level: string): BadgeProps['variant'] => {
    const variants: Record<string, BadgeProps['variant']> = {
      'Junior': 'secondary',
      'Middle': 'default',
      'Senior': 'destructive',
      'Advanced': 'destructive',
    };
    return variants[level] || 'secondary';
  };

  return (
    <Card
      className={cn(
        // Base styles
        "group relative overflow-hidden",
        "h-full flex flex-col",
        "cursor-pointer",
        "transition-all duration-300",

        // Hover effects
        "hover:shadow-lg",
        "hover:border-primary",
        "hover:-translate-y-1",

        // Focus styles
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",

        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${position.guide_name}, уровень ${position.metadata.difficulty_level}, ${statistics.answeredCount} из ${statistics.totalQuestions} вопросов отвечено`}
    >
      {/* Header */}
      <CardHeader className="pb-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl md:text-2xl font-bold line-clamp-2 leading-tight">
            {position.guide_name}
          </CardTitle>

          <Badge
            variant={getDifficultyVariant(position.metadata.difficulty_level)}
            className="shrink-0"
          >
            {position.metadata.difficulty_level}
          </Badge>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1 flex flex-col space-y-4 pt-0">
        {/* Metadata */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BookOpen size={16} className="shrink-0" />
            <span>{position.metadata.total_questions} вопросов</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers size={16} className="shrink-0" />
            <span>{position.metadata.total_chapters} глав</span>
          </div>
        </div>

        {/* Score Section */}
        <div className="p-3 bg-muted/50 rounded-lg border border-muted">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Средний балл
            </span>

            {statistics.overallScore > 0 ? (
              <div className="flex items-center gap-2">
                <Award size={16} className="text-primary" />
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold">
                    {statistics.overallScore.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">/5</span>
                </div>
              </div>
            ) : (
              <Badge variant="outline" className="text-xs">
                не начато
              </Badge>
            )}
          </div>

          {/* Star Rating Visual (optional) */}
          {statistics.overallScore > 0 && (
            <div className="flex gap-0.5 mt-2 justify-end">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors",
                    star <= Math.round(statistics.overallScore)
                      ? "bg-primary"
                      : "bg-muted-foreground/20"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div className="space-y-2 mt-auto">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <TrendingUp size={14} />
              Прогресс
            </span>
            <span className="font-medium">
              {statistics.answeredCount}/{statistics.totalQuestions}
              <span className="text-muted-foreground ml-1">
                ({progressPercent}%)
              </span>
            </span>
          </div>

          <Progress
            value={progressPercent}
            className="h-2"
            aria-label={`Прогресс выполнения: ${progressPercent}%`}
          />
        </div>

        {/* Action Button */}
        <Button
          className="w-full mt-2"
          variant="default"
          size="default"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            onClick();
          }}
        >
          {getButtonText()}
        </Button>
      </CardContent>

      {/* Hover Indicator (subtle glow) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
}
```

---

## Variants

### 1. Compact Variant (для мобильных)
```tsx
export function PositionCardCompact({ position, statistics, onClick }: PositionCardProps) {
  const progressPercent = Math.round((statistics.answeredCount / statistics.totalQuestions) * 100);

  return (
    <Card
      className="group hover:shadow-md hover:border-primary transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">
            {position.guide_name}
          </CardTitle>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {position.metadata.difficulty_level}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {/* Compact metadata */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>🎯 {position.metadata.difficulty_level}</span>
          <span>📚 {position.metadata.total_questions} вопр.</span>
        </div>

        {/* Compact stats */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Балл:</span>
          <span className="font-bold">
            {statistics.overallScore > 0 ? `${statistics.overallScore.toFixed(1)}/5` : 'не начато'}
          </span>
        </div>

        <Progress value={progressPercent} className="h-1.5" />

        <Button className="w-full" size="sm">
          {progressPercent === 0 ? 'Начать' : 'Продолжить'}
        </Button>
      </CardContent>
    </Card>
  );
}
```

### 2. List Variant (для компактного списка)
```tsx
export function PositionCardList({ position, statistics, onClick }: PositionCardProps) {
  const progressPercent = Math.round((statistics.answeredCount / statistics.totalQuestions) * 100);

  return (
    <Card
      className="group hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen size={24} className="text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{position.guide_name}</h3>
              <Badge variant="outline" className="shrink-0 text-xs">
                {position.metadata.difficulty_level}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{position.metadata.total_questions} вопросов</span>
              <span>•</span>
              <span>Балл: {statistics.overallScore.toFixed(1)}/5</span>
              <span>•</span>
              <span>{progressPercent}%</span>
            </div>
          </div>

          {/* Action */}
          <Button variant="ghost" size="icon" className="shrink-0">
            <ChevronRight size={20} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## States

### 1. Loading State (Skeleton)
```tsx
export function PositionCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>

        <Skeleton className="h-20 w-full rounded-lg" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-2 w-full" />
        </div>

        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
```

### 2. Empty State (No Statistics)
```tsx
// Показывается когда statistics.answeredCount === 0
<div className="p-3 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
  <div className="text-center text-sm text-muted-foreground">
    <p>Вы еще не начали подготовку</p>
    <p className="text-xs mt-1">Начните интервью, чтобы увидеть статистику</p>
  </div>
</div>
```

### 3. Completed State (100%)
```tsx
// Когда progressPercent === 100
<div className="p-3 bg-success/10 rounded-lg border border-success/20">
  <div className="flex items-center gap-2 text-success">
    <CheckCircle size={20} />
    <span className="font-medium">Все вопросы отвечены!</span>
  </div>
</div>
```

---

## Tailwind CSS Classes Breakdown

### Card Container
```css
/* Base */
group relative overflow-hidden
h-full flex flex-col
cursor-pointer
transition-all duration-300

/* Hover */
hover:shadow-lg
hover:border-primary
hover:-translate-y-1

/* Focus */
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

### Title
```css
text-xl md:text-2xl
font-bold
line-clamp-2
leading-tight
```

### Metadata Icons
```css
flex items-center gap-1.5
text-sm text-muted-foreground
shrink-0
```

### Score Box
```css
p-3
bg-muted/50
rounded-lg
border border-muted
```

### Progress Bar
```css
h-2
transition-all duration-500
```

---

## Responsive Behavior

### Mobile (< 640px)
- Title: `text-lg` (smaller)
- Padding: `p-4` (less padding)
- Metadata: stacked vertically if needed
- Button: `size="sm"`

### Tablet (640px - 1024px)
- Title: `text-xl`
- Padding: `p-5`
- Grid: 2 columns

### Desktop (>= 1024px)
- Title: `text-2xl`
- Padding: `p-6`
- Grid: 3 columns
- Hover effects более выраженные

---

## Accessibility

### Keyboard Navigation
```tsx
tabIndex={0}
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick();
  }
}}
```

### ARIA Labels
```tsx
role="button"
aria-label={`${position.guide_name}, уровень ${difficulty}, ${answered} из ${total} вопросов отвечено`}
```

### Screen Reader Support
```tsx
<Progress
  value={progressPercent}
  aria-label={`Прогресс выполнения: ${progressPercent}%`}
  aria-valuenow={progressPercent}
  aria-valuemin={0}
  aria-valuemax={100}
/>
```

---

## Animations

### Entrance Animation (using Framer Motion)
```tsx
import { motion } from 'framer-motion';

export function PositionCardAnimated({ index, ...props }: PositionCardProps & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05, // Staggered animation
        ease: 'easeOut'
      }}
    >
      <PositionCard {...props} />
    </motion.div>
  );
}
```

### Hover Glow Effect
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
```

---

## Dark Mode

Автоматически адаптируется через Tailwind dark mode:

```tsx
// Светлая тема
bg-card text-card-foreground border-border
bg-muted/50

// Темная тема (автоматически через CSS vars)
dark:bg-card dark:text-card-foreground dark:border-border
dark:bg-muted/50
```

---

## Performance Optimizations

### Memoization
```tsx
import { memo } from 'react';

export const PositionCard = memo(
  function PositionCard({ position, statistics, onClick }: PositionCardProps) {
    // ... component code
  },
  (prevProps, nextProps) => {
    // Custom comparison
    return (
      prevProps.position.guide_name === nextProps.position.guide_name &&
      prevProps.statistics.overallScore === nextProps.statistics.overallScore &&
      prevProps.statistics.answeredCount === nextProps.statistics.answeredCount
    );
  }
);
```

### Lazy Loading Images (if added)
```tsx
<img
  src={position.thumbnail}
  alt=""
  loading="lazy"
  className="w-full h-32 object-cover rounded-t-lg"
/>
```

---

## Usage Example

```tsx
import { PositionCard } from '@/components/PositionCard';
import { usePositions } from '@/hooks/usePositions';
import { useStatistics } from '@/hooks/useStatistics';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const { positions } = usePositions();
  const { getPositionStats } = useStatistics();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {positions.map((position, index) => (
        <PositionCard
          key={position.id}
          position={position}
          statistics={getPositionStats(position.id)}
          onClick={() => navigate(`/position/${position.id}`)}
        />
      ))}
    </div>
  );
}
```

---

**Файлы маршрутов**:
- `/Users/sunshad0w/Work/interviewer/ui-previews/components/position-card.md`
