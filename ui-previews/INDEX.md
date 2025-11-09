# UI Design Documentation Index

**Проект**: Interview Preparation App
**Дата создания**: 2025-11-08
**Технологический стек**: React + TypeScript + Vite + shadcn/ui + Tailwind CSS

---

## Содержание

### 📐 Design System
- [design-system.md](./design-system.md) - Полная дизайн-система (цвета, типографика, spacing, компоненты)

### 📱 Screens (Экраны)
1. [home-screen.md](./screens/home-screen.md) - Главный экран с карточками должностей
2. [position-overview.md](./screens/position-overview.md) - Обзор должности с метаданными и оглавлением
3. [question-view.md](./screens/question-view.md) - Экран отображения вопроса с ответом и оценкой
4. [interview-mode.md](./screens/interview-mode.md) - Режим интервью с автопереходом

### 🧩 Components (Компоненты)
1. [position-card.md](./components/position-card.md) - Карточка должности
2. [rating-slider.md](./components/rating-slider.md) - Slider для оценки ответа (0-5)
3. [chapter-accordion.md](./components/chapter-accordion.md) - Раскрываемый список глав
4. [navigation.md](./components/navigation.md) - Навигационные элементы (Header, Theme Toggle, Breadcrumbs)

### 📐 Layouts (Макеты)
1. [responsive-layouts.md](./layouts/responsive-layouts.md) - Адаптивные макеты для всех breakpoints

---

## Краткий обзор проекта

### Основные экраны

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. HOME SCREEN                                     │
│     ├─ Grid карточек должностей                     │
│     ├─ Каждая карточка: название, метаданные,      │
│     │  балл, прогресс                               │
│     └─ Кнопка "Начать/Продолжить"                   │
│                                                     │
│  2. POSITION OVERVIEW                               │
│     ├─ Метаданные должности                         │
│     ├─ Общая статистика                             │
│     ├─ Оглавление (accordion с главами)             │
│     │  └─ Каждая глава: список вопросов с баллами  │
│     └─ Кнопка "Приступить к интервью"               │
│                                                     │
│  3. QUESTION VIEW                                   │
│     ├─ Заголовок вопроса                            │
│     ├─ Кнопка "Показать ответ"                      │
│     ├─ Ответ (markdown + syntax highlighting)      │
│     ├─ Best practices                               │
│     └─ Slider оценки (0-5)                          │
│                                                     │
│  4. INTERVIEW MODE                                  │
│     ├─ Настройки (фильтр глав, режим выбора)       │
│     ├─ Progress bar                                 │
│     ├─ Автоматический выбор вопросов                │
│     ├─ Автопереход после оценки                     │
│     └─ Экран результатов                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Ключевые компоненты

### 1. Position Card
**Файл**: [components/position-card.md](./components/position-card.md)

**Особенности**:
- Grid layout (1/2/3 columns в зависимости от breakpoint)
- Hover эффекты (shadow, border, translate)
- Progress bar с процентами
- Badge для уровня сложности
- Адаптивный текст

**shadcn/ui компоненты**: Card, Badge, Button, Progress

---

### 2. Rating Slider
**Файл**: [components/rating-slider.md](./components/rating-slider.md)

**Особенности**:
- Range slider 0-5
- Визуальные индикаторы (кружки с номерами)
- Описание каждой оценки
- Подсветка текущего выбора
- Keyboard navigation (стрелки)
- Touch-friendly на мобильных

**shadcn/ui компоненты**: Slider, Card, Button

---

### 3. Chapter Accordion
**Файл**: [components/chapter-accordion.md](./components/chapter-accordion.md)

**Особенности**:
- Раскрываемые главы
- Статистика по главе (балл, прогресс)
- Список вопросов с индивидуальными баллами
- Score stars (визуализация 0-5)
- Smooth expand/collapse анимация

**shadcn/ui компоненты**: Accordion, Badge, Progress

---

### 4. Navigation Components
**Файл**: [components/navigation.md](./components/navigation.md)

