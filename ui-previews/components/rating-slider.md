# Rating Slider Component - Слайдер оценки ответа

**Назначение**: Оценка ответа пользователя по шкале 0-5
**Используется в**: Question View Screen, Interview Mode

---

## ASCII Wireframe

### Desktop Version
```
┌─────────────────────────────────────────────────────────────────┐
│ 📊 Как вы оцениваете свой ответ?                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Совсем не знает ответ                       Полный ответ      │
│  0────────1────────2────────3────────4────────5                │
│            ○        ○        ●        ○        ○                │
│                              ↑                                  │
│                         (выбрано: 3)                            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [0]    [1]    [2]    [3]    [4]    [5]                 │   │
│  │   ○      ○      ○      ●      ○      ○                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 0 — Совсем не знает ответ                               │   │
│  │ 1-2 — Частичное понимание                               │   │
│  │ 3-4 — Хорошее знание                         ← выбрано  │   │
│  │ 5 — Полный ответ                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│            [ Сохранить оценку и продолжить → ]                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile Version (вертикальная ориентация опционально)
```
┌────────────────────────────┐
│ 📊 Оцените ответ           │
├────────────────────────────┤
│                            │
│ Не знаю     Полный ответ   │
│ 0─────2─────4─────5        │
│       ●                    │
│                            │
│ ┌────────────────────────┐ │
│ │ [0] [1] [2] [3] [4] [5]│ │
│ │  ○   ○   ●   ○   ○   ○ │ │
│ └────────────────────────┘ │
│                            │
│ Выбрано: 2/5               │
│ Частичное понимание        │
│                            │
│ [Сохранить и продолжить]   │
│                            │
└────────────────────────────┘
```

---

## Component Props

```typescript
interface RatingSliderProps {
  value: number | null;
  onChange: (value: number) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  isInterviewMode?: boolean;
  disabled?: boolean;
  showLabels?: boolean;
  showDescription?: boolean;
  className?: string;
}
```

---

## Implementation

```tsx
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { BarChart3, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const SCORE_LABELS = [
  { value: 0, label: 'Совсем не знает ответ', shortLabel: 'Не знаю' },
  { value: 1, label: 'Минимальное понимание', shortLabel: 'Мин.' },
  { value: 2, label: 'Частичное понимание', shortLabel: 'Частично' },
  { value: 3, label: 'Среднее знание', shortLabel: 'Средне' },
  { value: 4, label: 'Хорошее знание', shortLabel: 'Хорошо' },
  { value: 5, label: 'Полный ответ', shortLabel: 'Отлично' },
];

const SCORE_DESCRIPTIONS = [
  { range: [0], text: 'Совсем не знает ответ', color: 'text-muted-foreground' },
  { range: [1, 2], text: 'Частичное понимание', color: 'text-orange-500' },
  { range: [3, 4], text: 'Хорошее знание', color: 'text-blue-500' },
  { range: [5], text: 'Полный ответ', color: 'text-success' },
];

export function RatingSlider({
  value,
  onChange,
  onSubmit,
  isSubmitting = false,
  isInterviewMode = false,
  disabled = false,
  showLabels = true,
  showDescription = true,
  className,
}: RatingSliderProps) {
  const [isTouched, setIsTouched] = useState(false);

  // Get current description
  const getCurrentDescription = () => {
    if (value === null) return null;

    return SCORE_DESCRIPTIONS.find((desc) =>
      desc.range.includes(value)
    );
  };

  const currentDesc = getCurrentDescription();

  const handleSliderChange = (newValue: number[]) => {
    if (!isTouched) setIsTouched(true);
    onChange(newValue[0]);

    // Haptic feedback on mobile
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleCircleClick = (score: number) => {
    if (!isTouched) setIsTouched(true);
    onChange(score);
  };

  const handleSubmit = () => {
    if (value === null || disabled || isSubmitting) return;
    onSubmit();
  };

  return (
    <Card className={cn("max-w-4xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 size={20} />
          Как вы оцениваете свой ответ?
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Slider */}
        <div className="space-y-4">
          <div className="px-2">
            {/* Labels above slider */}
            {showLabels && (
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Совсем не знает ответ</span>
                <span>Полный ответ</span>
              </div>
            )}

            {/* Slider */}
            <Slider
              value={value !== null ? [value] : [0]}
              onValueChange={handleSliderChange}
              min={0}
              max={5}
              step={1}
              disabled={disabled}
              className={cn(
                "w-full cursor-pointer touch-none",
                value !== null && "opacity-100",
                value === null && "opacity-50"
              )}
              aria-label="Оценка вашего ответа от 0 до 5"
              aria-valuemin={0}
              aria-valuemax={5}
              aria-valuenow={value ?? 0}
              aria-valuetext={value !== null ? SCORE_LABELS[value].label : 'не выбрано'}
            />

            {/* Number labels below slider */}
            <div className="flex items-center justify-between mt-2 px-1">
              {[0, 1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => handleCircleClick(score)}
                  disabled={disabled}
                  className={cn(
                    "text-xs font-medium transition-colors",
                    "hover:text-primary cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "rounded px-1",
                    value === score && "text-primary font-bold scale-110",
                    disabled && "opacity-50 cursor-not-allowed"
                  )}
                  aria-label={`Выбрать оценку ${score}: ${SCORE_LABELS[score].label}`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Score Indicators (Circles) */}
          <div className="flex items-center justify-center gap-2 md:gap-3 py-4">
            {[0, 1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                onClick={() => handleCircleClick(score)}
                disabled={disabled}
                className={cn(
                  // Base styles
                  "w-10 h-10 md:w-12 md:h-12",
                  "rounded-full border-2",
                  "flex items-center justify-center",
                  "font-semibold text-sm md:text-base",
                  "transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

                  // Active state
                  value === score && [
                    "border-primary bg-primary text-primary-foreground",
                    "scale-110 shadow-lg shadow-primary/25",
                  ],

                  // Inactive state
                  value !== score && [
                    "border-muted-foreground/30 bg-background",
                    "hover:border-primary/50 hover:bg-primary/5 hover:scale-105",
                  ],

                  // Disabled state
                  disabled && "opacity-50 cursor-not-allowed hover:scale-100"
                )}
                aria-label={`Оценка ${score}: ${SCORE_LABELS[score].label}`}
                aria-pressed={value === score}
              >
                {score}
              </button>
            ))}
          </div>

          {/* Current Selection Display */}
          {value !== null && currentDesc && (
            <div className={cn(
              "text-center py-2 px-4 rounded-lg bg-muted/50",
              "transition-colors duration-200",
              isTouched && "animate-in fade-in slide-in-from-top-1"
            )}>
              <p className={cn("font-medium", currentDesc.color)}>
                {currentDesc.text}
              </p>
            </div>
          )}
        </div>

        {/* Score Descriptions */}
        {showDescription && (
          <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
            {SCORE_DESCRIPTIONS.map((desc, idx) => {
              const isActive = value !== null && desc.range.includes(value);

              return (
                <div
                  key={idx}
                  className={cn(
                    "flex items-start gap-2 transition-all duration-200",
                    isActive && "font-medium",
                    isActive && desc.color
                  )}
                >
                  <span className="font-semibold shrink-0">
                    {desc.range.length === 1 ? desc.range[0] : `${desc.range[0]}-${desc.range[1]}`}
                  </span>
                  <span>—</span>
                  <span className="flex-1">{desc.text}</span>
                  {isActive && (
                    <span className="shrink-0 text-primary">✓</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Submit Button */}
        <Button
          size="lg"
          className={cn(
            "w-full",
            value !== null && !isSubmitting && "animate-pulse-subtle"
          )}
          onClick={handleSubmit}
          disabled={value === null || disabled || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" />
              Сохранение...
            </>
          ) : isInterviewMode ? (
            <>
              Сохранить оценку и продолжить
              <ArrowRight size={20} className="ml-2" />
            </>
          ) : (
            'Сохранить оценку'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## Variants

### 1. Compact Variant (для мобильных)
```tsx
export function RatingSliderCompact({
  value,
  onChange,
  onSubmit,
  isSubmitting,
}: RatingSliderProps) {
  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      {/* Title */}
      <h3 className="text-sm font-medium">Оцените ответ</h3>

      {/* Slider */}
      <div>
        <Slider
          value={value !== null ? [value] : [0]}
          onValueChange={([v]) => onChange(v)}
          min={0}
          max={5}
          step={1}
          className="mb-2"
        />

        {/* Numbers */}
        <div className="flex justify-between text-xs">
          {[0, 1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={cn(
                "w-6 h-6 rounded-full border",
                value === n ? "bg-primary text-primary-foreground" : "bg-background"
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Current selection */}
      {value !== null && (
        <p className="text-sm text-center text-muted-foreground">
          Выбрано: {value}/5
        </p>
      )}

      {/* Submit */}
      <Button
        className="w-full"
        onClick={onSubmit}
        disabled={value === null || isSubmitting}
        size="sm"
      >
        Сохранить
      </Button>
    </div>
  );
}
```

### 2. Inline Variant (для списков вопросов)
```tsx
export function RatingSliderInline({
  value,
  onChange,
}: Pick<RatingSliderProps, 'value' | 'onChange'>) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground shrink-0">Оценка:</span>

      <div className="flex gap-1">
        {[0, 1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            onClick={() => onChange(score)}
            className={cn(
              "w-7 h-7 rounded-full text-xs font-medium transition-all",
              value === score
                ? "bg-primary text-primary-foreground scale-110"
                : "bg-muted hover:bg-muted-foreground/20"
            )}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### 3. Star Rating Variant (альтернативная визуализация)
```tsx
export function StarRatingSlider({
  value,
  onChange,
}: Pick<RatingSliderProps, 'value' | 'onChange'>) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          <Star
            size={32}
            className={cn(
              "transition-colors",
              value !== null && star <= value
                ? "fill-primary text-primary"
                : "text-muted-foreground/30"
            )}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-muted-foreground">
        {value !== null ? `${value}/5` : '—'}
      </span>
    </div>
  );
}
```

---

## Tailwind CSS Classes Breakdown

### Slider Container
```css
/* Base */
w-full cursor-pointer touch-none

/* States */
opacity-100 /* when value selected */
opacity-50  /* when no value */
```

### Circle Buttons
```css
/* Base */
w-10 h-10 md:w-12 md:h-12
rounded-full border-2
flex items-center justify-center
font-semibold text-sm md:text-base
transition-all duration-200

/* Active state */
border-primary bg-primary text-primary-foreground
scale-110 shadow-lg shadow-primary/25

/* Inactive state */
border-muted-foreground/30 bg-background
hover:border-primary/50 hover:bg-primary/5 hover:scale-105

/* Focus */
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

### Current Selection Display
```css
text-center py-2 px-4 rounded-lg bg-muted/50
transition-colors duration-200
animate-in fade-in slide-in-from-top-1
```

---

## Keyboard Navigation

### Implementation
```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;

    const currentValue = value ?? 0;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        onChange(Math.max(0, currentValue - 1));
        break;

      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        onChange(Math.min(5, currentValue + 1));
        break;

      case 'Home':
        e.preventDefault();
        onChange(0);
        break;

      case 'End':
        e.preventDefault();
        onChange(5);
        break;

      case 'Enter':
      case ' ':
        if (value !== null) {
          e.preventDefault();
          onSubmit();
        }
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [value, disabled, onChange, onSubmit]);
```

---

## Touch Gestures (Mobile)

### Swipe to rate
```tsx
import { useSwipeable } from 'react-swipeable';

const handlers = useSwipeable({
  onSwipedLeft: () => onChange(Math.max(0, (value ?? 0) - 1)),
  onSwipedRight: () => onChange(Math.min(5, (value ?? 0) + 1)),
  preventDefaultTouchmoveEvent: true,
  trackMouse: false,
});

<div {...handlers} className="touch-pan-y">
  <Slider ... />
</div>
```

---

## Accessibility

### ARIA Attributes
```tsx
<Slider
  aria-label="Оценка вашего ответа от 0 до 5"
  aria-valuemin={0}
  aria-valuemax={5}
  aria-valuenow={value ?? 0}
  aria-valuetext={value !== null ? SCORE_LABELS[value].label : 'не выбрано'}
/>

<button
  aria-label={`Выбрать оценку ${score}: ${SCORE_LABELS[score].label}`}
  aria-pressed={value === score}
  role="radio"
  aria-checked={value === score}
>
```

### Screen Reader Announcements
```tsx
import { useAnnouncer } from '@/hooks/useAnnouncer';

const announce = useAnnouncer();

const handleSliderChange = (newValue: number[]) => {
  onChange(newValue[0]);

  // Announce change to screen readers
  announce(`Выбрана оценка ${newValue[0]} из 5: ${SCORE_LABELS[newValue[0]].label}`);
};
```

---

## Animations

### Circle scale on select
```tsx
// В Tailwind config
module.exports = {
  theme: {
    extend: {
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
};
```

### Slide in description
```tsx
className={cn(
  "animate-in fade-in slide-in-from-top-1",
  "duration-200"
)}
```

---

## Dark Mode

### Автоматическая адаптация
```tsx
// Circle buttons
className={cn(
  "bg-background",  // Адаптируется автоматически
  "border-muted-foreground/30",
  value === score && "bg-primary text-primary-foreground"
)}

// Description box
className="bg-muted/30 dark:bg-muted/20"
```

---

## Performance Optimizations

### Debounced onChange
```tsx
import { useDebouncedCallback } from 'use-debounce';

const debouncedOnChange = useDebouncedCallback(
  (value: number) => onChange(value),
  100  // 100ms debounce
);
```

### Memoized descriptions
```tsx
const currentDesc = useMemo(() => {
  if (value === null) return null;
  return SCORE_DESCRIPTIONS.find((desc) => desc.range.includes(value));
}, [value]);
```

---

## Usage Examples

### Basic Usage
```tsx
import { RatingSlider } from '@/components/RatingSlider';

function QuestionView() {
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = async () => {
    await saveRating(rating);
    // Navigate to next question...
  };

  return (
    <RatingSlider
      value={rating}
      onChange={setRating}
      onSubmit={handleSubmit}
    />
  );
}
```

### Interview Mode
```tsx
<RatingSlider
  value={rating}
  onChange={setRating}
  onSubmit={handleSubmit}
  isInterviewMode={true}
  isSubmitting={isSubmitting}
/>
```

### Compact Mobile Version
```tsx
<div className="md:hidden">
  <RatingSliderCompact
    value={rating}
    onChange={setRating}
    onSubmit={handleSubmit}
  />
</div>

<div className="hidden md:block">
  <RatingSlider
    value={rating}
    onChange={setRating}
    onSubmit={handleSubmit}
  />
</div>
```

---

## shadcn/ui Components Used

```bash
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
```

---

**Файлы маршрутов**:
- `/Users/sunshad0w/Work/interviewer/ui-previews/components/rating-slider.md`
