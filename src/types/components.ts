/**
 * Component Types - Типы для shadcn/ui компонентов и пользовательских компонентов
 * Используйте эти типы для правильной типизации компонентов приложения
 */

import React from 'react'

/**
 * Position Types
 */
export interface Position {
  id: string
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
  totalQuestions: number
  totalChapters: number
  overallScore: number | null
  sourceJsonFile: string
}

/**
 * Chapter Types
 */
export interface Chapter {
  id: string
  title: string
  description?: string
  questionCount: number
  score: number | null
  answeredCount: number
}

/**
 * Question Types
 */
export interface Question {
  id: string
  title: string
  content: string
  answer: string
  answerMarkdown: string
  chapterId: string
  chapterNumber: number
  questionNumber: number
  score: number | null // null = не ответлен, 0-5 = оценка
}

/**
 * Statistics Types
 */
export interface QuestionStatistic {
  questionId: string
  questionTitle: string
  questionNumber: number
  answerScore: number | null // null = не ответлен
}

export interface ChapterStatistic {
  chapterId: string
  chapterTitle: string
  chapterNumber: number
  chapterScore: number | null // Average of answered questions
  answeredCount: number
  totalQuestions: number
  questions: QuestionStatistic[]
}

export interface PositionStatistic {
  position: string
  sourceJsonFile: string
  overallScore: number | null // Average of chapter scores
  statistics: ChapterStatistic[]
}

/**
 * Component Props Types
 */

// Button Props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

// Card Props
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

// Slider Props
export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  min?: number
  max?: number
  step?: number
  value?: number[]
  onValueChange?: (value: number[]) => void
  disabled?: boolean
}

// Badge Props
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

// Progress Props
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

/**
 * Custom Component Props
 */

// PositionCard Props
export interface PositionCardProps {
  position: Position
  statistics: PositionStatistic | null
  onClick: (positionId: string) => void
  className?: string
}

// QuestionView Props
export interface QuestionViewProps {
  question: Question
  currentScore: number | null
  onRate: (score: number) => void
  onNext: () => void
  onPrevious?: () => void
  isLast?: boolean
  isFirst?: boolean
  currentIndex?: number
  totalQuestions?: number
}

// RatingSlider Props
export interface RatingSliderProps {
  value: number | null
  onChange: (value: number) => void
  disabled?: boolean
  labels?: string[]
}

// Statistics Panel Props
export interface StatisticsPanelProps {
  statistics: PositionStatistic
  position: Position
}

// Table of Contents Props
export interface TableOfContentsProps {
  chapters: Chapter[]
  statistics: ChapterStatistic[]
  onSelectQuestion?: (chapterId: string, questionId: string) => void
  selectedQuestion?: { chapterId: string; questionId: string } | null
}

/**
 * Toast Types
 */

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  action?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface ToastActionElement {
  [key: string]: any
}

/**
 * Theme Types
 */

export type Theme = 'light' | 'dark' | 'system'

export interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

/**
 * Interview Mode Types
 */

export interface InterviewSession {
  positionId: string
  chapterId?: string
  questions: Question[]
  currentIndex: number
  answers: Map<string, number> // questionId -> score
  startTime: Date
  endTime?: Date
}

export interface InterviewConfig {
  positionId: string
  mode: 'random' | 'sequential'
  filterChapter?: string
  excludeAnswered?: boolean
}

/**
 * API Response Types (для будущей интеграции с backend)
 */

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  timestamp?: string
}

export interface InterviewGuideResponse extends ApiResponse<InterviewGuide> {}

/**
 * Interview Guide Types (из JSON)
 */

export interface InterviewGuide {
  metadata: GuideMetadata
  chapters: GuideChapter[]
  questions: GuideQuestion[]
  conclusion?: GuideConclusion
}

export interface GuideMetadata {
  createdDate?: string
  targetAudience?: string
  coveredVersions?: string[]
  totalQuestions?: number
  difficulty?: string
  language?: string
  guideDescription?: string
}

export interface GuideChapter {
  chapterTitle?: string
  chapterNumber?: number
  chapterDescription?: string
  subsectionsCount?: number
  subsectionsContentMarkdown?: string
  questionsInChapter?: number
}

export interface GuideQuestion {
  questionTitle?: string
  questionNumber?: number
  chapterNumber?: number
  answerMarkdown?: string
  keyTopicsMarkdown?: string
  recommendationsMarkdown?: string
}

export interface GuideConclusion {
  conclusionText?: string
  nextStepsMarkdown?: string
}

/**
 * Utility Types
 */

export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type AsyncFunction<T> = () => Promise<T>

// Helper type for extracting props from components
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never
