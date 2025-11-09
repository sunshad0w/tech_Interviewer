# Home Screen - Главный экран выбора должности

**Назначение**: Отображение всех доступных должностей в виде карточек с базовой статистикой
**Маршрут**: `/`

---

## ASCII Wireframe

### Desktop Layout (3 columns)
```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ☰ Interview Preparation App                          [🌙 Theme]  [Profile] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────── Подготовка к техническим интервью ──────┐                          │
│  │  Выберите должность для начала подготовки     │                          │
│  └────────────────────────────────────────────────┘                          │
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │ Angular Senior   │  │ React Senior     │  │ Vue.js Middle    │          │
│  │ Developer        │  │ Developer        │  │ Developer        │          │
│  │                  │  │                  │  │                  │          │
│  │ 🎯 Senior        │  │ 🎯 Senior        │  │ 🎯 Middle        │          │
│  │ 📚 70 вопросов   │  │ 📚 65 вопросов   │  │ 📚 50 вопросов   │          │
│  │ 📖 8 глав        │  │ 📖 7 глав        │  │ 📖 6 глав        │          │
│  │                  │  │                  │  │                  │          │
│  │ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │          │
│  │ │ 📊 Балл: 3.2 │ │  │ │ 📊 Балл: 4.1 │ │  │ │ 📊 не начато │ │          │
│  │ └──────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │          │
│  │                  │  │                  │  │                  │          │
│  │ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │          │
│  │ │ ✅ 42/70 60% │ │  │ │ ✅ 58/65 89% │ │  │ │ ✅  0/50  0% │ │          │
│  │ └──────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │          │
│  │                  │  │                  │  │                  │          │
│  │ [ Продолжить ]   │  │ [ Продолжить ]   │  │ [  Начать   ]   │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │ TypeScript       │  │ Node.js Senior   │  │ Next.js Full     │          │
│  │ Advanced         │  │ Backend Dev      │  │ Stack Developer  │          │
│  │                  │  │                  │  │                  │          │
│  │ 🎯 Advanced      │  │ 🎯 Senior        │  │ 🎯 Full Stack    │          │
│  │ 📚 45 вопросов   │  │ 📚 80 вопросов   │  │ 📚 55 вопросов   │          │
│  │ 📖 5 глав        │  │ 📖 9 глав        │  │ 📖 7 глав        │          │
│  │                  │  │                  │  │                  │          │
│  │ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │          │
│  │ │ 📊 Балл: 2.8 │ │  │ │ 📊 Балл: 1.5 │ │  │ │ 📊 не начато │ │          │
│  │ └──────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │          │
│  │                  │  │                  │  │                  │          │
│  │ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │          │
│  │ │ ✅ 20/45 44% │ │  │ │ ✅ 12/80 15% │ │  │ │ ✅  0/55  0% │ │          │
│  │ └──────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │          │
│  │                  │  │                  │  │                  │          │
│  │ [ Продолжить ]   │  │ [ Продолжить ]   │  │ [  Начать   ]   │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Tablet Layout (2 columns)
```
┌────────────────────────────────────────────────┐
│  ☰  Interview Preparation      [🌙]  [Profile] │
├────────────────────────────────────────────────┤
│                                                │
│  Подготовка к техническим интервью             │
│  Выберите должность для начала                 │
│                                                │
│  ┌──────────────┐    ┌──────────────┐         │
│  │ Angular      │    │ React Senior │         │
│  │ Senior Dev   │    │ Developer    │         │
│  │              │    │              │         │
│  │ 🎯 Senior    │    │ 🎯 Senior    │         │
│  │ 📚 70 вопр.  │    │ 📚 65 вопр.  │         │
│  │ 📖 8 глав    │    │ 📖 7 глав    │         │
│  │              │    │              │         │
│  │ 📊 Балл: 3.2 │    │ 📊 Балл: 4.1 │         │
│  │ ✅ 42/70 60% │    │ ✅ 58/65 89% │         │
│  │              │    │              │         │
│  │[Продолжить]  │    │[Продолжить]  │         │
│  └──────────────┘    └──────────────┘         │
│                                                │
│  ┌──────────────┐    ┌──────────────┐         │
│  │ Vue.js       │    │ TypeScript   │         │
│  │ Middle Dev   │    │ Advanced     │         │
│  │ ...          │    │ ...          │         │
└────────────────────────────────────────────────┘
```

### Mobile Layout (1 column)
```
┌────────────────────────┐
│ ☰  Interview  [🌙] [@] │
├────────────────────────┤
│                        │
│ Подготовка к интервью  │
│                        │
│ ┌────────────────────┐ │
│ │ Angular Senior Dev │ │
│ │                    │ │
│ │ 🎯 Senior          │ │
│ │ 📚 70 вопросов     │ │
│ │ 📖 8 глав          │ │
│ │                    │ │
│ │ 📊 Балл: 3.2/5     │ │
│ │ ✅ Прогресс: 60%   │ │
│ │ (42/70 вопросов)   │ │
│ │                    │ │
│ │  [ Продолжить ]    │ │
│ └────────────────────┘ │
│                        │
│ ┌────────────────────┐ │
│ │ React Senior Dev   │ │
│ │                    │ │
│ │ 🎯 Senior          │ │
│ │ 📚 65 вопросов     │ │
│ │ 📖 7 глав          │ │
│ │                    │ │
│ │ 📊 Балл: 4.1/5     │ │
│ │ ✅ Прогресс: 89%   │ │
│ │ (58/65 вопросов)   │ │
│ │                    │ │
│ │  [ Продолжить ]    │ │
│ └────────────────────┘ │
│                        │
└────────────────────────┘
```

---

## Детальное описание компонентов

### 1. Header
**Компоненты**: Logo, Theme Toggle, User Profile (опционально)

```tsx
<header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="container flex h-16 items-center justify-between px-4">
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu size={24} />
      </Button>
      <h1 className="text-xl font-bold">Interview Preparation</h1>
    </div>

    <div className="flex items-center gap-2">
      <ThemeToggle />
      <Button variant="ghost" size="icon">
        <User size={20} />
      </Button>
    </div>
  </div>
