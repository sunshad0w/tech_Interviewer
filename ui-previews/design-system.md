# Design System - Interview Preparation App

**Дата создания**: 2025-11-08
**Технологии**: React + TypeScript + Vite + shadcn/ui + Tailwind CSS

---

## 1. Цветовая палитра

### Light Mode
```css
/* Background Colors */
--background: 0 0% 100%;           /* hsl(0, 0%, 100%) - #FFFFFF */
--foreground: 222.2 84% 4.9%;      /* hsl(222.2, 84%, 4.9%) - #020817 */

/* Card Colors */
--card: 0 0% 100%;                 /* hsl(0, 0%, 100%) - #FFFFFF */
--card-foreground: 222.2 84% 4.9%; /* hsl(222.2, 84%, 4.9%) - #020817 */

/* Primary Colors (для акцентов) */
--primary: 221.2 83.2% 53.3%;      /* hsl(221.2, 83.2%, 53.3%) - #3B82F6 */
--primary-foreground: 210 40% 98%; /* hsl(210, 40%, 98%) - #F8FAFC */

/* Secondary Colors */
--secondary: 210 40% 96.1%;        /* hsl(210, 40%, 96.1%) - #F1F5F9 */
--secondary-foreground: 222.2 47.4% 11.2%; /* #1E293B */

/* Muted Colors */
--muted: 210 40% 96.1%;            /* hsl(210, 40%, 96.1%) - #F1F5F9 */
--muted-foreground: 215.4 16.3% 46.9%; /* #64748B */

/* Border */
--border: 214.3 31.8% 91.4%;       /* hsl(214.3, 31.8%, 91.4%) - #E2E8F0 */
--input: 214.3 31.8% 91.4%;        /* hsl(214.3, 31.8%, 91.4%) - #E2E8F0 */
--ring: 221.2 83.2% 53.3%;         /* hsl(221.2, 83.2%, 53.3%) - #3B82F6 */

/* Success/Warning/Error */
--success: 142.1 76.2% 36.3%;      /* hsl(142.1, 76.2%, 36.3%) - #16A34A */
--warning: 38 92% 50%;             /* hsl(38, 92%, 50%) - #F59E0B */
--destructive: 0 84.2% 60.2%;      /* hsl(0, 84.2%, 60.2%) - #EF4444 */
```

### Dark Mode
```css
/* Background Colors */
--background: 222.2 84% 4.9%;      /* hsl(222.2, 84%, 4.9%) - #020817 */
--foreground: 210 40% 98%;         /* hsl(210, 40%, 98%) - #F8FAFC */

/* Card Colors */
--card: 222.2 84% 4.9%;            /* hsl(222.2, 84%, 4.9%) - #020817 */
--card-foreground: 210 40% 98%;    /* hsl(210, 40%, 98%) - #F8FAFC */

/* Primary Colors */
--primary: 217.2 91.2% 59.8%;      /* hsl(217.2, 91.2%, 59.8%) - #3B82F6 */
--primary-foreground: 222.2 47.4% 11.2%; /* #1E293B */

/* Secondary Colors */
--secondary: 217.2 32.6% 17.5%;    /* hsl(217.2, 32.6%, 17.5%) - #1E293B */
--secondary-foreground: 210 40% 98%; /* #F8FAFC */

/* Muted Colors */
--muted: 217.2 32.6% 17.5%;        /* hsl(217.2, 32.6%, 17.5%) - #1E293B */
--muted-foreground: 215 20.2% 65.1%; /* #94A3B8 */

/* Border */
--border: 217.2 32.6% 17.5%;       /* hsl(217.2, 32.6%, 17.5%) - #1E293B */
--input: 217.2 32.6% 17.5%;        /* hsl(217.2, 32.6%, 17.5%) - #1E293B */
--ring: 224.3 76.3% 48%;           /* hsl(224.3, 76.3%, 48%) - #3B82F6 */

/* Success/Warning/Error */
--success: 142.1 70.6% 45.3%;      /* hsl(142.1, 70.6%, 45.3%) - #22C55E */
--warning: 38 92% 50%;             /* hsl(38, 92%, 50%) - #F59E0B */
--destructive: 0 62.8% 30.6%;      /* hsl(0, 62.8%, 30.6%) - #991B1B */
```

### Семантические цвета для рейтинга

```css
/* Score Colors (0-5) */
--score-0: 0 0% 50%;               /* Серый - нет знаний */
--score-1: 0 84% 60%;              /* Красный - минимальные знания */
--score-2: 38 92% 50%;             /* Оранжевый - частичное понимание */
--score-3: 45 93% 47%;             /* Желтый - среднее знание */
--score-4: 142 76% 36%;            /* Зеленый - хорошее знание */
--score-5: 142 76% 36%;            /* Темно-зеленый - полный ответ */

/* Progress Colors */
--progress-empty: 214.3 31.8% 91.4%;    /* Светло-серый */
--progress-filled: 221.2 83.2% 53.3%;   /* Синий */
```

