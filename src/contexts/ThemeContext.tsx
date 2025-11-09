/**
 * Theme Context для управления темой приложения
 *
 * Использует next-themes для поддержки light/dark/system режимов
 * Тема сохраняется в localStorage автоматически
 */

import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Theme Provider обертка над next-themes
 *
 * Настройки:
 * - attribute="class" - использует class-based dark mode для Tailwind
 * - defaultTheme="system" - по умолчанию использует системную тему
 * - enableSystem - включает автоматическое определение системной темы
 * - disableTransitionOnChange - отключает анимации при смене темы (против мерцания)
 *
 * @param props - Props ThemeProvider
 * @returns JSX элемент провайдера
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@/contexts';
 *
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
/**
 * Props для ThemeProvider
 */
interface ThemeProviderProps {
  children: React.ReactNode
  [key: string]: unknown
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps): React.JSX.Element {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

/**
 * Hook для использования темы
 * Re-export из next-themes
 *
 * @returns Объект с текущей темой и методами управления
 *
 * @example
 * ```tsx
 * import { useTheme } from '@/contexts';
 *
 * function ThemeToggle() {
 *   const { theme, setTheme } = useTheme();
 *
 *   return (
 *     <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
 *       Toggle Theme
 *     </button>
 *   );
 * }
 * ```
 */
export { useTheme } from 'next-themes'
