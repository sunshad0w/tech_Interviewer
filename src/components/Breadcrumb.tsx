/**
 * Breadcrumb компонент для навигации по иерархии
 *
 * Показывает путь: Position > Chapter > Question
 * Каждая часть кликабельна (кроме последней)
 */

import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

/**
 * Элемент breadcrumb
 */
export interface BreadcrumbItem {
  /** Текст для отображения */
  label: string
  /** URL для перехода (если null - не кликабельный) */
  href: string | null
  /** Truncate если текст слишком длинный */
  truncate?: boolean
}

/**
 * Props для Breadcrumb компонента
 */
interface BreadcrumbProps {
  /** Массив элементов breadcrumb */
  items: BreadcrumbItem[]
  /** Дополнительные CSS классы */
  className?: string
  /** Символ разделителя */
  separator?: string
}

/**
 * Компонент breadcrumb навигации
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'React Developer', href: '/position/React%20Developer' },
 *     { label: 'Chapter 1: Basics', href: null },
 *     { label: 'What is React?', href: null },
 *   ]}
 * />
 * ```
 */
export default function Breadcrumb({
  items,
  className,
  separator = '›',
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-2 text-sm', className)}
    >
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={cn(
                    'text-muted-foreground hover:text-foreground transition-colors',
                    item.truncate && 'truncate max-w-[200px] md:max-w-[300px]'
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground',
                    item.truncate && 'truncate max-w-[200px] md:max-w-[300px]'
                  )}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="text-muted-foreground/50" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
