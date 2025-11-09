# UI Design Summary - Interview Preparation App

**Дата**: 2025-11-08
**Статус**: Готов к разработке ✅

---

## Краткое резюме

Создана полная UI дизайн-документация для веб-приложения подготовки к техническим интервью с использованием React + TypeScript + Vite + shadcn/ui + Tailwind CSS.

### Что создано:

✅ **Design System** - полная дизайн-система
✅ **4 Screen Designs** - детальные wireframes всех экранов
✅ **5 Component Designs** - ключевые компоненты с вариантами
✅ **Responsive Layouts** - адаптивность для всех breakpoints
✅ **Dark Mode** - полная поддержка темной темы
✅ **Accessibility** - ARIA labels, keyboard navigation
✅ **Animations** - transitions и keyframe анимации

---

## Структура файлов

```
ui-previews/
├── INDEX.md                      # Общий индекс
├── SUMMARY.md                    # Этот файл
├── design-system.md              # Дизайн-система
│
├── screens/
│   ├── home-screen.md            # Главная с карточками
│   ├── position-overview.md      # Обзор должности
│   ├── question-view.md          # Экран вопроса
│   └── interview-mode.md         # Режим интервью
│
├── components/
│   ├── position-card.md          # Карточка должности
│   ├── rating-slider.md          # Slider оценки (0-5)
│   ├── chapter-accordion.md      # Аккордеон глав
│   ├── navigation.md             # Header, breadcrumbs, etc.
│   ├── metadata-section.md       # Метаданные должности
│   └── theme-toggle.md           # Переключатель темы
│
└── layouts/
    └── responsive-layouts.md     # Адаптивные макеты
```

---

## Ключевые экраны

### 1. Home Screen (Главная)
**Файл**: [screens/home-screen.md](./screens/home-screen.md)

**Layout**: Grid карточек (1/2/3 columns)

**Ключевые элементы**:
- Position Card с метаданными
- Badge уровня сложности
- Progress bar
- Score indicator
- Hover effects

**Responsive**:
- Mobile: 1 column, compact cards
- Tablet: 2 columns
- Desktop: 3 columns

---

### 2. Position Overview (Обзор должности)
**Файл**: [screens/position-overview.md](./screens/position-overview.md)

**Layout**: Sidebar (desktop) / Vertical (mobile)

**Ключевые элементы**:
- Metadata sidebar (sticky на desktop)
- Table of Contents (accordion)
- Chapter statistics
- Question list with scores
- Action buttons (Start Interview, Reset)

**Responsive**:
- Mobile: vertical stack, collapsible metadata
- Desktop: 2-column layout, sticky sidebar

---

### 3. Question View (Экран вопроса)
**Файл**: [screens/question-view.md](./screens/question-view.md)

**Layout**: Centered content (max-w-4xl)

**Ключевые элементы**:
- Context header (back, progress)
- Chapter banner
- Question card
- Show/Hide answer button
- Markdown rendering (с syntax highlighting)
- Best practices section
- Rating slider (0-5)

**Responsive**:
- Mobile: sticky footer for rating
- Desktop: все в одной колонке

---

### 4. Interview Mode (Режим интервью)
**Файл**: [screens/interview-mode.md](./screens/interview-mode.md)

**Phases**: Setup → Questions → Results

**Ключевые элементы**:
- Setup screen (filters, mode selection)
- Progress indicator
- Auto-transition между вопросами
- Results screen (stats, recommendations)

**Особенности**:
- Weighted question selection
- Chapter filtering
- Session statistics

---

## Ключевые компоненты

### 1. Position Card
**Файл**: [components/position-card.md](./components/position-card.md)

```tsx
<PositionCard
  position={position}
  statistics={stats}
  onClick={() => navigate(`/position/${id}`)}
/>
```

**Features**:
- Hover effects (shadow, translate, border)
- Progress visualization
- Adaptive sizing
- Keyboard accessible

---

### 2. Rating Slider
**Файл**: [components/rating-slider.md](./components/rating-slider.md)

```tsx
<RatingSlider
  value={rating}
  onChange={setRating}
  onSubmit={handleSubmit}
  isInterviewMode={true}
/>
```

**Features**:
- Range slider 0-5
- Visual score indicators (circles)
- Description tooltips
- Keyboard navigation
- Touch-friendly

**Критично важный компонент!**

---

### 3. Chapter Accordion
**Файл**: [components/chapter-accordion.md](./components/chapter-accordion.md)

