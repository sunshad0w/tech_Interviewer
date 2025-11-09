# Interview Mode - Режим интервью

**Назначение**: Специальный режим с автоматическим выбором вопросов и автопереходом
**Маршрут**: `/interview/:positionId?chapter=:chapterNumber`

---

## Отличия от обычного просмотра

| Режим | Обычный просмотр | Режим интервью |
|-------|------------------|----------------|
| Выбор вопроса | Пользователь кликает | Взвешенная рандомизация |
| После оценки | Остается на странице | Автопереход к следующему |
| Фильтрация | Нет | По главе (опционально) |
| Индикация | Нет | Badge "Режим интервью" |
| Выход | Кнопка "Назад" | Кнопка "Завершить интервью" |
| Progress | Нет | Показывает прогресс сессии |

---

## ASCII Wireframe - Стартовый экран

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Назад к обзору    Режим интервью                       [🌙 Theme]  [✕]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                                                                       │ │
│  │                      🎯 Режим интервью                                │ │
│  │                                                                       │ │
│  │              Angular Senior Developer                                │ │
│  │                                                                       │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  Выберите настройки интервью                                          │ │
│  ├───────────────────────────────────────────────────────────────────────┤ │
│  │                                                                       │ │
│  │  📚 Фильтр по главам                                                  │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │  │ [●] Все главы (70 вопросов)                                     │  │ │
│  │  │ [ ] Глава 1: Angular Core & Fundamentals (10 вопросов)          │  │ │
│  │  │ [ ] Глава 2: RxJS & Reactive Programming (12 вопросов)          │  │ │
│  │  │ [ ] Глава 3: Angular Router (8 вопросов)                        │  │ │
│  │  │ [ ] Глава 4: Forms & Validation (9 вопросов)                    │  │ │
│  │  │ [ ] Глава 5: State Management (11 вопросов)                     │  │ │
│  │  │ [ ] Глава 6: Performance & Optimization (10 вопросов)           │  │ │
│  │  │ [ ] Глава 7: Testing (7 вопросов)                               │  │ │
│  │  │ [ ] Глава 8: Security & Best Practices (3 вопроса)              │  │ │
│  │  └─────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                       │ │
│  │  ⚙️ Режим выбора вопросов                                            │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │  │ [●] Умный (приоритет слабых мест)                               │  │ │
│  │  │ [ ] Случайный (все вопросы равновероятны)                       │  │ │
│  │  │ [ ] Только неотвеченные                                         │  │ │
│  │  └─────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                       │ │
│  │  📊 Ваша текущая статистика:                                          │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Общий балл: 3.2/5                                               │  │ │
│  │  │ Отвечено: 42/70 (60%)                                           │  │ │
│  │  │ Неотвеченных: 28 вопросов                                       │  │ │
│  │  │ Слабые места (балл < 3): 15 вопросов                            │  │ │
│  │  └─────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                       │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                    [ 🚀 Начать интервью ]                             │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ASCII Wireframe - Во время интервью

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Назад      [⏸ Пауза]  Вопрос 3 из 28              [🌙 Theme]  [✕ Выйти] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🎯 Режим интервью  |  Глава: Все  |  ████░░░░░░░░░░ 3/28 (11%)     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ RxJS & Reactive Programming                                 Глава 2 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🎯 Вопрос 2.5                                                      │   │
│  │                                                                     │   │
│  │  Объясните разницу между hot и cold observables.                   │   │
│  │  Приведите примеры использования.                                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      [ 👁 Показать ответ ]                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 💡 Подсказка                                                        │   │
│  │ Приоритет этому вопросу: ⭐⭐⭐⭐⭐ (вес: 25)                          │   │
│  │ Этот вопрос не был отвечен ранее                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ASCII Wireframe - После завершения интервью

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Вернуться к обзору    Интервью завершено              [🌙 Theme]        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                                                                       │ │
│  │                      🎉 Интервью завершено!                           │ │
│  │                                                                       │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  📊 Результаты сессии                                                 │ │
│  ├───────────────────────────────────────────────────────────────────────┤ │
│  │                                                                       │ │
│  │  Отвечено вопросов: 15                                                │ │
│  │  Длительность: 28 минут                                               │ │
│  │                                                                       │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Средняя оценка сессии: 3.4/5                                    │  │ │
│  │  │ ████████████████████████████████████░░░░░░░░░                   │  │ │
│  │  └─────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                       │ │
│  │  Распределение оценок:                                                │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │  │ 5 баллов: ████████ 5 вопросов (33%)                            │  │ │
│  │  │ 4 балла:  ██████ 4 вопроса (27%)                                │  │ │
│  │  │ 3 балла:  ████ 2 вопроса (13%)                                  │  │ │
│  │  │ 2 балла:  ██ 1 вопрос (7%)                                      │  │ │
│  │  │ 1 балл:   ████ 2 вопроса (13%)                                  │  │ │
│  │  │ 0 баллов: ██ 1 вопрос (7%)                                      │  │ │
│  │  └─────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                       │ │
│  │  🎯 Рекомендации:                                                     │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │  │ ⚠️ Обратите внимание на темы с низкими оценками:                │  │ │
│  │  │   • Hot vs Cold Observables (0 баллов)                          │  │ │
│  │  │   • Subject types (1 балл)                                      │  │ │
│  │  │   • Error handling in RxJS (2 балла)                            │  │ │
│  │  └─────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                       │ │
│  │  📈 Прогресс по должности:                                            │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │  │ До сессии:   42/70 (60%)  Балл: 3.2                            │  │ │
│  │  │ После сессии: 57/70 (81%)  Балл: 3.3 (+0.1 🎉)                  │  │ │
│  │  └─────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                       │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  [ 🔄 Начать новое интервью ]    [ 📋 Вернуться к обзору ]           │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Детальное описание функций

