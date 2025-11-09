# Responsive Layouts - Адаптивные макеты

**Назначение**: Описание адаптивности для всех breakpoints
**Технологии**: Tailwind CSS breakpoints

---

## Breakpoints Strategy

```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape / Small tablets
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops / Small desktops
  xl: '1280px',  // Desktops
  '2xl': '1536px' // Large desktops
};
```

### Mobile First Approach
Все стили пишутся сначала для мобильных устройств, затем добавляются breakpoints для больших экранов.

---

## Layout Patterns

### 1. Home Screen Layout

#### Mobile (<640px)
```
┌──────────────┐
│   Header     │
├──────────────┤
│              │
│   Title      │
│   Subtitle   │
│              │
│ ┌──────────┐ │
│ │  Card 1  │ │
│ └──────────┘ │
│              │
│ ┌──────────┐ │
│ │  Card 2  │ │
│ └──────────┘ │
│              │
│ ┌──────────┐ │
│ │  Card 3  │ │
│ └──────────┘ │
│              │
└──────────────┘
```

**CSS**:
```tsx
<div className="px-4 py-6">
  <div className="grid grid-cols-1 gap-4">
    {positions.map(pos => <PositionCard />)}
  </div>
</div>
```

#### Tablet (640px - 1024px)
```
┌────────────────────────────┐
│        Header              │
├────────────────────────────┤
│                            │
│        Title               │
│        Subtitle            │
│                            │
│  ┌──────────┐ ┌──────────┐│
│  │  Card 1  │ │  Card 2  ││
│  └──────────┘ └──────────┘│
│                            │
│  ┌──────────┐ ┌──────────┐│
│  │  Card 3  │ │  Card 4  ││
│  └──────────┘ └──────────┘│
│                            │
└────────────────────────────┘
```

**CSS**:
```tsx
<div className="px-6 py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {positions.map(pos => <PositionCard />)}
  </div>
</div>
```

#### Desktop (>=1024px)
```
┌─────────────────────────────────────────┐
│               Header                    │
├─────────────────────────────────────────┤
│                                         │
│              Title                      │
│              Subtitle                   │
│                                         │
│  ┌─────┐  ┌─────┐  ┌─────┐            │
│  │Card1│  │Card2│  │Card3│            │
│  └─────┘  └─────┘  └─────┘            │
│                                         │
│  ┌─────┐  ┌─────┐  ┌─────┐            │
│  │Card4│  │Card5│  │Card6│            │
│  └─────┘  └─────┘  └─────┘            │
│                                         │
└─────────────────────────────────────────┘
```

**CSS**:
```tsx
<div className="px-6 py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
    {positions.map(pos => <PositionCard />)}
  </div>
</div>
```

---

### 2. Position Overview Layout

#### Mobile (<768px)
```
┌────────────────┐
│    Header      │
├────────────────┤
│  Compact       │
│  Stats Card    │
├────────────────┤
│  [Metadata ▼]  │ ← Collapsible
├────────────────┤
│                │
│  Оглавление    │
│  ▶ Chapter 1   │
│  ▶ Chapter 2   │
│                │
├────────────────┤
│ [Start Button] │ ← Sticky footer
└────────────────┘
```

**CSS**:
```tsx
<div className="flex flex-col min-h-screen">
  <Header />

  <main className="flex-1 px-4 py-6 space-y-6">
    <CompactStatsCard />

    <Accordion>
      <AccordionItem value="metadata">
        <AccordionTrigger>Метаданные</AccordionTrigger>
        <AccordionContent>
          <MetadataContent />
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <TableOfContents />
  </main>

  <div className="sticky bottom-0 bg-background border-t p-4">
    <Button className="w-full">Начать интервью</Button>
  </div>
</div>
```

#### Tablet/Desktop (>=768px)
```
┌─────────────────────────────────────┐
│           Header                    │
├────────────┬────────────────────────┤
│            │                        │
│  Metadata  │  Table of Contents     │
│  Sidebar   │                        │
│            │  ▼ Chapter 1           │
│  Stats     │     Question 1.1       │
│  Progress  │     Question 1.2       │
│            │                        │
│  Actions   │  ▶ Chapter 2           │
│            │                        │
└────────────┴────────────────────────┘
```