**Особенности**:
- Sticky header с backdrop blur
- Theme toggle (Light/Dark/System)
- Breadcrumbs навигация
- Context header (для вопросов)
- Progress indicator (для интервью)

**shadcn/ui компоненты**: Button, Badge, Progress, DropdownMenu

---

## Design System Highlights

### Цветовая схема
```
Primary: Blue (#3B82F6)
Success: Green (#16A34A)
Warning: Orange (#F59E0B)
Destructive: Red (#EF4444)
```

### Типографика
```
Font: Inter (sans-serif)
Mono: JetBrains Mono (code blocks)

Sizes:
- Headings: text-2xl → text-4xl
- Body: text-base
- Small: text-sm / text-xs
```

### Spacing
```
Mobile: p-4, gap-4
Tablet: p-6, gap-6
Desktop: p-8, gap-8
```

### Breakpoints
```
sm:  640px  (Mobile landscape)
md:  768px  (Tablet)
lg:  1024px (Desktop)
xl:  1280px (Large desktop)
2xl: 1536px (XL desktop)
```

---

## Адаптивность

### Mobile First Strategy
1. Пишем стили для мобильных
2. Добавляем `md:` для планшетов
3. Добавляем `lg:` для десктопа

### Примеры

#### Grid
```tsx
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

#### Typography
```tsx
// Mobile: text-xl
// Desktop: text-2xl
<h1 className="text-xl md:text-2xl font-bold">
```

#### Layout
```tsx
// Mobile: vertical stack
// Desktop: sidebar + content
<div className="flex flex-col lg:grid lg:grid-cols-12">
  <aside className="lg:col-span-4">Sidebar</aside>
  <main className="lg:col-span-8">Content</main>
</div>
```

---

## Dark Mode

### Стратегия
- Class-based dark mode (`dark:` prefix)
- System preference по умолчанию
- Toggle в header для переключения

### Автоматическая адаптация
Большинство компонентов автоматически адаптируются благодаря CSS переменным:

```css
/* Light mode */
--background: hsl(0 0% 100%);
--foreground: hsl(222.2 84% 4.9%);

/* Dark mode */
.dark {
  --background: hsl(222.2 84% 4.9%);
  --foreground: hsl(210 40% 98%);
}
```

### Code Blocks
- Light: `vs` theme (react-syntax-highlighter)
- Dark: `vscDarkPlus` theme

---

## Интерактивность

### Hover States
```css
hover:shadow-lg
hover:border-primary
hover:-translate-y-1
transition-all duration-300
```

### Focus States
```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

### Active States
```css
active:scale-[0.98]
active:shadow-sm
```

### Disabled States
```css
disabled:opacity-50
disabled:cursor-not-allowed
```

---

## Анимации

### Transitions
```css
transition-all duration-200    // Quick
transition-all duration-300    // Standard
transition-all duration-500    // Slow
```

### Keyframe Animations
- `fadeIn` - плавное появление
- `slideUp` - появление снизу
- `slideDown` - раскрытие accordion
- `pulse` - пульсация (для badges)

### Framer Motion
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

---

## Accessibility

### Keyboard Navigation
- `Tab` / `Shift+Tab` - навигация между элементами
- `Enter` / `Space` - активация кнопок
- `Escape` - закрытие модальных окон
- `Arrow Keys` - навигация в слайдерах и списках

### ARIA Attributes
```tsx
aria-label="Описание элемента"
aria-labelledby="id"
aria-describedby="id"
role="button"
aria-pressed={isActive}
```

### Screen Reader Support
- Семантические HTML элементы
- ARIA live regions для динамического контента
- Skip links для навигации
- Описательные labels

---

## shadcn/ui Components Checklist

### Установленные компоненты
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add alert-dialog
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add label
```

---

## Markdown Rendering

### react-markdown Configuration
```tsx
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

<ReactMarkdown
  components={{
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={isDarkMode ? vscDarkPlus : vs}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
          {children}
        </code>
      );
    },
  }}
>
  {markdown}