### 1. Стартовый экран интервью

```tsx
function InterviewSetupScreen({ positionId }: { positionId: string }) {
  const { position } = usePosition(positionId);
  const { getPositionStats } = useStatistics();
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [selectionMode, setSelectionMode] = useState<'smart' | 'random' | 'unanswered'>('smart');

  const stats = getPositionStats(positionId);
  const unansweredCount = stats.totalQuestions - stats.answeredCount;
  const weakQuestionsCount = countQuestionsWithScoreBelow(stats, 3);

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Target size={32} className="text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl">Режим интервью</CardTitle>
          <p className="text-muted-foreground mt-2">{position.guide_name}</p>
        </CardHeader>
      </Card>

      {/* Chapter Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen size={20} />
            Фильтр по главам
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedChapter} onValueChange={setSelectedChapter}>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted cursor-pointer">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Все главы</span>
                    <Badge variant="secondary">{stats.totalQuestions} вопросов</Badge>
                  </div>
                </Label>
              </div>

              {position.chapters.map((chapter) => (
                <div key={chapter.chapter_number} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted cursor-pointer">
                  <RadioGroupItem value={chapter.chapter_number.toString()} id={`chapter-${chapter.chapter_number}`} />
                  <Label htmlFor={`chapter-${chapter.chapter_number}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        Глава {chapter.chapter_number}: {chapter.chapter_title}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {chapter.questions.length} вопросов
                      </Badge>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Selection Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={20} />
            Режим выбора вопросов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectionMode} onValueChange={setSelectionMode}>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded-lg border hover:border-primary cursor-pointer">
                <RadioGroupItem value="smart" id="smart" className="mt-1" />
                <Label htmlFor="smart" className="flex-1 cursor-pointer">
                  <div className="space-y-1">
                    <div className="font-medium">Умный (рекомендуется)</div>
                    <p className="text-sm text-muted-foreground">
                      Приоритет вопросам с низкими оценками и неотвеченным
                    </p>
                  </div>
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg border hover:border-primary cursor-pointer">
                <RadioGroupItem value="random" id="random" className="mt-1" />
                <Label htmlFor="random" className="flex-1 cursor-pointer">
                  <div className="space-y-1">
                    <div className="font-medium">Случайный</div>
                    <p className="text-sm text-muted-foreground">
                      Все вопросы выбираются с одинаковой вероятностью
                    </p>
                  </div>
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg border hover:border-primary cursor-pointer">
                <RadioGroupItem value="unanswered" id="unanswered" className="mt-1" />
                <Label htmlFor="unanswered" className="flex-1 cursor-pointer">
                  <div className="space-y-1">
                    <div className="font-medium">Только неотвеченные</div>
                    <p className="text-sm text-muted-foreground">
                      Показывать только вопросы без оценки
                    </p>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Current Stats */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 size={20} />
            Ваша текущая статистика
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Общий балл:</p>
              <p className="text-2xl font-bold">{stats.overallScore.toFixed(1)}/5</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Отвечено:</p>
              <p className="text-2xl font-bold">{stats.answeredCount}/{stats.totalQuestions}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Неотвеченных:</p>
              <p className="text-lg font-semibold">{unansweredCount} вопросов</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Слабые места (< 3):</p>
              <p className="text-lg font-semibold">{weakQuestionsCount} вопросов</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <Button
        size="lg"
        className="w-full"
        onClick={() => startInterview(positionId, selectedChapter, selectionMode)}
      >
        <Rocket size={20} className="mr-2" />
        Начать интервью
      </Button>
    </div>
  );
}
```

---

### 2. Progress Bar во время интервью

```tsx
function InterviewProgressBar({ current, total, chapter }: InterviewProgressProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="bg-muted/50 border-b px-4 py-3">
      <div className="container max-w-4xl mx-auto space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="animate-pulse">
              🎯 Режим интервью
            </Badge>
            <span className="text-muted-foreground">
              Глава: {chapter || 'Все'}
            </span>
          </div>
          <span className="font-medium">
            {current}/{total} ({percent}%)
          </span>
        </div>
        <Progress value={percent} className="h-2" />
      </div>
    </div>
  );
}
```

---

### 3. Pause Dialog

```tsx
function PauseInterviewDialog({ isOpen, onClose, onExit, stats }: PauseDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Интервью приостановлено</DialogTitle>
          <DialogDescription>
            Вы можете продолжить или завершить интервью
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-muted-foreground mb-1">Отвечено</p>
              <p className="text-2xl font-bold">{stats.answered}</p>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-muted-foreground mb-1">Средняя оценка</p>
              <p className="text-2xl font-bold">{stats.averageScore.toFixed(1)}/5</p>
            </div>
          </div>

          <div className="bg-primary/10 p-3 rounded-lg text-sm">
            <p className="text-primary font-medium">
              💡 Ваш прогресс сохранен
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onExit}>
            Завершить интервью
          </Button>
          <Button onClick={onClose}>
            Продолжить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

