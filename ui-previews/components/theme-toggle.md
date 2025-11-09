# Theme Toggle Component - Переключатель темы

**Назначение**: Переключение между светлой и темной темой
**Используется в**: Header на всех экранах

---

## ASCII Wireframe

### Button States

#### Light Mode Active
```
┌──────┐
│  ☀️  │  ← Sun icon visible
└──────┘
```

#### Dark Mode Active
```
┌──────┐
│  🌙  │  ← Moon icon visible
└──────┘
```

### With Dropdown
```
┌──────┐
│  ☀️  │  ← Click opens dropdown
└──────┘
    ↓
┌──────────────┐
│ ☀️ Светлая   │
│ 🌙 Темная    │
│ 💻 Системная │
└──────────────┘
```

---

## Implementation

### 1. Simple Toggle (Light/Dark only)

```tsx
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
      className="relative"
    >
      {/* Sun Icon (visible in light mode) */}
      <Sun
        size={20}
        className={cn(
          "absolute transition-all duration-300",
          "rotate-0 scale-100",
          "dark:-rotate-90 dark:scale-0"
        )}
      />

      {/* Moon Icon (visible in dark mode) */}
      <Moon
        size={20}
        className={cn(
          "absolute transition-all duration-300",
          "rotate-90 scale-0",
          "dark:rotate-0 dark:scale-100"
        )}
      />
    </Button>
  );
}
```

---

### 2. Dropdown with System Option

```tsx
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Выбрать тему"
          className="relative"
        >
          <Sun
            size={20}
            className={cn(
              "transition-all duration-300",
              "rotate-0 scale-100",
              "dark:-rotate-90 dark:scale-0"
            )}
          />
          <Moon
            size={20}
            className={cn(
              "absolute transition-all duration-300",
              "rotate-90 scale-0",
              "dark:rotate-0 dark:scale-100"
            )}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(
            "cursor-pointer",
            theme === 'light' && "bg-muted"
          )}
        >
          <Sun size={16} className="mr-2" />
          <span>Светлая</span>
          {theme === 'light' && (
            <span className="ml-auto text-primary">✓</span>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(
            "cursor-pointer",
            theme === 'dark' && "bg-muted"
          )}
        >
          <Moon size={16} className="mr-2" />
          <span>Темная</span>
          {theme === 'dark' && (
            <span className="ml-auto text-primary">✓</span>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={cn(
            "cursor-pointer",
            theme === 'system' && "bg-muted"
          )}
        >
          <Monitor size={16} className="mr-2" />
          <span>Системная</span>
          {theme === 'system' && (
            <span className="ml-auto text-primary">✓</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

### 3. useTheme Hook Implementation

```tsx
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Load from localStorage
    const stored = localStorage.getItem('theme') as Theme;
    return stored || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let resolved: 'light' | 'dark';

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      resolved = systemTheme;
    } else {
      resolved = theme;
    }

    root.classList.add(resolved);
    setResolvedTheme(resolved);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  // Listen to system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const resolved = mediaQuery.matches ? 'dark' : 'light';
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(resolved);
      setResolvedTheme(resolved);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

---

## Variants

### 1. Compact Toggle (for mobile)

```tsx
export function ThemeToggleCompact() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        "p-2 rounded-md",
        "hover:bg-muted",
        "transition-colors"
      )}
      aria-label="Переключить тему"
    >
      {isDark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
```

### 2. Toggle with Label

```tsx
export function ThemeToggleWithLabel() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {isDark ? 'Темная' : 'Светлая'}
      </span>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </Button>
    </div>
  );
}
```

### 3. Switch Toggle (alternative UI)

```tsx
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-3">
      <Sun size={16} className={cn(!isDark && "text-primary")} />

      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        aria-label="Переключить тему"
      />

      <Moon size={16} className={cn(isDark && "text-primary")} />
    </div>
  );
}
```

---

## Animation Details