```tsx
<Accordion type="multiple">
  {chapters.map(chapter => (
    <ChapterAccordion
      chapter={chapter}
      chapterStats={stats}
      onQuestionClick={handleClick}
    />
  ))}
</Accordion>
```

**Features**:
- Expandable chapters
- Chapter statistics
- Question list with scores
- Smooth animations

---

### 4. Navigation
**Файл**: [components/navigation.md](./components/navigation.md)

**Includes**:
- Main Header (sticky, backdrop blur)
- Theme Toggle (Light/Dark/System)
- Breadcrumbs
- Context Header (для вопросов)
- Progress Indicator (для интервью)

---

### 5. Metadata Section
**Файл**: [components/metadata-section.md](./components/metadata-section.md)

```tsx
<MetadataSection
  metadata={position.metadata}
  statistics={stats}
  className="sticky top-20"
/>
```

**Features**:
- Target audience
- Covered versions (badges)
- Difficulty level
- Overall statistics
- Collapsible description

---

### 6. Theme Toggle
**Файл**: [components/theme-toggle.md](./components/theme-toggle.md)

```tsx
<ThemeToggle />
```

**Features**:
- Light/Dark/System modes
- Smooth icon transitions
- Dropdown with options
- localStorage persistence

---

## Design System Highlights

### Цвета
```
Primary:     #3B82F6 (Blue)
Success:     #16A34A (Green)
Warning:     #F59E0B (Orange)
Destructive: #EF4444 (Red)

Score Colors:
0:   Gray    (нет знаний)
1-2: Orange  (частично)
3-4: Blue    (хорошо)
5:   Green   (отлично)
```

### Типографика
```
Font: Inter (sans-serif)
Mono: JetBrains Mono (code)

Headings: 1.5rem - 2.25rem (24px - 36px)
Body:     1rem (16px)
Small:    0.875rem (14px)
```

### Spacing
```
Mobile:  p-4, gap-4 (16px)
Tablet:  p-6, gap-6 (24px)
Desktop: p-8, gap-8 (32px)
```

### Breakpoints
```
sm:  640px  (Mobile landscape)
md:  768px  (Tablet)
lg:  1024px (Desktop)
xl:  1280px (Large desktop)
```

### Border Radius
```
Cards:   rounded-lg  (8px)
Buttons: rounded-md  (6px)
Badges:  rounded-full
```

---

## Responsive Strategy

### Mobile First Approach
```tsx
// Base (Mobile)
<div className="p-4 text-lg">

// Tablet
<div className="md:p-6 md:text-xl">

// Desktop
<div className="lg:p-8 lg:text-2xl">
```

### Grid Patterns
```tsx
// Position Cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Sidebar Layout
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  <aside className="lg:col-span-4">Sidebar</aside>
  <main className="lg:col-span-8">Content</main>
</div>
```

### Show/Hide Components
```tsx
// Mobile only
<div className="block md:hidden">
  <MobileComponent />
</div>

// Desktop only
<div className="hidden md:block">
  <DesktopComponent />
</div>
```

---

## Dark Mode Implementation

### Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Class-based strategy
};
```

### CSS Variables
```css
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(222.2 84% 4.9%);
}

.dark {
  --background: hsl(222.2 84% 4.9%);
  --foreground: hsl(210 40% 98%);
}
```

### Usage
```tsx
<div className="bg-background text-foreground">
  {/* Автоматически адаптируется */}
</div>

<div className="bg-muted dark:bg-muted/20">
  {/* Кастомные dark: классы */}
</div>
```

---

## Accessibility

### Keyboard Navigation
- `Tab` - переход между элементами
- `Enter`/`Space` - активация кнопок
- `Escape` - закрытие модалок
- `Arrow Keys` - навигация в слайдерах

### ARIA Labels
```tsx
<button
  aria-label="Показать ответ"
  role="button"
  tabIndex={0}
>

<Progress
  aria-label="Прогресс: 60%"
  aria-valuenow={60}
  aria-valuemin={0}
  aria-valuemax={100}
/>
```

### Focus States
```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

---

## Animations

### Transitions
```css
transition-all duration-200  /* Quick (hover) */
transition-all duration-300  /* Standard */
transition-all duration-500  /* Slow (progress) */
```

### Hover Effects
```tsx
<Card className="
  hover:shadow-lg
  hover:border-primary
  hover:-translate-y-1
  transition-all duration-300
">
```

### Keyframe Animations
```tsx
// Accordion expand/collapse
<AccordionContent className="
  data-[state=open]:animate-accordion-down
  data-[state=closed]:animate-accordion-up
">

// Pulse for badges
<Badge className="animate-pulse">
  🎯 Режим интервью
</Badge>
```