### 4. Экран результатов

```tsx
function InterviewResultsScreen({ sessionStats, positionId }: ResultsProps) {
  const navigate = useNavigate();

  // Calculate stats
  const distribution = calculateScoreDistribution(sessionStats.answers);
  const weakQuestions = sessionStats.answers.filter(a => a.score < 3);
  const averageScore = calculateAverage(sessionStats.answers.map(a => a.score));

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Success Header */}
      <Card className="border-success/20 bg-success/5">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
              <PartyPopper size={40} className="text-success" />
            </div>
          </div>
          <CardTitle className="text-3xl text-success">
            Интервью завершено!
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Session Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 size={20} />
            Результаты сессии
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Отвечено вопросов</p>
              <p className="text-3xl font-bold">{sessionStats.totalAnswered}</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Длительность</p>
              <p className="text-3xl font-bold">{formatDuration(sessionStats.duration)}</p>
            </div>
          </div>

          {/* Average score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Средняя оценка сессии:</span>
              <span className="text-2xl font-bold">{averageScore.toFixed(1)}/5</span>
            </div>
            <Progress value={averageScore * 20} className="h-3" />
          </div>

          {/* Score distribution */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Распределение оценок:</p>
            {Object.entries(distribution).reverse().map(([score, count]) => (
              <div key={score} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{score} {score === '1' ? 'балл' : 'балла'}:</span>
                    <span className="text-muted-foreground">{count} {getQuestionWord(count)}</span>
                  </span>
                  <span className="text-muted-foreground">
                    {Math.round((count / sessionStats.totalAnswered) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(count / sessionStats.totalAnswered) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {weakQuestions.length > 0 && (
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertCircle size={20} />
              Рекомендации
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">
              Обратите внимание на темы с низкими оценками:
            </p>
            <ul className="space-y-2">
              {weakQuestions.slice(0, 5).map((answer) => (
                <li key={answer.questionNumber} className="flex items-start gap-2 text-sm">
                  <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">{answer.questionTitle}</span>
                    <span className="text-muted-foreground ml-2">({answer.score} балла)</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Overall Progress */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <TrendingUp size={20} />
            Прогресс по должности
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">До сессии:</p>
                <p className="font-semibold">
                  {sessionStats.before.answered}/{sessionStats.before.total} ({sessionStats.before.percent}%)
                </p>
                <p className="text-muted-foreground">
                  Балл: {sessionStats.before.score.toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">После сессии:</p>
                <p className="font-semibold text-primary">
                  {sessionStats.after.answered}/{sessionStats.after.total} ({sessionStats.after.percent}%)
                </p>
                <p className="text-primary">
                  Балл: {sessionStats.after.score.toFixed(1)}
                  {sessionStats.scoreDiff > 0 && (
                    <span className="ml-1">
                      (+{sessionStats.scoreDiff.toFixed(1)} 🎉)
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          variant="outline"
          className="flex-1"
          onClick={() => navigate(`/interview/${positionId}/setup`)}
        >
          <RefreshCw size={20} className="mr-2" />
          Начать новое интервью
        </Button>
        <Button
          size="lg"
          className="flex-1"
          onClick={() => navigate(`/position/${positionId}`)}
        >
          <BookOpen size={20} className="mr-2" />
          Вернуться к обзору
        </Button>
      </div>
    </div>
  );
}
```

