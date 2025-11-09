# Navigation Components - Навигационные компоненты

**Назначение**: Header, Theme Toggle, Breadcrumbs, Back buttons
**Используется в**: Все экраны

---

## Components Overview

1. **Main Header** - основной header приложения
2. **Theme Toggle** - переключатель темы
3. **Breadcrumbs** - хлебные крошки
4. **Back Button** - кнопка возврата
5. **Progress Indicator** - индикатор прогресса (для интервью)

---

## 1. Main Header

### ASCII Wireframe

#### Desktop
```
┌──────────────────────────────────────────────────────────┐
│  📚 Interview Preparation           [🌙 Theme]  [Profile] │
└──────────────────────────────────────────────────────────┘
```

#### Mobile
```
┌────────────────────────┐
│ ☰  Interview  [🌙] [@] │
└────────────────────────┘
```

### Implementation

```tsx
import { Button } from '@/components/ui/button';
import { Menu, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

export function MainHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "border-b bg-background/95 backdrop-blur",
        "supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Открыть меню"
          >
            <Menu size={24} />
          </Button>

          {/* Logo & Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-lg">📚</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold hidden sm:block">
              Interview Preparation
            </h1>
            <h1 className="text-lg font-bold sm:hidden">
              Interview
            </h1>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* User Profile (optional) */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Профиль пользователя"
          >
            <User size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
```

---

## 2. Theme Toggle

### Implementation

