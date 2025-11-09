# Question View Screen - Экран отображения вопроса

**Назначение**: Показ вопроса, ответа (markdown), best practices, оценка ответа
**Маршруты**:
- `/question/:positionId/:questionNumber` - просмотр конкретного вопроса
- `/interview/:positionId` - режим интервью

---

## ASCII Wireframe

### Desktop Layout - До показа ответа
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Назад к обзору    Вопрос 15 из 70                      [🌙 Theme]  [✕]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ Angular Core & Fundamentals                                    Глава 1 │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  🎯 Вопрос 1.3                                                      │   │
│  │                                                                     │   │
│  │  Что такое Dependency Injection в Angular и как он работает?       │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │                        [ 👁 Показать ответ ]                        │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Desktop Layout - После показа ответа
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Назад к обзору    Вопрос 15 из 70                      [🌙 Theme]  [✕]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ Angular Core & Fundamentals                                    Глава 1 │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🎯 Вопрос 1.3                                                      │   │
│  │  Что такое Dependency Injection в Angular и как он работает?       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 📝 Ответ                                                [ Скрыть ▲ ] │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                     │   │
│  │  Dependency Injection (DI) — это паттерн проектирования и один из  │   │
│  │  ключевых механизмов Angular, который позволяет:                   │   │
│  │                                                                     │   │
│  │  • Создавать и управлять зависимостями компонентов                 │   │
│  │  • Повышать тестируемость кода                                     │   │
│  │  • Улучшать модульность приложения                                 │   │
│  │                                                                     │   │
│  │  ## Как работает DI в Angular                                      │   │
│  │                                                                     │   │
│  │  ```typescript                                                     │   │
│  │  @Injectable({                                                     │   │
│  │    providedIn: 'root'                                              │   │
│  │  })                                                                │   │
│  │  export class DataService {                                        │   │
│  │    constructor(private http: HttpClient) {}                        │   │
│  │  }                                                                 │   │
│  │  ```                                                               │   │
│  │                                                                     │   │
│  │  ### Основные концепции:                                           │   │
│  │                                                                     │   │
│  │  1. **Injector** - создает и управляет экземплярами сервисов       │   │
│  │  2. **Provider** - определяет как создать зависимость              │   │
│  │  3. **Token** - ключ для получения зависимости                     │   │
│  │                                                                     │   │
│  │  [... еще контент ...]                                             │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ⭐ Best Practices                                                   │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                     │   │
│  │  ✓ Используйте providedIn: 'root' для singleton сервисов           │   │
│  │  ✓ Избегайте циклических зависимостей                              │   │
│  │  ✓ Используйте injection tokens для абстракций                     │   │
│  │  ✓ Применяйте hierarchical injectors для изоляции                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 📊 Как вы оцениваете свой ответ?                                   │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                     │   │
│  │  Совсем не знает ответ                         Полный ответ        │   │
│  │  0────────1────────2────────3────────4────────5                    │   │
│  │           ○        ○        ●        ○        ○                    │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ 0 - Совсем не знает ответ                                  │   │   │
│  │  │ 1-2 - Частичное понимание                                   │   │   │
│  │  │ 3-4 - Хорошее знание                                        │   │   │
│  │  │ 5 - Полный ответ                                            │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │              [ Сохранить оценку и продолжить → ]                   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Mobile Layout - После показа ответа
```
┌────────────────────────────────┐
│ ← Назад  Вопрос 15/70    [🌙] │
├────────────────────────────────┤
│                                │
│ Angular Core & Fundamentals    │
│                         Глава 1│
│                                │
│ ┌────────────────────────────┐ │
│ │ 🎯 Вопрос 1.3              │ │
│ │                            │ │
│ │ Что такое Dependency       │ │
│ │ Injection в Angular и как  │ │
│ │ он работает?               │ │
│ └────────────────────────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ 📝 Ответ      [Скрыть ▲]  │ │
│ ├────────────────────────────┤ │
│ │                            │ │
│ │ Dependency Injection (DI)  │ │
│ │ — это паттерн проектиро-   │ │
│ │ вания и один из ключевых   │ │
│ │ механизмов Angular...      │ │
│ │                            │ │
│ │ • Создавать и управлять    │ │
│ │   зависимостями            │ │
│ │ • Повышать тестируемость   │ │
│ │                            │ │
│ │ ## Как работает DI         │ │
│ │                            │ │
│ │ ```typescript              │ │
│ │ @Injectable({              │ │
│ │   providedIn: 'root'       │ │
│ │ })                         │ │
│ │ export class DataService { │ │
│ │   ...                      │ │
│ │ }                          │ │
│ │ ```                        │ │
│ │                            │ │
│ │ [... scroll ...]           │ │
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ ⭐ Best Practices          │ │
│ ├────────────────────────────┤ │
│ │ ✓ providedIn: 'root'       │ │
│ │ ✓ Избегайте циклических    │ │
│ │   зависимостей             │ │
│ │ ✓ Injection tokens         │ │
│ └────────────────────────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ 📊 Оцените ответ           │ │
│ ├────────────────────────────┤ │
│ │                            │ │
│ │ 0─────2─────4─────5        │ │
│ │       ●                    │ │
│ │                            │ │
│ │ Выбрано: 2/5               │ │
│ │ Частичное понимание        │ │
│ │                            │ │
│ │ [Сохранить и продолжить]   │ │
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
└────────────────────────────────┘
```