---

## 2. Типографика

### Шрифты
```css
/* Font Families */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Размеры текста (Tailwind)
```
text-xs     → 0.75rem (12px)  - метки, подписи
text-sm     → 0.875rem (14px) - вторичный текст
text-base   → 1rem (16px)     - основной текст
text-lg     → 1.125rem (18px) - увеличенный текст
text-xl     → 1.25rem (20px)  - подзаголовки
text-2xl    → 1.5rem (24px)   - заголовки карточек
text-3xl    → 1.875rem (30px) - заголовки страниц
text-4xl    → 2.25rem (36px)  - главные заголовки
```

### Веса шрифта
```
font-normal   → 400 (основной текст)
font-medium   → 500 (акценты)
font-semibold → 600 (подзаголовки)
font-bold     → 700 (заголовки)
```

### Line Heights
```
leading-tight   → 1.25    (заголовки)
leading-normal  → 1.5     (основной текст)
leading-relaxed → 1.625   (длинные тексты)
```

---

## 3. Spacing & Layout

### Spacing Scale (Tailwind)
```
space-1  → 0.25rem (4px)
space-2  → 0.5rem (8px)
space-3  → 0.75rem (12px)
space-4  → 1rem (16px)
space-6  → 1.5rem (24px)
space-8  → 2rem (32px)
space-12 → 3rem (48px)
space-16 → 4rem (64px)
```

### Container
```css
/* Max Widths */
max-w-screen-sm   → 640px   (mobile)
max-w-screen-md   → 768px   (tablet)
max-w-screen-lg   → 1024px  (laptop)
max-w-screen-xl   → 1280px  (desktop)
max-w-screen-2xl  → 1536px  (wide desktop)
```

### Breakpoints
```css
sm: '640px',   /* Mobile landscape / Small tablets */
md: '768px',   /* Tablets */
lg: '1024px',  /* Laptops / Small desktops */
xl: '1280px',  /* Desktops */
2xl: '1536px'  /* Large desktops */
```

---

## 4. Border Radius

```css
rounded-none → 0px
rounded-sm   → 0.125rem (2px)
rounded      → 0.25rem (4px)
rounded-md   → 0.375rem (6px)
rounded-lg   → 0.5rem (8px)
rounded-xl   → 0.75rem (12px)
rounded-2xl  → 1rem (16px)
rounded-full → 9999px (полный круг)
```

### Использование
- **Карточки**: `rounded-lg` (8px)
- **Кнопки**: `rounded-md` (6px)
- **Inputs**: `rounded-md` (6px)
- **Badges**: `rounded-full` (полный)
- **Модальные окна**: `rounded-xl` (12px)

---

## 5. Shadows

### Light Mode
```css
/* Карточки */
shadow-sm  → 0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow     → 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
shadow-md  → 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
shadow-lg  → 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)

/* Hover эффекты */
shadow-xl  → 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
```

### Dark Mode
```css
/* Используем более тонкие тени для темной темы */
dark:shadow-sm  → 0 1px 2px 0 rgb(0 0 0 / 0.3)
dark:shadow     → 0 1px 3px 0 rgb(0 0 0 / 0.4)
dark:shadow-md  → 0 4px 6px -1px rgb(0 0 0 / 0.5)
```

---

## 6. Interactive States

### Hover
```css
/* Buttons */
hover:bg-opacity-90
hover:shadow-md
hover:scale-[1.02]
transition-all duration-200

/* Cards */
hover:shadow-lg
hover:border-primary
transition-all duration-300
```

### Active
```css
active:scale-[0.98]
active:shadow-sm
```

### Focus
```css
focus:outline-none
focus:ring-2
focus:ring-ring
focus:ring-offset-2
```

### Disabled
```css
disabled:opacity-50
disabled:cursor-not-allowed
disabled:hover:shadow-none
```

---

## 7. Animation & Transitions

### Durations
```css
duration-75   → 75ms   (мгновенные изменения)
duration-100  → 100ms  (быстрые переходы)
duration-200  → 200ms  (стандартные переходы)
duration-300  → 300ms  (плавные переходы)
duration-500  → 500ms  (медленные переходы)
```

### Easing Functions
```css
ease-linear      → linear
ease-in          → cubic-bezier(0.4, 0, 1, 1)
ease-out         → cubic-bezier(0, 0, 0.2, 1)
ease-in-out      → cubic-bezier(0.4, 0, 0.2, 1)
```

### Ключевые анимации
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide Down (для Accordion) */
@keyframes slideDown {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}
```

---

## 8. Icons

### Библиотека
**Рекомендуется**: `lucide-react` (работает с shadcn/ui)

```bash
npm install lucide-react
```

