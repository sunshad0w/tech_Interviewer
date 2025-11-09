import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/**
 * Тестовая markdown строка со всеми поддерживаемыми features
 */
const TEST_MARKDOWN = `# Heading 1 - Заголовок первого уровня

Это обычный параграф с **жирным текстом**, *курсивом*, ~~зачеркнутым текстом~~ и \`inline code\`.

## Heading 2 - Code Blocks с Syntax Highlighting

### TypeScript Example

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: 'Иван Иванов',
  email: 'ivan@example.com',
}

function greetUser(user: User): string {
  return \`Привет, \${user.name}!\`
}

console.log(greetUser(user))
\`\`\`

### JavaScript Example

\`\`\`javascript
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}
\`\`\`

### Python Example

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Генерация первых 10 чисел Фибоначчи
result = [fibonacci(i) for i in range(10)]
print(result)
\`\`\`

### CSS Example

\`\`\`css
.button {
  background-color: #0f172a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.button:hover {
  background-color: #1e293b;
  transform: scale(1.05);
}
\`\`\`

## Heading 2 - Списки

### Неупорядоченный список

- Первый элемент
- Второй элемент
  - Вложенный элемент 2.1
  - Вложенный элемент 2.2
    - Глубоко вложенный элемент
- Третий элемент
- Четвертый элемент

### Упорядоченный список

1. Первый шаг
2. Второй шаг
3. Третий шаг
   1. Подшаг 3.1
   2. Подшаг 3.2
4. Четвертый шаг

### Список задач (чекбоксы)

- [x] Завершенная задача
- [ ] Незавершенная задача
- [x] Еще одна завершенная задача
- [ ] Задача в процессе

## Heading 2 - Таблицы

### Простая таблица

| Название | Тип | Описание |
|----------|-----|----------|
| useState | Hook | Управление локальным состоянием |
| useEffect | Hook | Побочные эффекты и lifecycle |
| useCallback | Hook | Мемоизация функций |

### Таблица с выравниванием

| Слева | По центру | Справа |
|:------|:---------:|-------:|
| Текст | Текст | 100 |
| Длинный текст слева | Центр | 250 |
| A | B | 999 |

### Широкая таблица (с прокруткой на mobile)

| Column 1 | Column 2 | Column 3 | Column 4 | Column 5 | Column 6 | Column 7 | Column 8 |
|----------|----------|----------|----------|----------|----------|----------|----------|
| Data 1 | Data 2 | Data 3 | Data 4 | Data 5 | Data 6 | Data 7 | Data 8 |
| Value A | Value B | Value C | Value D | Value E | Value F | Value G | Value H |
| Test 1 | Test 2 | Test 3 | Test 4 | Test 5 | Test 6 | Test 7 | Test 8 |

## Heading 2 - Blockquotes

> Это простая цитата (blockquote).
> Она может занимать несколько строк.
>
> И даже несколько параграфов.

> ### Вложенный заголовок в цитате
>
> Цитата может содержать **форматирование** и \`код\`.

## Heading 2 - Ссылки и изображения

### Ссылки

Обычная ссылка: [Google](https://google.com)

Ссылка с title: [GitHub](https://github.com "GitHub Homepage")

Автоматическая ссылка: https://example.com

## Heading 2 - Горизонтальные разделители

Разделитель ниже:

---

Текст после разделителя.

## Heading 2 - Emoji

Эмодзи поддерживаются напрямую:

🚀 ✅ 🎉 💡 ⚠️ ❌ 🔥 💻 📱 🌟

### Популярные эмодзи для документации

- ✅ Завершено
- ❌ Ошибка
- ⚠️ Предупреждение
- 💡 Совет
- 🚀 Новая функция
- 🔥 Важно
- 📝 Заметка
- 🎯 Цель

## Heading 2 - Inline Code vs Code Blocks

Inline code: используйте \`const x = 10\` для объявления константы.

Code block без языка:

\`\`\`
Plain text code block
Without syntax highlighting
\`\`\`

## Heading 2 - Комбинированный пример

Рассмотрим создание **React компонента** с использованием _TypeScript_:

\`\`\`tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface CounterProps {
  initialValue?: number
}

/**
 * Компонент счетчика с кнопками увеличения/уменьшения
 */
export default function Counter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState(initialValue)

  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => setCount(count - 1)}>-</Button>
      <span className="text-2xl font-bold">{count}</span>
      <Button onClick={() => setCount(count + 1)}>+</Button>
    </div>
  )
}
\`\`\`

**Ключевые моменты:**

1. Используем TypeScript для типизации props
2. \`useState\` для управления состоянием
3. Inline обработчики событий для простоты

> 💡 **Совет:** Всегда типизируйте props компонентов для лучшей поддержки IDE и предотвращения ошибок.

## Heading 2 - Вложенные структуры

### Список с кодом

1. Установите зависимости:
   \`\`\`bash
   npm install react react-dom
   \`\`\`

2. Создайте компонент:
   \`\`\`tsx
   export default function App() {
     return <div>Hello World</div>
   }
   \`\`\`

3. Запустите приложение:
   \`\`\`bash
   npm run dev
   \`\`\`

### Blockquote с кодом

> **Важное замечание:**
>
> При использовании \`useEffect\` всегда указывайте dependency array:
>
> \`\`\`typescript
> useEffect(() => {
>   // effect code
> }, [dependency1, dependency2])
> \`\`\`

---

## Итого

Этот тестовый документ демонстрирует все основные возможности Markdown:

- ✅ Заголовки (h1-h6)
- ✅ Форматирование текста (bold, italic, strikethrough)
- ✅ Code blocks с syntax highlighting
- ✅ Inline code
- ✅ Списки (ordered, unordered, nested, tasks)
- ✅ Таблицы с прокруткой
- ✅ Blockquotes
- ✅ Ссылки
- ✅ Горизонтальные разделители
- ✅ Emoji
- ✅ Комбинации элементов
`

/**
 * Тестовая страница для проверки MarkdownRenderer
 *
 * Отображает все поддерживаемые markdown features:
 * - Заголовки всех уровней
 * - Форматирование текста
 * - Code blocks с syntax highlighting
 * - Списки и таблицы
 * - Blockquotes и ссылки
 * - Emoji поддержка
 *
 * @example
 * Доступна по пути: /test-markdown
 */
export default function MarkdownTestPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Markdown Test Page</h1>
              <p className="text-sm text-muted-foreground">
                Тестирование всех возможностей MarkdownRenderer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Все возможности Markdown</CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownRenderer content={TEST_MARKDOWN} />
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>💡</span>
              Информация о тестировании
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Проверьте:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Syntax highlighting работает для всех языков (TypeScript, JavaScript, Python, CSS)</li>
              <li>Темы кода меняются при переключении light/dark mode</li>
              <li>Таблицы прокручиваются горизонтально на узких экранах</li>
              <li>Все emoji отображаются корректно</li>
              <li>Inline code выделяется правильно</li>
              <li>Ссылки открываются в новой вкладке</li>
              <li>Blockquotes имеют визуальное оформление</li>
              <li>Списки правильно вложены</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