---

## Логика выбора вопросов

### Smart Mode (Weighted Randomization)
```typescript
function selectNextQuestionSmart(
  questions: Question[],
  stats: PositionStatistics,
  chapterFilter?: number
): Question {
  // 1. Apply chapter filter
  let pool = chapterFilter
    ? questions.filter(q => q.chapter_number === chapterFilter)
    : questions;

  // 2. Calculate weights
  const weighted = pool.map(q => {
    const stat = findQuestionStat(stats, q.question_number);
    const score = stat?.answerScore ?? 0; // null → 0
    const weight = Math.pow(5 - score, 2); // (5 - score)^2

    return { question: q, weight };
  });

  // 3. Weighted random selection
  const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);

  if (totalWeight === 0) {
    // All questions have score 5 - pick randomly
    return pool[Math.floor(Math.random() * pool.length)];
  }

  let random = Math.random() * totalWeight;
  for (const item of weighted) {
    random -= item.weight;
    if (random <= 0) {
      return item.question;
    }
  }

  return weighted[0].question; // fallback
}
```

### Random Mode
```typescript
function selectNextQuestionRandom(
  questions: Question[],
  chapterFilter?: number
): Question {
  const pool = chapterFilter
    ? questions.filter(q => q.chapter_number === chapterFilter)
    : questions;

  return pool[Math.floor(Math.random() * pool.length)];
}
```

### Unanswered Only Mode
```typescript
function selectNextQuestionUnanswered(
  questions: Question[],
  stats: PositionStatistics,
  chapterFilter?: number
): Question | null {
  let pool = chapterFilter
    ? questions.filter(q => q.chapter_number === chapterFilter)
    : questions;

  // Filter only unanswered
  const unanswered = pool.filter(q => {
    const stat = findQuestionStat(stats, q.question_number);
    return stat?.answerScore === null;
  });

  if (unanswered.length === 0) {
    return null; // No more unanswered questions
  }

  return unanswered[Math.floor(Math.random() * unanswered.length)];
}
```

---

## Session State Management

```typescript
interface InterviewSession {
  positionId: string;
  chapterFilter: number | 'all';
  selectionMode: 'smart' | 'random' | 'unanswered';
  startTime: Date;
  answers: Array<{
    questionNumber: number;
    questionTitle: string;
    score: number;
    timestamp: Date;
  }>;
  isPaused: boolean;
}

// Сохранение в sessionStorage для восстановления при перезагрузке
const SESSION_KEY = 'interview_session';

function saveSession(session: InterviewSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function loadSession(): InterviewSession | null {
  const data = sessionStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
```

---

## Tailwind CSS классы

### Interview Mode Badge
```tsx
<Badge className="
  animate-pulse
  bg-primary/10
  text-primary
  border-primary/20
">
  🎯 Режим интервью
</Badge>
```

### Progress Indicator
```tsx
<div className="
  bg-muted/50
  border-b
  px-4
  py-3
  backdrop-blur
">
  <Progress
    value={percent}
    className="h-2 transition-all duration-500"
  />
</div>
```

### Results Cards
```tsx
/* Success Card */
<Card className="border-success/20 bg-success/5">

/* Warning Card */
<Card className="border-warning/20 bg-warning/5">

/* Primary Card */
<Card className="border-primary/20 bg-primary/5">
```

---

## shadcn/ui Components Used

```bash
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add label
npx shadcn-ui@latest add alert
```

---

## Анимации

### Question transition
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentQuestion.id}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.3 }}
  >
    <QuestionCard question={currentQuestion} />
  </motion.div>
</AnimatePresence>
```

### Results reveal
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  <InterviewResults />
</motion.div>
```

---

**Файлы маршрутов**:
- `/Users/sunshad0w/Work/interviewer/ui-previews/screens/interview-mode.md`