---

## Детальное описание компонентов

### 1. Header (с контекстом)

```tsx
<header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
  <div className="container flex h-16 items-center justify-between px-4">
    {/* Left Side */}
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleBack}
      >
        <ArrowLeft size={20} />
      </Button>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          Вопрос {currentQuestionIndex + 1} из {totalQuestions}
        </span>
        {isInterviewMode && (
          <Badge variant="secondary" className="animate-pulse">
            Режим интервью
          </Badge>
        )}
      </div>
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-2">
      <ThemeToggle />
      {isInterviewMode && (
        <Button
          variant="outline"
          size="sm"
          onClick={exitInterview}
        >
          <X size={16} className="mr-2" />
          <span className="hidden md:inline">Завершить</span>
        </Button>
      )}
    </div>
  </div>
</header>
```

**Tailwind классы**:
- Sticky header: `sticky top-0 z-20 border-b bg-background/95 backdrop-blur`
- Progress indicator: `text-sm font-medium text-muted-foreground`
- Interview badge: `animate-pulse` для визуального акцента

---

### 2. Chapter Context Banner

```tsx
<div className="bg-muted/50 border-b px-4 py-3">
  <div className="container max-w-4xl mx-auto flex items-center justify-between">
    <div className="flex items-center gap-3">
      <BookOpen size={18} className="text-muted-foreground" />
      <span className="text-sm font-medium">{chapter.chapter_title}</span>
    </div>
    <Badge variant="outline">
      Глава {chapter.chapter_number}
    </Badge>
  </div>
</div>
```

**Tailwind классы**:
- Background: `bg-muted/50 border-b`
- Container: `container max-w-4xl mx-auto`

---

### 3. Question Card

```tsx
<Card className="max-w-4xl mx-auto">
  <CardHeader>
    <div className="flex items-start gap-3">
      <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-sm font-bold text-primary">
          {question.question_number}
        </span>
      </div>

      <div className="flex-1">
        <CardTitle className="text-xl md:text-2xl leading-tight">
          {question.question_title}
        </CardTitle>
      </div>
    </div>
  </CardHeader>
</Card>
```

**Tailwind классы**:
- Card: `max-w-4xl mx-auto`
- Number badge: `w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center`
- Title: `text-xl md:text-2xl leading-tight`

---

### 4. Show Answer Button (до показа)