</header>
```

**Tailwind классы**:
- Container: `sticky top-0 z-20 border-b bg-background`
- Высота: `h-16`
- Padding: `px-4`
- Backdrop blur: `backdrop-blur supports-[backdrop-filter]:bg-background/60`

---

### 2. Hero Section
**Компоненты**: Title, Subtitle

```tsx
<section className="container mx-auto px-4 py-8 md:py-12">
  <div className="text-center space-y-2">
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
      Подготовка к техническим интервью
    </h1>
    <p className="text-muted-foreground text-lg">
      Выберите должность для начала подготовки
    </p>
  </div>
</section>
```

**Tailwind классы**:
- Container: `container mx-auto px-4 py-8 md:py-12`
- Title: `text-3xl md:text-4xl font-bold tracking-tight`
- Subtitle: `text-muted-foreground text-lg`

---

### 3. Position Card (основной компонент)

**Структура карточки**:
1. Header: Название должности + Badge сложности
2. Metadata: Иконки + количество вопросов/глав
3. Statistics: Средний балл
4. Progress: Прогресс-бар + текст
5. Action Button: Кнопка действия

```tsx
<Card className="
  group
  hover:shadow-lg
  hover:border-primary
  transition-all
  duration-300
  cursor-pointer
  h-full
  flex flex-col
">
  <CardHeader className="pb-4">
    <CardTitle className="text-xl font-bold flex items-start justify-between gap-2">
      <span className="line-clamp-2">Angular Senior Developer</span>
      <Badge variant="secondary" className="shrink-0">
        Senior
      </Badge>
    </CardTitle>
  </CardHeader>

  <CardContent className="flex-1 flex flex-col space-y-4">
    {/* Metadata */}
    <div className="space-y-2 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <BookOpen size={16} />
        <span>70 вопросов</span>
      </div>
      <div className="flex items-center gap-2">
        <Layers size={16} />
        <span>8 глав</span>
      </div>
    </div>

    {/* Score */}
    <div className="p-3 bg-muted rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Средний балл</span>
        <div className="flex items-center gap-1.5">
          <Award size={16} className="text-primary" />
          <span className="text-lg font-bold">3.2</span>
          <span className="text-sm text-muted-foreground">/5</span>
        </div>
      </div>
    </div>

    {/* Progress */}
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Прогресс</span>
        <span className="font-medium">42/70 (60%)</span>
      </div>
      <Progress value={60} className="h-2" />
    </div>

    {/* Action Button */}
    <Button className="w-full mt-auto">
      Продолжить
    </Button>
  </CardContent>
</Card>
```

---

## Tailwind CSS Implementation

### Grid Container
```tsx
<div className="
  container
  mx-auto
  px-4 md:px-6
  py-8
">
  <div className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    gap-6
  ">
    {positions.map(position => <PositionCard key={position.id} {...position} />)}
  </div>
</div>
```

### Card Hover Effects
```css
/* В компоненте Card */
className="
  group
  hover:shadow-lg
  hover:border-primary
  hover:-translate-y-1
  transition-all
  duration-300
  cursor-pointer
"
```

---

## Интерактивные состояния

### 1. Пустое состояние (нет должностей)
```tsx
{positions.length === 0 && (
  <div className="flex flex-col items-center justify-center py-16 space-y-4">
    <BookOpen size={64} className="text-muted-foreground" />
    <h3 className="text-xl font-semibold">Нет доступных должностей</h3>
    <p className="text-muted-foreground text-center max-w-md">
      Загрузите JSON файлы с вопросами в директорию jsons/
    </p>
  </div>
)}
```

### 2. Loading состояние
```tsx
{isLoading && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map(i => (
      <Card key={i} className="h-[320px]">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    ))}
  </div>
)}
```

### 3. Состояние карточки в зависимости от прогресса

**Не начато (0%):**
```tsx
<Badge variant="outline" className="border-muted-foreground/50">
  Не начато
