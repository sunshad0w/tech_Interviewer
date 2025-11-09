import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import MarkdownRenderer from './MarkdownRenderer'
import type { Question } from '@/types'

/**
 * Props интерфейс для QuestionDisplay компонента
 */
interface QuestionDisplayProps {
  /** Данные вопроса */
  question: Question
  /** Номер главы */
  chapterNumber: number
  /** Показывать ли ответ сразу */
  showAnswer?: boolean
  /** Callback при показе ответа */
  onShowAnswer?: () => void
  /** Callback при изменении видимости ответа */
  onAnswerVisibilityChange?: (isVisible: boolean) => void
  /** Функция для рендера markdown (будет добавлена позже) */
  renderAnswer?: (markdown: string) => React.ReactNode
  /** Дополнительные CSS классы */
  className?: string
}

/**
 * Компонент отображения вопроса с ответом
 *
 * Отображает:
 * - Номер вопроса (глава.вопрос)
 * - Текст вопроса
 * - Кнопку "Показать ответ"
 * - Ответ в markdown формате
 * - Подсекции ответа (если есть)
 * - Best Practices (если есть)
 * - Теги и уровень сложности
 *
 * @example
 * ```tsx
 * <QuestionDisplay
 *   question={currentQuestion}
 *   chapterNumber={1}
 *   onShowAnswer={() => console.log('Answer shown')}
 *   renderAnswer={(md) => <ReactMarkdown>{md}</ReactMarkdown>}
 * />
 * ```
 */
export default function QuestionDisplay({
  question,
  chapterNumber,
  showAnswer = false,
  onShowAnswer,
  onAnswerVisibilityChange,
  renderAnswer,
  className,
}: QuestionDisplayProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(showAnswer)

  // Handler для показа ответа
  const handleShowAnswer = () => {
    setIsAnswerVisible(true)
    onShowAnswer?.()
    onAnswerVisibilityChange?.(true)
  }

  // Формируем полный номер вопроса
  const fullQuestionNumber = `${chapterNumber}.${question.question_number_in_chapter}`

  return (
    <div className={cn('space-y-4', className)}>
      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="font-mono">
                  Вопрос {fullQuestionNumber}
                </Badge>

                {question.difficulty && (
                  <Badge variant="secondary" className="text-xs">
                    {question.difficulty}
                  </Badge>
                )}
              </div>

              <CardTitle className="text-xl md:text-2xl">
                {question.question_title}
              </CardTitle>
            </div>
          </div>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {question.tags.map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Show Answer Button or Answer Content */}
      {!isAnswerVisible ? (
        <Button
          onClick={handleShowAnswer}
          className="w-full"
          size="lg"
        >
          <span className="mr-2">👁️</span>
          Показать ответ
        </Button>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="shrink-0">💡</span>
              Ответ
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Main Answer */}
            {renderAnswer ? (
              renderAnswer(question.answer_markdown)
            ) : (
              <MarkdownRenderer content={question.answer_markdown} />
            )}

            {/* Subsections */}
            {question.answer_subsections && question.answer_subsections.length > 0 && (
              <div className="space-y-4">
                <Separator />
                {question.answer_subsections.map((subsection, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <span className="text-primary">▸</span>
                      {subsection.subsection_title}
                    </h4>
                    {subsection.subsection_type && (
                      <Badge variant="outline" className="text-xs">
                        {subsection.subsection_type}
                      </Badge>
                    )}
                    <div className="pl-4 border-l-2 border-muted">
                      {renderAnswer ? (
                        renderAnswer(subsection.subsection_content_markdown)
                      ) : (
                        <MarkdownRenderer content={subsection.subsection_content_markdown} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Best Practices */}
            {question.best_practices && question.best_practices.length > 0 && (
              <div className="space-y-3">
                <Separator />
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="shrink-0">✨</span>
                    Best Practices
                  </h4>
                  <ul className="space-y-2">
                    {question.best_practices.map((practice, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary shrink-0 mt-1">•</span>
                        <div className="flex-1">
                          {renderAnswer ? (
                            renderAnswer(practice)
                          ) : (
                            <MarkdownRenderer content={practice} />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