```tsx
<div className="flex items-center justify-center py-12">
  <Button
    size="lg"
    variant="default"
    onClick={() => setShowAnswer(true)}
    className="gap-2"
  >
    <Eye size={20} />
    Показать ответ
  </Button>
</div>
```

**Tailwind классы**:
- Container: `flex items-center justify-center py-12`
- Button: `size="lg" gap-2` (large size с gap для иконки)

---

### 5. Answer Section (после показа)

```tsx
<Card className="max-w-4xl mx-auto">
  <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle className="flex items-center gap-2">
      <FileText size={20} />
      Ответ
    </CardTitle>
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setShowAnswer(false)}
      className="gap-1.5"
    >
      <EyeOff size={16} />
      Скрыть
    </Button>
  </CardHeader>

  <CardContent>
    {/* Markdown Content */}
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
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
              <code className={cn("bg-muted px-1.5 py-0.5 rounded text-sm font-mono", className)} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {question.answer_markdown}
      </ReactMarkdown>
    </div>
  </CardContent>
</Card>
```

**Tailwind классы для markdown**:
```css
.prose {
  /* Заголовки */
  h1: text-3xl font-bold mt-8 mb-4
  h2: text-2xl font-semibold mt-6 mb-3
  h3: text-xl font-semibold mt-4 mb-2

  /* Текст */
  p: text-base leading-relaxed mb-4

  /* Списки */
  ul: list-disc list-inside mb-4 space-y-2
  ol: list-decimal list-inside mb-4 space-y-2

  /* Код */
  code: bg-muted px-1.5 py-0.5 rounded text-sm font-mono
  pre: bg-muted p-4 rounded-lg overflow-x-auto mb-4

  /* Таблицы */
  table: w-full border-collapse mb-4
  th: border border-border bg-muted p-2 text-left font-semibold
  td: border border-border p-2
}
```

---

### 6. Best Practices Section

```tsx
{question.best_practices && question.best_practices.length > 0 && (
  <Card className="max-w-4xl mx-auto mt-6 border-primary/20 bg-primary/5">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-primary">
        <Award size={20} />
        Best Practices
      </CardTitle>
    </CardHeader>

    <CardContent>
      <ul className="space-y-3">
        {question.best_practices.map((practice, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle size={18} className="text-success shrink-0 mt-0.5" />
            <span className="text-sm leading-relaxed">{practice}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)}
```

**Tailwind классы**:
- Highlighted card: `border-primary/20 bg-primary/5`
- List item: `flex items-start gap-3`
- Icon: `text-success shrink-0 mt-0.5`

---

### 7. Rating Slider (ключевой компонент)

