# UI Design Documentation

**Interview Preparation Web Application**

---

## Обзор

Эта директория содержит полную UI/UX документацию для веб-приложения подготовки к техническим интервью.

**Технологический стек**:
- React + TypeScript + Vite
- shadcn/ui + Tailwind CSS
- Responsive Design (Mobile/Tablet/Desktop)
- Dark Mode Support

---

## Структура документации

### 📚 Начните здесь

1. **[INDEX.md](./INDEX.md)** - Общий индекс всех файлов
2. **[SUMMARY.md](./SUMMARY.md)** - Краткое резюме и чеклисты
3. **[design-system.md](./design-system.md)** - Дизайн-система (обязательно к прочтению!)

### 📱 Экраны

| Файл | Описание | Ключевые компоненты |
|------|----------|---------------------|
| [home-screen.md](./screens/home-screen.md) | Главный экран с карточками должностей | Position Card, Grid Layout |
| [position-overview.md](./screens/position-overview.md) | Обзор должности с метаданными и оглавлением | Metadata Section, Chapter Accordion |
| [question-view.md](./screens/question-view.md) | Экран отображения вопроса и ответа | Markdown Renderer, Rating Slider |
| [interview-mode.md](./screens/interview-mode.md) | Режим интервью с автопереходом | Progress Indicator, Results Screen |

### 🧩 Компоненты

| Файл | Описание | Сложность |
|------|----------|-----------|
| [position-card.md](./components/position-card.md) | Карточка должности | ⭐⭐ |
| [rating-slider.md](./components/rating-slider.md) | Slider оценки ответа (0-5) | ⭐⭐⭐ |
| [chapter-accordion.md](./components/chapter-accordion.md) | Раскрываемый список глав | ⭐⭐⭐ |
| [navigation.md](./components/navigation.md) | Header, Theme Toggle, Breadcrumbs | ⭐⭐ |
| [metadata-section.md](./components/metadata-section.md) | Секция метаданных | ⭐⭐ |
| [theme-toggle.md](./components/theme-toggle.md) | Переключатель Light/Dark темы | ⭐⭐ |

### 📐 Layouts

| Файл | Описание |
|------|----------|
| [responsive-layouts.md](./layouts/responsive-layouts.md) | Адаптивные макеты для всех breakpoints |

---

## Быстрый старт

### Для дизайнера

1. Прочитайте [design-system.md](./design-system.md) - основа всего дизайна
2. Изучите [home-screen.md](./screens/home-screen.md) - пример полного экрана
3. Посмотрите [rating-slider.md](./components/rating-slider.md) - самый сложный компонент

### Для разработчика

1. Прочитайте [SUMMARY.md](./SUMMARY.md) - краткое резюме
2. Следуйте **Implementation Checklist** в SUMMARY.md
3. Используйте [design-system.md](./design-system.md) как референс для цветов/spacing/typography

### Для менеджера проекта

1. Прочитайте [INDEX.md](./INDEX.md) - обзор всего проекта
2. Изучите [SUMMARY.md](./SUMMARY.md) - чеклисты и этапы разработки
3. Используйте структуру файлов для планирования спринтов

---

## Ключевые особенности дизайна

### ✨ Highlights

- **Mobile First** - все дизайны начинаются с мобильной версии
- **Dark Mode** - полная поддержка темной темы
- **Accessibility** - ARIA labels, keyboard navigation, screen readers
- **Performance** - memoization, lazy loading, virtualization
- **Animations** - плавные transitions и keyframe анимации

### 🎨 Design Principles

1. **Clarity** - чистый, незагроможденный интерфейс
2. **Consistency** - единообразие во всех экранах
3. **Feedback** - визуальная обратная связь на действия
4. **Responsive** - адаптация под все устройства
5. **Accessible** - доступность для всех пользователей

---

## Технические детали

### Цветовая схема

```
Primary:     #3B82F6 (Blue)
Success:     #16A34A (Green)
Warning:     #F59E0B (Orange)
Destructive: #EF4444 (Red)
```

### Breakpoints

```
sm:  640px  (Mobile landscape)
md:  768px  (Tablet)
lg:  1024px (Desktop)
xl:  1280px (Large desktop)
```

### Typography

```
Font Family: Inter (sans-serif)
Mono Font:   JetBrains Mono (code blocks)

Sizes:
- Headings: 1.5rem - 2.25rem
- Body:     1rem
- Small:    0.875rem
```

---

## Формат документации

### ASCII Wireframes

Каждый файл содержит ASCII wireframes для быстрой визуализации:

```
┌─────────────────────┐
│  Header             │
├─────────────────────┤
│  ┌───────────────┐  │
│  │  Card 1       │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │  Card 2       │  │
│  └───────────────┘  │
└─────────────────────┘
```

### Code Examples

Каждый компонент включает примеры кода на React + TypeScript:

```tsx
<PositionCard
  position={position}
  statistics={stats}
  onClick={() => navigate(`/position/${id}`)}
/>
```

### Tailwind Classes

Все стили описаны в Tailwind CSS классах:

```tsx
className="
  px-4 py-6
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-6
"
```

---

## shadcn/ui Components

### Обязательные компоненты

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add progress
```

Полный список см. в [SUMMARY.md](./SUMMARY.md)

---

## Responsive Design

### Стратегия

```tsx
// Mobile (default)
<div className="p-4 text-lg">

// Tablet
<div className="md:p-6 md:text-xl">

// Desktop
<div className="lg:p-8 lg:text-2xl">
```

### Grid Layouts

```tsx
// Position Cards Grid
<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-6
">
```

---

## Dark Mode

### Tailwind Config

```javascript
module.exports = {
  darkMode: 'class',
};
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
- `Enter` / `Space` - активация кнопок
- `Escape` - закрытие модальных окон
- `Arrow Keys` - навигация в списках

### ARIA Labels

```tsx
<button
  aria-label="Показать ответ"
  role="button"
>

<Progress
  aria-label="Прогресс: 60%"
  aria-valuenow={60}
/>
```

---

## Примеры использования

### Импорт компонентов

```tsx
import { PositionCard } from '@/components/PositionCard';
import { RatingSlider } from '@/components/RatingSlider';
import { ChapterAccordion } from '@/components/ChapterAccordion';
```

### Использование

```tsx
export function HomePage() {
  const { positions } = usePositions();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {positions.map((position) => (
        <PositionCard
          key={position.id}
          position={position}
          statistics={getStats(position.id)}
          onClick={() => navigate(`/position/${position.id}`)}
        />
      ))}
    </div>
  );
}
```

---

## Чеклист разработки

### Phase 1: Setup
- [ ] Vite + React + TypeScript
- [ ] Tailwind CSS
- [ ] shadcn/ui init
- [ ] Dark mode setup

### Phase 2: Design System
- [ ] CSS variables
- [ ] Tailwind config
- [ ] shadcn/ui components
- [ ] ThemeProvider

### Phase 3: Components
- [ ] PositionCard
- [ ] RatingSlider
- [ ] ChapterAccordion
- [ ] Navigation

### Phase 4: Screens
- [ ] Home Screen
- [ ] Position Overview
- [ ] Question View
- [ ] Interview Mode

### Phase 5: Features
- [ ] localStorage statistics
- [ ] Markdown rendering
- [ ] Routing
- [ ] Question selection

### Phase 6: Polish
- [ ] Animations
- [ ] Accessibility
- [ ] Performance
- [ ] Testing

Полный чеклист см. в [SUMMARY.md](./SUMMARY.md)

---

## Полезные ссылки

### Documentation
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [react-markdown Documentation](https://github.com/remarkjs/react-markdown)

### Tools
- [Tailwind CSS Playground](https://play.tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Color Palette Generator](https://tailwindcss.com/docs/customizing-colors)

---

## FAQ

### Q: Где найти полный список цветов?
**A**: См. [design-system.md](./design-system.md) секция "Цветовая палитра"

### Q: Как реализовать dark mode?
**A**: См. [theme-toggle.md](./components/theme-toggle.md) и [design-system.md](./design-system.md)

### Q: Какие компоненты shadcn/ui нужны?
**A**: Полный список в [SUMMARY.md](./SUMMARY.md) секция "shadcn/ui Components Needed"

### Q: Как сделать responsive layout?
**A**: См. [responsive-layouts.md](./layouts/responsive-layouts.md)

### Q: Где примеры кода?
**A**: Каждый .md файл содержит примеры кода на React + TypeScript

---

## Контрибьюция

### Структура файла

Каждый .md файл должен содержать:

1. **ASCII Wireframe** - визуальное представление
2. **Component Props** - TypeScript интерфейсы
3. **Implementation** - код компонента
4. **Variants** - альтернативные варианты
5. **States** - различные состояния (loading, error, etc.)
6. **Tailwind Classes** - breakdown используемых классов
7. **Responsive** - адаптивность
8. **Accessibility** - доступность
9. **Dark Mode** - поддержка темной темы
10. **Usage Examples** - примеры использования

---

## Changelog

### 2025-11-08 - v1.0
- ✅ Создана полная дизайн-документация
- ✅ 4 экрана с wireframes
- ✅ 6 компонентов с вариантами
- ✅ Responsive layouts
- ✅ Design system
- ✅ Accessibility guidelines

---

## Лицензия

Эта документация создана для проекта Interview Preparation App.

---

## Контакты

**Дата создания**: 2025-11-08
**Версия**: 1.0
**Статус**: ✅ Готов к разработке

---

**Начните с [INDEX.md](./INDEX.md) или [SUMMARY.md](./SUMMARY.md)!**