### Icon Transition
```css
/* Sun Icon */
.rotate-0 {
  transform: rotate(0deg);
}

.scale-100 {
  transform: scale(1);
}

.dark\:-rotate-90 {
  transform: rotate(-90deg);
}

.dark\:scale-0 {
  transform: scale(0);
}

/* Moon Icon */
.rotate-90 {
  transform: rotate(90deg);
}

.scale-0 {
  transform: scale(0);
}

.dark\:rotate-0 {
  transform: rotate(0deg);
}

.dark\:scale-100 {
  transform: scale(1);
}

/* Transition */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
```

---

## Tailwind CSS Setup

### tailwind.config.js
```javascript
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Custom animations can be added here
    },
  },
};
```

### globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... other light theme variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... other dark theme variables */
  }
}
```

---

## Accessibility

### Keyboard Navigation
```tsx
<Button
  variant="ghost"
  size="icon"
  onClick={toggleTheme}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  }}
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  role="button"
  tabIndex={0}
>
```

### Screen Reader Announcements
```tsx
import { useAnnouncer } from '@/hooks/useAnnouncer';

const announce = useAnnouncer();

const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);

  announce(`Тема изменена на ${newTheme === 'dark' ? 'темную' : 'светлую'}`);
};
```

---

## Mobile Considerations

### Touch Target Size
```tsx
<Button
  size="icon"
  className="min-h-[44px] min-w-[44px]" // Minimum touch target
>
```

### Position in Mobile Header
```tsx
<header className="flex items-center justify-between px-4 h-16">
  <Logo />

  <div className="flex items-center gap-2">
    <ThemeToggle />
    <MenuButton />
  </div>
</header>
```

---

## Performance

### Avoid Flash of Unstyled Content (FOUC)

#### Inline Script in HTML
```html
<!-- In index.html, before any other scripts -->
<script>
  (function() {
    const theme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const resolvedTheme = theme === 'system' || !theme ? systemTheme : theme;

    document.documentElement.classList.add(resolvedTheme);
  })();
</script>
```

---

## Testing

### Unit Tests
```tsx
import { render, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '@/hooks/useTheme';

test('toggles theme on click', () => {
  const { getByLabelText } = render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );

  const button = getByLabelText(/переключить тему/i);

  // Initially light
  expect(document.documentElement.classList.contains('light')).toBe(true);

  // Click to toggle
  fireEvent.click(button);

  // Should be dark now
  expect(document.documentElement.classList.contains('dark')).toBe(true);
});
```

---

## shadcn/ui Components Used

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add switch  # for switch variant
npx shadcn-ui@latest add label   # for switch variant
```

---

## Usage Examples

### In Header
```tsx
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
```

### In Settings Page
```tsx
export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Тема оформления</h3>
        <p className="text-sm text-muted-foreground">
          Выберите тему для приложения
        </p>

        <div className="flex items-center justify-between py-4 border-t">
          <div>
            <p className="font-medium">Текущая тема</p>
            <p className="text-sm text-muted-foreground">
              {theme === 'system' ? 'Системная' : theme === 'dark' ? 'Темная' : 'Светлая'}
            </p>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
```

### With App Provider
```tsx
// src/App.tsx
import { ThemeProvider } from '@/hooks/useTheme';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Your routes */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
```

---

## Dark Mode Color Palette Example

```tsx
// Example of how components adapt
<Card className="bg-card text-card-foreground">
  <CardContent>
    <p className="text-foreground">
      This text automatically adapts to theme
    </p>
    <p className="text-muted-foreground">
      Secondary text also adapts
    </p>
  </CardContent>
</Card>
```

**Light Mode Colors**:
- `bg-card` → white
- `text-foreground` → dark gray
- `text-muted-foreground` → mid gray

**Dark Mode Colors**:
- `bg-card` → dark blue/black
- `text-foreground` → light gray/white
- `text-muted-foreground` → mid gray

---

**Файлы маршрутов**:
- `/Users/sunshad0w/Work/interviewer/ui-previews/components/theme-toggle.md`