```tsx
<Card className="max-w-4xl mx-auto mt-6">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <BarChart3 size={20} />
      Как вы оцениваете свой ответ?
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-6">
    {/* Slider */}
    <div className="space-y-4">
      <div className="px-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Совсем не знает ответ</span>
          <span>Полный ответ</span>
        </div>

        <Slider
          value={[rating]}
          onValueChange={([value]) => setRating(value)}
          min={0}
          max={5}
          step={1}
          className="w-full"
        />

        <div className="flex items-center justify-between text-xs font-medium mt-2">
          <span className={cn("transition-colors", rating === 0 && "text-primary")}>0</span>
          <span className={cn("transition-colors", rating === 1 && "text-primary")}>1</span>
          <span className={cn("transition-colors", rating === 2 && "text-primary")}>2</span>
          <span className={cn("transition-colors", rating === 3 && "text-primary")}>3</span>
          <span className={cn("transition-colors", rating === 4 && "text-primary")}>4</span>
          <span className={cn("transition-colors", rating === 5 && "text-primary")}>5</span>
        </div>
      </div>

      {/* Visual Score Indicator */}
      <div className="flex items-center justify-center gap-2 py-4">
        {[0, 1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            onClick={() => setRating(score)}
            className={cn(
              "w-10 h-10 rounded-full border-2 transition-all duration-200",
              "flex items-center justify-center font-semibold",
              rating === score
                ? "border-primary bg-primary text-primary-foreground scale-110 shadow-lg"
                : "border-muted-foreground/30 hover:border-primary/50 hover:scale-105"
            )}
          >
            {score}
          </button>
        ))}
      </div>

      {/* Score Description */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
        <div className={cn("flex items-start gap-2", rating === 0 && "text-primary font-medium")}>
          <span className="font-semibold">0</span>
          <span>— Совсем не знает ответ</span>
        </div>
        <div className={cn("flex items-start gap-2", [1, 2].includes(rating) && "text-primary font-medium")}>
          <span className="font-semibold">1-2</span>
          <span>— Частичное понимание</span>
        </div>
        <div className={cn("flex items-start gap-2", [3, 4].includes(rating) && "text-primary font-medium")}>
          <span className="font-semibold">3-4</span>
          <span>— Хорошее знание</span>
        </div>
        <div className={cn("flex items-start gap-2", rating === 5 && "text-primary font-medium")}>
          <span className="font-semibold">5</span>
          <span>— Полный ответ</span>
        </div>
      </div>
    </div>

    {/* Submit Button */}
    <Button
      size="lg"
      className="w-full"
      onClick={handleSubmitRating}
      disabled={rating === null}
    >
      {isInterviewMode ? (
        <>
          Сохранить оценку и продолжить
          <ArrowRight size={20} className="ml-2" />
        </>
      ) : (
        'Сохранить оценку'
      )}
    </Button>
  </CardContent>
</Card>
```

**Особенности slider**:
- **shadcn/ui Slider** с кастомной стилизацией
- **Визуальные индикаторы**: кружки с номерами (0-5)
- **Подсветка описания** текущего рейтинга
- **Hover effects** на всех элементах
- **Disabled state** пока не выбран рейтинг

**Tailwind классы**:
- Slider container: `space-y-4 px-2`
- Score circles: `w-10 h-10 rounded-full border-2 transition-all duration-200`
- Active score: `border-primary bg-primary text-primary-foreground scale-110 shadow-lg`
- Description box: `bg-muted/50 rounded-lg p-4 space-y-2 text-sm`

---

## Адаптивность

### Desktop (>= 1024px)
```tsx
<div className="container max-w-4xl mx-auto px-6 py-8 space-y-6">
  <QuestionCard />
  {showAnswer && (
    <>
      <AnswerCard />
      <BestPracticesCard />
      <RatingCard />
    </>
  )}
</div>
```

### Tablet (768px - 1023px)
```tsx
<div className="container max-w-3xl mx-auto px-6 py-6 space-y-6">
  {/* Те же компоненты, меньшая ширина */}
</div>
```

### Mobile (< 768px)
```tsx
<div className="px-4 py-6 space-y-6">
  {/* Упрощенный slider */}
  <Slider className="touch-action-none" />

  {/* Вертикальные score circles */}
  <div className="grid grid-cols-6 gap-2">
    {[0,1,2,3,4,5].map(score => (
      <button className="w-full aspect-square">
        {score}
      </button>
    ))}
  </div>

  {/* Sticky submit button */}
  <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
    <Button className="w-full" onClick={handleSubmit}>
      Сохранить
    </Button>
  </div>
</div>
```

**Mobile-специфичные оптимизации**:
- `touch-action-none` для slider
- `aspect-square` для score buttons
- Sticky footer для кнопки submit
- Увеличенные touch targets (min 44x44px)

---

## Интерактивные состояния

### 1. До показа ответа
```tsx
{!showAnswer && (
  <div className="flex items-center justify-center min-h-[400px]">
    <Button size="lg" onClick={() => setShowAnswer(true)}>
      <Eye size={20} className="mr-2" />
      Показать ответ
    </Button>
  </div>
)}
```

### 2. Показ ответа (с анимацией)
```tsx
{showAnswer && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <AnswerCard />
  </motion.div>
)}
```