**CSS**:
```tsx
<div className="container max-w-7xl mx-auto px-6 py-8">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    {/* Sidebar */}
    <aside className="lg:col-span-4">
      <MetadataCard className="sticky top-20" />
    </aside>

    {/* Main Content */}
    <main className="lg:col-span-8">
      <TableOfContents />
    </main>
  </div>
</div>
```

---

### 3. Question View Layout

#### Mobile (<768px)
```
┌────────────────┐
│  ← Back [🌙]   │
├────────────────┤
│  Chapter Info  │
├────────────────┤
│                │
│  Question      │
│  Card          │
│                │
├────────────────┤
│ [Show Answer]  │
├────────────────┤
│                │
│  Answer        │
│  (markdown)    │
│  ...scroll...  │
│                │
├────────────────┤
│  Rating        │
│  Slider        │
│                │
├────────────────┤
│ [Submit]       │ ← Sticky
└────────────────┘
```

**CSS**:
```tsx
<div className="min-h-screen flex flex-col">
  <ContextHeader />
  <ChapterBanner />

  <main className="flex-1 px-4 py-6 space-y-6 pb-24">
    <QuestionCard />
    {showAnswer && (
      <>
        <AnswerCard />
        <BestPracticesCard />
      </>
    )}
  </main>

  {showAnswer && (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
      <RatingSliderCompact />
    </div>
  )}
</div>
```

#### Desktop (>=768px)
```
┌─────────────────────────────────────────┐
│  ← Back    Question 15/70    [🌙] [✕]  │
├─────────────────────────────────────────┤
│  Chapter Info                           │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Question Card                  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Answer (markdown)              │   │
│  │  ...                            │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Best Practices                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Rating Slider                  │   │
│  │  [Submit]                       │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

**CSS**:
```tsx
<div className="min-h-screen flex flex-col">
  <ContextHeader />
  <ChapterBanner />

  <main className="flex-1 container max-w-4xl mx-auto px-6 py-8 space-y-6">
    <QuestionCard />
    {showAnswer && (
      <>
        <AnswerCard />
        <BestPracticesCard />
        <RatingSlider />
      </>
    )}
  </main>
</div>
```

---

## Container Patterns

### 1. Full Width Container
```tsx
<div className="w-full">
  {/* Content spans full width */}
</div>
```

### 2. Constrained Container
```tsx
<div className="container mx-auto px-4 md:px-6">
  {/* Content with responsive padding */}
</div>
```

### 3. Max Width Container
```tsx
<div className="container max-w-7xl mx-auto px-6">
  {/* Content limited to 7xl (1280px) */}
</div>
```

### 4. Centered Content
```tsx
<div className="max-w-4xl mx-auto px-4">
  {/* Centered content for reading (questions, answers) */}
</div>
```

---

## Grid Patterns

### 1. Responsive Grid (Cards)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card />)}
</div>
```

### 2. Sidebar Layout
```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  <aside className="lg:col-span-4">
    <Sidebar />
  </aside>
  <main className="lg:col-span-8">
    <Content />
  </main>
</div>
```

### 3. Auto-fit Grid
```tsx
<div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
  {items.map(item => <Card />)}
</div>
```

---

## Spacing Scale

### Mobile (<640px)
```tsx
p-4   // padding: 1rem (16px)
py-6  // padding-y: 1.5rem (24px)
gap-4 // gap: 1rem (16px)
```

### Tablet (640px - 1024px)
```tsx
px-6   // padding-x: 1.5rem (24px)
py-8   // padding-y: 2rem (32px)
gap-6  // gap: 1.5rem (24px)
```

### Desktop (>=1024px)
```tsx
px-6 lg:px-8  // padding-x: 1.5rem → 2rem
py-8 lg:py-12 // padding-y: 2rem → 3rem
gap-6 lg:gap-8 // gap: 1.5rem → 2rem
```

---

## Typography Scale

### Headings
```tsx
// Mobile → Desktop
text-2xl md:text-3xl lg:text-4xl  // Main page title
text-xl md:text-2xl               // Card title
text-lg md:text-xl                // Section title
text-base md:text-lg              // Subtitle
```

### Body Text
```tsx
text-sm md:text-base  // Default body text
text-xs md:text-sm    // Secondary text
```

---

## Component-Specific Responsive Behavior

### Position Card
```tsx
<Card className="
  // Mobile
  p-4
  text-lg

  // Tablet
  md:p-5
  md:text-xl

  // Desktop
  lg:p-6
  lg:text-2xl
">
```