```tsx
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Переключить тему"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          Светлая
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          Темная
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <span className="mr-2">💻</span>
          Системная
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Simple Toggle Variant (без dropdown)
export function ThemeToggleSimple() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

---

## 3. Breadcrumbs

### ASCII Wireframe
```
Главная > Angular Senior Developer > Вопрос 15
```

### Implementation

```tsx
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className={cn("flex items-center gap-2 text-sm", className)}
    >
      <ol className="flex items-center gap-2 overflow-x-auto">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2 shrink-0">
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1.5",
                    "hover:text-primary transition-colors",
                    "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className={cn(
                  "flex items-center gap-1.5",
                  isLast ? "font-medium text-foreground" : "text-muted-foreground"
                )}>
                  {item.icon}
                  <span className="line-clamp-1">{item.label}</span>
                </span>
              )}

              {!isLast && (
                <ChevronRight size={14} className="text-muted-foreground shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Usage Example
function QuestionPageBreadcrumbs() {
  return (
    <Breadcrumbs
      items={[
        { label: 'Главная', href: '/', icon: <Home size={14} /> },
        { label: 'Angular Senior Developer', href: '/position/angular' },
        { label: 'Вопрос 15' },
      ]}
    />
  );
}
```

---

## 4. Context Header (для вопросов)

### ASCII Wireframe
```
┌────────────────────────────────────────────────────┐
│  ← Назад    Вопрос 15 из 70      [🌙]  [✕ Выйти]  │
└────────────────────────────────────────────────────┘
```

### Implementation

```tsx
import { ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from './ThemeToggle';

interface ContextHeaderProps {
  onBack: () => void;
  currentIndex?: number;
  totalCount?: number;
  badge?: string;
  onExit?: () => void;
  className?: string;
}

export function ContextHeader({
  onBack,
  currentIndex,
  totalCount,
  badge,
  onExit,
  className,
}: ContextHeaderProps) {
  return (
    <header className={cn(
      "sticky top-0 z-20",
      "border-b bg-background/95 backdrop-blur",
      className
    )}>
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left Side */}
        <div className="flex items-center gap-3 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            aria-label="Назад"
          >
            <ArrowLeft size={20} />
          </Button>

          <div className="flex items-center gap-3">
            {currentIndex !== undefined && totalCount !== undefined && (
              <span className="text-sm font-medium text-muted-foreground">
                Вопрос {currentIndex} из {totalCount}
              </span>
            )}

            {badge && (
              <Badge variant="secondary" className="animate-pulse">
                {badge}
              </Badge>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {onExit && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExit}
              className="gap-1.5"
            >
              <X size={16} />
              <span className="hidden md:inline">Завершить</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

// Usage in Interview Mode
function InterviewHeader() {
  const navigate = useNavigate();

  return (
    <ContextHeader
      onBack={() => navigate(-1)}
      currentIndex={15}
      totalCount={70}
      badge="🎯 Режим интервью"
      onExit={() => {
        if (confirm('Завершить интервью?')) {
          navigate('/position/angular');
        }
      }}
    />
  );
}
```

---

## 5. Progress Indicator (для интервью)

### ASCII Wireframe
```
┌────────────────────────────────────────────────┐
│ 🎯 Режим интервью | Глава: Все | ████░░ 3/28   │
└────────────────────────────────────────────────┘
```

### Implementation

```tsx
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  label?: string;
  chapterFilter?: string;
  className?: string;
}

export function ProgressIndicator({
  current,
  total,
  label = 'Режим интервью',
  chapterFilter,
  className,
}: ProgressIndicatorProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className={cn(
      "bg-muted/50 border-b px-4 py-3",
      className
    )}>
      <div className="container max-w-4xl mx-auto space-y-2">
        <div className="flex items-center justify-between text-sm flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="animate-pulse">
              🎯 {label}
            </Badge>

            {chapterFilter && (
              <span className="text-muted-foreground">
                Глава: {chapterFilter}
              </span>
            )}
          </div>

          <span className="font-medium">
            {current}/{total} ({percent}%)
          </span>
        </div>

        <Progress value={percent} className="h-2" />
      </div>
    </div>
  );
}
```

---

## 6. Chapter Context Banner

### ASCII Wireframe
```
┌──────────────────────────────────────────┐
│ 📖 Angular Core & Fundamentals  Глава 1  │
└──────────────────────────────────────────┘
```

### Implementation

```tsx
import { BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChapterBannerProps {
  chapterTitle: string;
  chapterNumber: number;
  className?: string;
}

export function ChapterBanner({
  chapterTitle,
  chapterNumber,
  className,
}: ChapterBannerProps) {
  return (
    <div className={cn(
      "bg-muted/50 border-b px-4 py-3",
      className
    )}>
      <div className="container max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen size={18} className="text-muted-foreground shrink-0" />
          <span className="text-sm font-medium line-clamp-1">
            {chapterTitle}
          </span>
        </div>

        <Badge variant="outline" className="shrink-0">
          Глава {chapterNumber}
        </Badge>
      </div>
    </div>
  );
}
```

---

## 7. Back Button (Standalone)

### Implementation

```tsx
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function BackButton({
  to,
  label = 'Назад',
  className,
}: {
  to?: string;
  label?: string;
  className?: string;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn("gap-2", className)}
    >
      <ArrowLeft size={18} />
      <span>{label}</span>
    </Button>
  );
}

// Inline variant
export function BackButtonInline({
  onClick,
  label = 'Назад',
}: {
  onClick?: () => void;
  label?: string;
}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={onClick || (() => navigate(-1))}
      className={cn(
        "inline-flex items-center gap-2",
        "text-sm font-medium",
        "text-muted-foreground hover:text-primary",
        "transition-colors"
      )}
    >
      <ArrowLeft size={16} />
      <span>{label}</span>
    </button>
  );
}
```

---

## Tailwind CSS Classes

### Sticky Header
```css
/* Base */
sticky top-0 z-50
border-b bg-background/95 backdrop-blur
supports-[backdrop-filter]:bg-background/60

/* Container */
container flex h-16 items-center justify-between px-4
```

### Theme Toggle Animation
```css
/* Sun icon */
rotate-0 scale-100 transition-all
dark:-rotate-90 dark:scale-0

/* Moon icon */
rotate-90 scale-0 transition-all
dark:rotate-0 dark:scale-100
```

### Breadcrumbs
```css
/* Base */
flex items-center gap-2 text-sm

/* Link */
hover:text-primary transition-colors text-muted-foreground

/* Current */
font-medium text-foreground
```

---

## Responsive Behavior

### Mobile (<640px)
```tsx
// Hide full title, show short version
<h1 className="text-lg font-bold sm:hidden">Interview</h1>
<h1 className="text-lg md:text-xl font-bold hidden sm:block">
  Interview Preparation
</h1>

// Hide labels in buttons
<Button>
  <X size={16} />
  <span className="hidden md:inline">Завершить</span>
</Button>
```

### Tablet/Desktop (>=640px)
```tsx
// Show full navigation
// Larger icons
// More spacing
```

---

## Accessibility

### Keyboard Navigation
```tsx
// Header links
<Button
  tabIndex={0}
  aria-label="Открыть меню"
>

// Theme toggle
<Button
  aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
>
```

### Screen Reader Support
```tsx
// Breadcrumbs
<nav aria-label="Breadcrumbs">

// Progress
<Progress
  aria-label={`Прогресс интервью: ${percent}%`}
  aria-valuenow={percent}
  aria-valuemin={0}
  aria-valuemax={100}
/>
```

---

## shadcn/ui Components Used

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add progress
```

---

## Usage Examples

### Home Page
```tsx
<MainHeader />
```

### Position Overview Page
```tsx
<MainHeader />
```

### Question View Page
```tsx
<ContextHeader
  onBack={() => navigate('/position/angular')}
  currentIndex={15}
  totalCount={70}
/>

<ChapterBanner
  chapterTitle="Angular Core & Fundamentals"
  chapterNumber={1}
/>
```

### Interview Mode
```tsx
<ContextHeader
  onBack={() => navigate('/position/angular')}
  currentIndex={3}
  totalCount={28}
  badge="🎯 Режим интервью"
  onExit={handleExitInterview}
/>

<ProgressIndicator
  current={3}
  total={28}
  chapterFilter="Все главы"
/>

<ChapterBanner
  chapterTitle="RxJS & Reactive Programming"
  chapterNumber={2}
/>
```

---

**Файлы маршрутов**:
- `/Users/sunshad0w/Work/interviewer/ui-previews/components/navigation.md`