---

## shadcn/ui Components Needed

### Обязательные
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add slider      # Критично важный!
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add progress
```

### Дополнительные
```bash
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add alert-dialog
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add label
npx shadcn-ui@latest add switch
```

---

## Markdown Rendering

### Packages
```bash
npm install react-markdown react-syntax-highlighter
npm install -D @types/react-syntax-highlighter
```

### Configuration
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
          style={theme === 'dark' ? vscDarkPlus : vs}
          language={match[1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
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

## Implementation Checklist

### Phase 1: Setup ✅
- [ ] `npm create vite@latest . -- --template react-ts`
- [ ] Install Tailwind CSS
- [ ] Install shadcn/ui (`npx shadcn-ui@latest init`)
- [ ] Setup dark mode (ThemeProvider)
- [ ] Install markdown packages

### Phase 2: Design System ✅
- [ ] Configure Tailwind (colors, fonts, breakpoints)
- [ ] Add CSS variables to globals.css
- [ ] Install shadcn/ui components
- [ ] Create useTheme hook

### Phase 3: Core Components
- [ ] PositionCard
- [ ] RatingSlider (критично важный!)
- [ ] ChapterAccordion
- [ ] Navigation components
- [ ] MetadataSection
- [ ] ThemeToggle

### Phase 4: Screens
- [ ] Home Screen (grid of cards)
- [ ] Position Overview (sidebar layout)
- [ ] Question View (markdown rendering)
- [ ] Interview Mode (setup + results)

### Phase 5: Features
- [ ] localStorage statistics
- [ ] Question selection algorithm
- [ ] Routing (React Router)
- [ ] Markdown rendering with syntax highlighting

### Phase 6: Polish
- [ ] Animations and transitions
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Responsive testing
- [ ] Dark mode testing

---

## Performance Tips

### Bundle Size
- Dynamic imports для роутов
- Tree shaking (автоматически в Vite)
- Selective icon imports: `lucide-react/dist/esm/icons/home`

### Runtime Performance
- React.memo для Position Cards
- useMemo для вычислений статистики
- Virtualization для длинных списков (>50 items)
- Lazy loading для markdown rendering

### Images
```tsx
<img
  loading="lazy"
  srcSet="image-400.jpg 400w, image-800.jpg 800w"
  sizes="(max-width: 640px) 400px, 800px"
/>
```

---

## Testing Strategy

### Unit Tests
```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

```tsx
test('position card shows correct data', () => {
  const { getByText } = render(<PositionCard {...mockData} />);
  expect(getByText('Angular Senior Developer')).toBeInTheDocument();
});
```

### E2E Tests
```bash
npm install -D @playwright/test
```

```typescript
test('complete interview flow', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Angular Senior Developer');
  await page.click('text=Начать интервью');
  // ... test interview flow
});
```

---

## Deployment

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Environment Variables
```
VITE_APP_TITLE=Interview Preparation
VITE_DATA_PATH=/jsons
```

---

## Browser Support

### Target Browsers
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari 14+
- Chrome Android (latest)

### Polyfills (if needed)
```bash
npm install -D vite-plugin-legacy
```

---

## Documentation Links

- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)

---

## Final Notes

### Критически важные компоненты:
1. **RatingSlider** - ключевой элемент UX
2. **ChapterAccordion** - навигация по вопросам
3. **Markdown rendering** - правильная подсветка кода

### Особенности:
- **Mobile First** подход
- **Dark mode** через CSS variables
- **Accessibility** - keyboard + ARIA
- **Performance** - memoization, lazy loading

### Готовность к разработке:
✅ **100%** - Все wireframes и спецификации готовы

---

**Дата создания**: 2025-11-08
**Версия**: 1.0
**Статус**: Готов к разработке

---

## Быстрый старт для разработчика

```bash
# 1. Инициализация проекта
npm create vite@latest . -- --template react-ts
npm install

# 2. Установка Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Установка shadcn/ui
npx shadcn-ui@latest init

# 4. Установка зависимостей
npm install react-router-dom
npm install react-markdown react-syntax-highlighter
npm install -D @types/react-syntax-highlighter
npm install lucide-react

# 5. Добавление shadcn/ui компонентов
npx shadcn-ui@latest add button card badge slider accordion progress dropdown-menu select dialog toast separator skeleton

# 6. Запуск dev сервера
npm run dev
```

**Далее**: Следуй Implementation Checklist выше для пошаговой разработки.

---

**Все файлы готовы к использованию!** 🎉