### 3. Slider interaction
```tsx
<Slider
  value={[rating]}
  onValueChange={([value]) => {
    setRating(value);
    // Haptic feedback на мобильных (если доступно)
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }}
  className="cursor-pointer"
/>
```

### 4. Submit button states
```tsx
<Button
  disabled={rating === null}
  className={cn(
    "w-full",
    rating !== null && "animate-pulse-subtle"
  )}
>
  {isSubmitting ? (
    <Loader2 className="animate-spin" />
  ) : (
    'Сохранить оценку'
  )}
</Button>
```

---

## Режим интервью vs Просмотр одного вопроса

### Interview Mode (автопереход)
```tsx
const handleSubmitRating = async () => {
  await saveRating(rating);

  if (isInterviewMode) {
    // Автопереход к следующему вопросу
    setTimeout(() => {
      const nextQuestion = selectNextQuestion();
      navigate(`/interview/${positionId}?q=${nextQuestion.id}`);
    }, 500); // Небольшая задержка для UX
  } else {
    // Показать success toast и остаться на странице
    toast.success('Оценка сохранена!');
  }
};
```

**UI индикаторы режима интервью**:
```tsx
{isInterviewMode && (
  <>
    <Badge variant="secondary" className="animate-pulse">
      Режим интервью
    </Badge>

    <Button variant="outline" onClick={exitInterview}>
      <X size={16} className="mr-2" />
      Завершить интервью
    </Button>
  </>
)}
```

### Single Question View (остаться на странице)
```tsx
const handleSubmitRating = async () => {
  await saveRating(rating);

  toast.success('Оценка сохранена!');

  // Предложить вернуться к обзору
  setTimeout(() => {
    if (confirm('Вернуться к обзору должности?')) {
      navigate(`/position/${positionId}`);
    }
  }, 1000);
};
```

---

## Dark Mode

### Markdown code blocks
```tsx
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { theme } = useTheme();

<SyntaxHighlighter
  style={theme === 'dark' ? vscDarkPlus : vs}
  language={language}
  customStyle={{
    background: 'transparent',
    padding: '1rem',
    borderRadius: '0.5rem',
  }}
>
  {code}
</SyntaxHighlighter>
```

### Slider colors
```tsx
// shadcn/ui Slider автоматически адаптируется через CSS переменные
<Slider className="
  [&_[role=slider]]:bg-primary
  [&_[role=slider]]:border-primary
  dark:[&_[role=slider]]:bg-primary
  dark:[&_[role=slider]]:border-primary
" />
```

---

## Accessibility

### Keyboard Navigation
```tsx
// Slider доступен через клавиатуру
<Slider
  onKeyDown={(e) => {
    if (e.key === 'ArrowLeft') setRating(Math.max(0, rating - 1));
    if (e.key === 'ArrowRight') setRating(Math.min(5, rating + 1));
  }}
  aria-label="Оценка вашего ответа от 0 до 5"
  aria-valuemin={0}
  aria-valuemax={5}
  aria-valuenow={rating}
  aria-valuetext={getRatingDescription(rating)}
/>

// Score circles
{[0,1,2,3,4,5].map(score => (
  <button
    key={score}
    onClick={() => setRating(score)}
    aria-label={`Оценка ${score}: ${getScoreDescription(score)}`}
    aria-pressed={rating === score}
  >
    {score}
  </button>
))}
```

### Screen Reader Support
```tsx
<div role="region" aria-label="Вопрос и ответ">
  <h2 id="question-title">{question.question_title}</h2>

  {showAnswer && (
    <div aria-labelledby="question-title" role="article">
      <ReactMarkdown>{question.answer_markdown}</ReactMarkdown>
    </div>
  )}
</div>

<div role="group" aria-label="Оценка ответа">
  <Slider />
  <Button aria-describedby="rating-description">
    Сохранить оценку
  </Button>
  <div id="rating-description" className="sr-only">
    Выбрано: {rating} из 5. {getRatingDescription(rating)}
  </div>
</div>
```