</ReactMarkdown>
```

---

## Performance

### Optimizations
1. **Lazy Loading** - динамические импорты для тяжелых компонентов
2. **Memoization** - React.memo для частых re-renders
3. **Virtualization** - для длинных списков (react-window)
4. **Image optimization** - lazy loading, srcSet
5. **Code splitting** - по маршрутам

### Bundle Size
```bash
# Оптимизация
- Tree shaking (Vite автоматически)
- Dynamic imports для роутов
- Selective imports (lucide-react/dist/esm/icons/...)
```

---

## Testing Strategy

### Unit Tests
```tsx
import { render, fireEvent } from '@testing-library/react';

test('position card shows correct data', () => {
  const { getByText } = render(<PositionCard {...mockData} />);
  expect(getByText('Angular Senior Developer')).toBeInTheDocument();
});
```

### Integration Tests
```tsx
test('question view shows answer after clicking button', async () => {
  const { getByText, getByRole } = render(<QuestionView />);

  const showButton = getByRole('button', { name: /показать ответ/i });
  fireEvent.click(showButton);

  expect(await getByText(/dependency injection/i)).toBeInTheDocument();
});
```

### E2E Tests (Playwright)
```typescript
test('interview mode workflow', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Angular Senior Developer');
  await page.click('text=Приступить к интервью');
  await page.click('text=Показать ответ');
  await page.click('[aria-label="Выбрать оценку 4"]');
  await page.click('text=Сохранить оценку');
  // Verify next question loaded
});
```

---

## Deployment Checklist

### Before Deploy
- [ ] Проверить responsive на всех breakpoints
- [ ] Протестировать dark mode
- [ ] Проверить accessibility (keyboard, screen readers)
- [ ] Оптимизировать изображения
- [ ] Проверить performance (Lighthouse)
- [ ] Убедиться, что markdown рендерится корректно
- [ ] Протестировать на разных браузерах
- [ ] Проверить localStorage работу

### Build
```bash
npm run build
npm run preview
```

### Environment Variables
```bash
VITE_APP_TITLE=Interview Preparation
VITE_DATA_PATH=/jsons
```

---

## Структура файлов ui-previews/

```
ui-previews/
├── INDEX.md (этот файл)
├── design-system.md
├── screens/
│   ├── home-screen.md
│   ├── position-overview.md
│   ├── question-view.md
│   └── interview-mode.md
├── components/
│   ├── position-card.md
│   ├── rating-slider.md
│   ├── chapter-accordion.md
│   └── navigation.md
└── layouts/
    └── responsive-layouts.md
```

---

## Следующие шаги (Implementation)

### Phase 1: Setup
1. Инициализировать Vite + React + TypeScript
2. Установить Tailwind CSS
3. Установить shadcn/ui
4. Настроить dark mode

### Phase 2: Design System
1. Создать CSS variables (colors, spacing)
2. Настроить typography
3. Добавить компоненты shadcn/ui

### Phase 3: Components
1. Реализовать PositionCard
2. Реализовать RatingSlider
3. Реализовать ChapterAccordion
4. Реализовать Navigation components

### Phase 4: Screens
1. Создать Home Screen
2. Создать Position Overview Screen
3. Создать Question View Screen
4. Создать Interview Mode

### Phase 5: Features
1. Реализовать localStorage statistics
2. Реализовать markdown rendering
3. Реализовать question selection algorithm
4. Реализовать routing

### Phase 6: Polish
1. Добавить анимации
2. Оптимизировать performance
3. Тестирование
4. Accessibility audit

---

## Полезные ссылки

### Documentation
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [Lucide Icons](https://lucide.dev/)

### Tools
- [Tailwind CSS Playground](https://play.tailwindcss.com/)
- [Color Palette Generator](https://tailwindcss.com/docs/customizing-colors)
- [Responsive Design Checker](https://responsivedesignchecker.com/)

---

## Контакты и поддержка

**Создано**: 2025-11-08
**Версия**: 1.0
**Для проекта**: Interview Preparation App

---

**Примечание**: Все wireframes в этой документации являются ASCII-представлениями. Для полноценных макетов рекомендуется использовать Figma или аналогичные инструменты.