### Rating Slider
```tsx
// Mobile: Compact with vertical circles
<div className="
  flex flex-col gap-3
  md:flex-row md:gap-6
">
  <Slider className="order-2 md:order-1" />
  <ScoreCircles className="
    grid grid-cols-6 gap-2
    md:flex md:gap-3
  " />
</div>
```

### Table of Contents
```tsx
// Mobile: Full width, collapsible metadata
<div className="space-y-4">
  <Accordion className="lg:hidden">
    <AccordionItem value="metadata">
      <MetadataContent />
    </AccordionItem>
  </Accordion>

  <TableOfContents />
</div>

// Desktop: Sidebar layout
<div className="hidden lg:grid lg:grid-cols-12 gap-6">
  <aside className="col-span-4">
    <MetadataCard className="sticky top-20" />
  </aside>
  <main className="col-span-8">
    <TableOfContents />
  </main>
</div>
```

---

## Sticky Elements

### Sticky Header
```tsx
<header className="
  sticky top-0 z-50
  bg-background/95 backdrop-blur
">
```

### Sticky Sidebar (Desktop only)
```tsx
<aside className="
  lg:sticky lg:top-20
  h-fit
">
```

### Sticky Footer Actions
```tsx
<div className="
  fixed lg:sticky
  bottom-0 lg:bottom-auto
  left-0 right-0 lg:left-auto lg:right-auto
  z-40 lg:z-auto
  bg-background border-t lg:border-t-0
  p-4 lg:p-0
">
```

---

## Touch-Friendly Targets (Mobile)

### Minimum Touch Target Size
```tsx
// 44x44px minimum (Apple HIG)
// 48x48px recommended (Material Design)

<Button className="
  min-h-[44px] md:min-h-[40px]
  px-4 md:px-3
">
```

### Increased Spacing
```tsx
<div className="
  space-y-4 md:space-y-3  // More space on mobile
  -mx-2 md:mx-0           // Negative margin for touch targets
">
  <button className="px-2 py-3 md:py-2">
```

---

## Scroll Behavior

### Smooth Scroll
```tsx
// In globals.css
html {
  scroll-behavior: smooth;
}

// Or programmatically
element.scrollIntoView({ behavior: 'smooth' });
```

### Scroll Padding (for sticky headers)
```tsx
// In globals.css
html {
  scroll-padding-top: 4rem; // Height of sticky header
}
```

---

## Breakpoint-Specific Components

### Show/Hide Components
```tsx
// Show only on mobile
<div className="block md:hidden">
  <MobileComponent />
</div>

// Show only on desktop
<div className="hidden md:block">
  <DesktopComponent />
</div>

// Show only on tablet and up
<div className="hidden sm:block">
  <TabletComponent />
</div>
```

### Conditional Rendering
```tsx
import { useMediaQuery } from '@/hooks/useMediaQuery';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <MobileView /> : <DesktopView />;
}
```

---

## Performance Optimizations

### Image Loading
```tsx
<img
  src={imageSrc}
  loading="lazy"
  srcSet={`
    ${imageSrc}?w=400 400w,
    ${imageSrc}?w=800 800w,
    ${imageSrc}?w=1200 1200w
  `}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
/>
```

### Dynamic Imports
```tsx
import { lazy, Suspense } from 'react';

// Load heavy components only on desktop
const DesktopSidebar = lazy(() => import('./DesktopSidebar'));

function Layout() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      {isDesktop && (
        <Suspense fallback={<Skeleton />}>
          <DesktopSidebar />
        </Suspense>
      )}
    </>
  );
}
```

---

## Testing Responsive Layouts

### Browser DevTools
```
Chrome DevTools:
- Cmd/Ctrl + Shift + M (Device toolbar)
- Test breakpoints: 375px, 768px, 1024px, 1440px

Common device sizes:
- iPhone SE: 375px
- iPhone 12/13: 390px
- iPad: 768px
- iPad Pro: 1024px
- Desktop: 1280px+
```

### React Testing Library
```tsx
import { render } from '@testing-library/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

test('shows mobile layout on small screens', () => {
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: query === '(max-width: 768px)',
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));

  const { getByTestId } = render(<ResponsiveComponent />);
  expect(getByTestId('mobile-view')).toBeInTheDocument();
});
```

---

## Tailwind Config Example

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
  },
};
```

---

**Файлы маршрутов**:
- `/Users/sunshad0w/Work/interviewer/ui-previews/layouts/responsive-layouts.md`