</Badge>
<Button variant="default">Начать</Button>
```

**В процессе (1-99%):**
```tsx
<Badge variant="secondary" className="bg-primary/10 text-primary">
  В процессе
</Badge>
<Button variant="default">Продолжить</Button>
```

**Завершено (100%):**
```tsx
<Badge variant="default" className="bg-success text-white">
  Завершено
</Badge>
<Button variant="outline">Просмотреть</Button>
```

---

## Адаптивность

### Mobile (< 640px)
- **Grid**: 1 колонка
- **Padding**: `px-4 py-6`
- **Card height**: auto (flex)
- **Typography**: `text-xl` для заголовков карточек
- **Header**: Показать только иконку меню и theme toggle

### Tablet (640px - 1024px)
- **Grid**: 2 колонки
- **Padding**: `px-6 py-8`
- **Gap**: `gap-6`
- **Typography**: `text-xl` для заголовков карточек

### Desktop (>= 1024px)
- **Grid**: 3 колонки
- **Padding**: `px-6 py-8`
- **Max width**: `max-w-7xl mx-auto`
- **Gap**: `gap-6`
- **Typography**: `text-2xl` для заголовков карточек

---

## Dark Mode

### Light Mode Colors
```tsx
<Card className="bg-card text-card-foreground border-border">
  <div className="bg-muted">  {/* Score background */}
  <Progress className="bg-secondary" />  {/* Progress background */}
```

### Dark Mode Colors
```tsx
<Card className="dark:bg-card dark:text-card-foreground dark:border-border">
  <div className="dark:bg-muted">  {/* Score background */}
  <Progress className="dark:bg-secondary" />  {/* Progress background */}
```

**Автоматически применяется через Tailwind dark mode** (class strategy)

---

## Accessibility

### Keyboard Navigation
- `Tab` - переход между карточками
- `Enter` / `Space` - открыть выбранную карточку
- `Arrow Keys` - навигация по grid (опционально)

### ARIA Labels
```tsx
<Card
  role="button"
  tabIndex={0}
  aria-label={`${position.name}, ${position.difficulty}, ${answeredCount} из ${totalQuestions} вопросов отвечено`}
  onClick={() => navigate(`/position/${position.id}`)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      navigate(`/position/${position.id}`);
    }
  }}
>
```

### Screen Reader Support
```tsx
<Progress
  value={progressPercent}
  aria-label={`Прогресс: ${progressPercent}%`}
  aria-valuenow={progressPercent}
  aria-valuemin={0}
  aria-valuemax={100}
/>
```

---

## Анимации

### Card Entrance Animation
```tsx
// Используем staggered animation для карточек
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.05 }}
>
  <PositionCard {...position} />
</motion.div>
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
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add skeleton
```

---

## Пример полной реализации

```tsx
// src/pages/HomePage.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Layers, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePositions } from '@/hooks/usePositions';
import { useStatistics } from '@/hooks/useStatistics';

export function HomePage() {
  const navigate = useNavigate();
  const { positions, isLoading } = usePositions();

  if (isLoading) {
    return <LoadingState />;
  }

  if (positions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-2 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Подготовка к техническим интервью
        </h1>
        <p className="text-muted-foreground text-lg">
          Выберите должность для начала подготовки
        </p>
      </div>

      {/* Positions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {positions.map((position) => (
          <PositionCard
            key={position.id}
            position={position}
            onClick={() => navigate(`/position/${position.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

function PositionCard({ position, onClick }) {
  const { getPositionStats } = useStatistics();
  const stats = getPositionStats(position.id);

  const progressPercent = stats.totalQuestions > 0
    ? Math.round((stats.answeredCount / stats.totalQuestions) * 100)
    : 0;

  const buttonText = progressPercent === 0 ? 'Начать' :
                     progressPercent === 100 ? 'Просмотреть' :
                     'Продолжить';

  return (
    <Card
      className="group hover:shadow-lg hover:border-primary hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-start justify-between gap-2">
          <span className="line-clamp-2">{position.guide_name}</span>
          <Badge variant="secondary" className="shrink-0">
            {position.metadata.difficulty_level}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Metadata */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen size={16} />
            <span>{position.metadata.total_questions} вопросов</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers size={16} />
            <span>{position.metadata.total_chapters} глав</span>
          </div>
        </div>

        {/* Score */}
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Средний балл</span>
            {stats.overallScore > 0 ? (
              <div className="flex items-center gap-1.5">
                <Award size={16} className="text-primary" />
                <span className="text-lg font-bold">{stats.overallScore.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">/5</span>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">не начато</span>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Прогресс</span>
            <span className="font-medium">
              {stats.answeredCount}/{stats.totalQuestions} ({progressPercent}%)
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Action Button */}
        <Button className="w-full mt-auto">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

**Файлы маршрутов**:
- `/Users/sunshad0w/Work/interviewer/ui-previews/screens/home-screen.md`