### Основные иконки
```typescript
import {
  Home,           // Главная
  BookOpen,       // Обзор должности
  CheckCircle,    // Завершенный вопрос
  Circle,         // Незавершенный вопрос
  ChevronDown,    // Раскрыть
  ChevronRight,   // Свернуть
  Sun,            // Light mode
  Moon,           // Dark mode
  BarChart3,      // Статистика
  RefreshCw,      // Сброс
  Play,           // Начать интервью
  ArrowLeft,      // Назад
  Eye,            // Показать ответ
  EyeOff,         // Скрыть ответ
  Award,          // Баллы
  TrendingUp,     // Прогресс
} from 'lucide-react';
```

### Размеры иконок
```tsx
size={16}  // Small (текст, badges)
size={20}  // Medium (кнопки, заголовки)
size={24}  // Large (основные действия)
size={32}  // XLarge (пустые состояния)
```

---

## 9. Components (shadcn/ui)

### Необходимые компоненты

```bash
# Базовые компоненты
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add separator

# Формы и инпуты
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add select
npx shadcn-ui@latest add switch

# Навигация
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add tabs

# Обратная связь
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add alert-dialog
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add progress

# Утилиты
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add skeleton
```

---

## 10. Grid System

### Карточки должностей (Home Screen)

```tsx
/* Mobile (1 column) */
<div className="grid grid-cols-1 gap-4 p-4">

/* Tablet (2 columns) */
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

/* Desktop (3 columns) */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
```

---

## 11. Z-Index Scale

```css
z-0    → 0      (base)
z-10   → 10     (dropdowns)
z-20   → 20     (sticky headers)
z-30   → 30     (modals backdrop)
z-40   → 40     (modals)
z-50   → 50     (tooltips, popovers)
```

---

## 12. Accessibility

### Focus Indicators
```css
/* Всегда видимые focus rings */
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

### ARIA Labels
```tsx
<button aria-label="Показать ответ">
<div role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
<nav aria-label="Основная навигация">
```

### Keyboard Navigation
- `Tab` / `Shift+Tab` - навигация между элементами
- `Enter` / `Space` - активация кнопок
- `Escape` - закрытие модальных окон
- `Arrow Keys` - навигация в списках и слайдерах

---

## 13. Responsive Design Strategy

### Mobile First Approach
```css
/* Base styles - mobile */
.element { }

/* Tablet and up */
@media (min-width: 768px) { }

/* Desktop and up */
@media (min-width: 1024px) { }
```

### Tailwind Breakpoint Prefixes
```tsx
<div className="
  p-4           /* mobile: padding 1rem */
  md:p-6        /* tablet: padding 1.5rem */
  lg:p-8        /* desktop: padding 2rem */
">
```

---

## 14. Performance Optimizations

### Lazy Loading
```tsx
import { lazy, Suspense } from 'react';

const QuestionView = lazy(() => import('./QuestionView'));

<Suspense fallback={<Skeleton />}>
  <QuestionView />
</Suspense>
```

### Memoization
```tsx
import { memo, useMemo } from 'react';

const PositionCard = memo(({ position }) => {
  const score = useMemo(() => calculateScore(position), [position]);
  return <Card>...</Card>;
});
```

---

## 15. Markdown Styling

### Code Blocks
```tsx
// Light mode theme
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Dark mode theme
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Custom styles for markdown
const markdownStyles = {
  h1: 'text-3xl font-bold mt-8 mb-4',
  h2: 'text-2xl font-semibold mt-6 mb-3',
  h3: 'text-xl font-semibold mt-4 mb-2',
  p: 'text-base leading-relaxed mb-4',
  ul: 'list-disc list-inside mb-4 space-y-2',
  ol: 'list-decimal list-inside mb-4 space-y-2',
  code: 'bg-muted px-1.5 py-0.5 rounded text-sm font-mono',
  pre: 'bg-muted p-4 rounded-lg overflow-x-auto mb-4',
  blockquote: 'border-l-4 border-primary pl-4 italic text-muted-foreground mb-4',
  table: 'w-full border-collapse mb-4',
  th: 'border border-border bg-muted p-2 text-left font-semibold',
  td: 'border border-border p-2',
};
```

---

## Использование Design System

### Пример компонента с использованием всех токенов

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, TrendingUp } from 'lucide-react';

function PositionCard({ position, score, progress }) {
  return (
    <Card className="
      hover:shadow-lg
      hover:border-primary
      transition-all
      duration-300
      cursor-pointer
    ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          {position.name}
          <Badge variant="secondary" className="ml-auto">
            {position.difficulty}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Award size={16} />
          <span className="text-sm">Средний балл: {score}/5</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <TrendingUp size={16} />
          <span className="text-sm">Прогресс: {progress}%</span>
        </div>

        <Button className="w-full" variant="default">
          Открыть
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

**Примечание**: Эта дизайн-система полностью совместима с shadcn/ui и Tailwind CSS. Все значения можно настроить в `tailwind.config.js` и `globals.css`.