---

## Анимации

### Answer reveal
```tsx
<AnimatePresence>
  {showAnswer && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <AnswerCard />
    </motion.div>
  )}
</AnimatePresence>
```

### Slider thumb animation
```css
/* В Tailwind */
[&_[role=slider]]:transition-transform
[&_[role=slider]]:active:scale-110
[&_[role=slider]]:focus:scale-110
```

### Submit button pulse (когда готов)
```tsx
<Button
  className={cn(
    rating !== null && "animate-[pulse_2s_ease-in-out_infinite]"
  )}
>
```

---

## shadcn/ui Components Used

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add alert-dialog  # для exit confirmation
npx shadcn-ui@latest add scroll-area   # для длинных ответов
```

---

## Пример полной реализации

```tsx
// src/pages/QuestionViewPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/use-toast';
import {
  ArrowLeft, Eye, EyeOff, FileText, Award, CheckCircle,
  BarChart3, ArrowRight, X, BookOpen
} from 'lucide-react';
import { useQuestion } from '@/hooks/useQuestion';
import { useStatistics } from '@/hooks/useStatistics';
import { useTheme } from '@/hooks/useTheme';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';

export function QuestionViewPage() {
  const { positionId, questionNumber } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isInterviewMode = searchParams.get('mode') === 'interview';

  const { question, chapter, isLoading } = useQuestion(positionId, questionNumber);
  const { getQuestionStats, saveQuestionRating } = useStatistics();
  const { theme } = useTheme();

  const [showAnswer, setShowAnswer] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing rating
  useEffect(() => {
    if (question) {
      const stats = getQuestionStats(positionId, questionNumber);
      if (stats?.answerScore !== null) {
        setRating(stats.answerScore);
      }
    }
  }, [question, positionId, questionNumber]);

  const handleSubmitRating = async () => {
    if (rating === null) return;

    setIsSubmitting(true);
    await saveQuestionRating(positionId, questionNumber, rating);

    if (isInterviewMode) {
      // Auto-advance to next question
      setTimeout(() => {
        const nextQuestion = selectNextQuestion(positionId);
        navigate(`/interview/${positionId}?q=${nextQuestion.id}&mode=interview`);
      }, 500);
    } else {
      toast({
        title: 'Оценка сохранена!',
        description: `Вы оценили свой ответ на ${rating}/5`,
      });
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (!question) return <ErrorState />;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">
                Вопрос {questionNumber} из {totalQuestions}
              </span>
              {isInterviewMode && (
                <Badge variant="secondary" className="animate-pulse">
                  Режим интервью
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isInterviewMode && (
              <Button variant="outline" size="sm" onClick={exitInterview}>
                <X size={16} className="mr-2" />
                Завершить
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Chapter Context */}
      <div className="bg-muted/50 border-b px-4 py-3">
        <div className="container max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium">{chapter.chapter_title}</span>
          </div>
          <Badge variant="outline">Глава {chapter.chapter_number}</Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* Question Card */}
        <QuestionCard question={question} />

        {/* Show Answer Button */}
        {!showAnswer && (
          <ShowAnswerButton onClick={() => setShowAnswer(true)} />
        )}

        {/* Answer Section */}
        {showAnswer && (
          <>
            <AnswerCard
              answer={question.answer_markdown}
              isDarkMode={theme === 'dark'}
              onHide={() => setShowAnswer(false)}
            />

            {question.best_practices?.length > 0 && (
              <BestPracticesCard practices={question.best_practices} />
            )}

            <RatingCard
              rating={rating}
              onRatingChange={setRating}
              onSubmit={handleSubmitRating}
              isSubmitting={isSubmitting}
              isInterviewMode={isInterviewMode}
            />
          </>
        )}
      </div>
    </div>
  );
}
```

---

**Файлы маршрутов**:
- `/Users/sunshad0w/Work/interviewer/ui-previews/screens/question-view.md`
