import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  vscDarkPlus,
  vs,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from '@/contexts'
import type { Components } from 'react-markdown'

/**
 * Props for the MarkdownRenderer component
 */
interface MarkdownRendererProps {
  /** Markdown content to render */
  content: string
  /** Additional CSS classes to apply to the container */
  className?: string
}

/**
 * MarkdownRenderer Component
 *
 * Renders markdown content with syntax highlighting, tables, lists, and emoji support.
 * Automatically adapts code block styling based on the current theme (light/dark).
 *
 * @param props - Component properties
 * @returns Rendered markdown content
 *
 * @example
 * ```tsx
 * <MarkdownRenderer content={question.answer_markdown} />
 * ```
 *
 * @example
 * ```tsx
 * <MarkdownRenderer
 *   content={chapter.chapter_description}
 *   className="mt-4"
 * />
 * ```
 */
export default function MarkdownRenderer({
  content,
  className = '',
}: MarkdownRendererProps) {
  const { theme } = useTheme()

  /**
   * Custom component overrides for react-markdown
   * Provides styling for all markdown elements with theme support
   */
  const components: Components = {
    /**
     * Code blocks with syntax highlighting
     * Supports both inline code and fenced code blocks
     */
    code(props) {
      const { node, inline, className, children, ...rest } = props as {
        node?: unknown
        inline?: boolean
        className?: string
        children?: React.ReactNode
      }
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''

      return !inline && language ? (
        <SyntaxHighlighter
          style={theme === 'dark' ? vscDarkPlus : vs}
          language={language}
          PreTag="div"
          customStyle={{
            borderRadius: '0.5rem',
            margin: '1rem 0',
          } as React.CSSProperties}
          {...rest}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : inline ? (
        <code
          className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-sm border border-border"
          {...rest}
        >
          {children}
        </code>
      ) : (
        <code
          className="block px-4 py-3 rounded bg-muted text-foreground font-mono text-sm border border-border overflow-x-auto"
          {...rest}
        >
          {children}
        </code>
      )
    },

    /**
     * Table wrapper with horizontal scroll support
     */
    table({ children }) {
      return (
        <div className="overflow-x-auto my-4 rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border">
            {children}
          </table>
        </div>
      )
    },

    /**
     * Table header with background styling
     */
    thead({ children }) {
      return (
        <thead className="bg-muted/50">
          {children}
        </thead>
      )
    },

    /**
     * Table header cell
     */
    th({ children }) {
      return (
        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
          {children}
        </th>
      )
    },

    /**
     * Table body
     */
    tbody({ children }) {
      return (
        <tbody className="divide-y divide-border bg-background">
          {children}
        </tbody>
      )
    },

    /**
     * Table data cell
     */
    td({ children }) {
      return (
        <td className="px-4 py-3 text-sm text-foreground">
          {children}
        </td>
      )
    },

    /**
     * Level 1 heading
     */
    h1({ children }) {
      return (
        <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground scroll-m-20">
          {children}
        </h1>
      )
    },

    /**
     * Level 2 heading
     */
    h2({ children }) {
      return (
        <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground scroll-m-20 border-b border-border pb-2">
          {children}
        </h2>
      )
    },

    /**
     * Level 3 heading
     */
    h3({ children }) {
      return (
        <h3 className="text-xl font-semibold mt-5 mb-2 text-foreground scroll-m-20">
          {children}
        </h3>
      )
    },

    /**
     * Level 4 heading
     */
    h4({ children }) {
      return (
        <h4 className="text-lg font-semibold mt-4 mb-2 text-foreground scroll-m-20">
          {children}
        </h4>
      )
    },

    /**
     * Level 5 heading
     */
    h5({ children }) {
      return (
        <h5 className="text-base font-semibold mt-3 mb-2 text-foreground scroll-m-20">
          {children}
        </h5>
      )
    },

    /**
     * Level 6 heading
     */
    h6({ children }) {
      return (
        <h6 className="text-sm font-semibold mt-3 mb-2 text-foreground scroll-m-20">
          {children}
        </h6>
      )
    },

    /**
     * Unordered list with proper spacing
     */
    ul({ children }) {
      return (
        <ul className="list-disc list-outside ml-6 space-y-2 my-4 text-foreground">
          {children}
        </ul>
      )
    },

    /**
     * Ordered list with proper spacing
     */
    ol({ children }) {
      return (
        <ol className="list-decimal list-outside ml-6 space-y-2 my-4 text-foreground">
          {children}
        </ol>
      )
    },

    /**
     * List item
     */
    li({ children }) {
      return (
        <li className="text-foreground leading-relaxed">
          {children}
        </li>
      )
    },

    /**
     * Blockquote with accent border
     */
    blockquote({ children }) {
      return (
        <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 italic bg-muted/30 rounded-r">
          <div className="text-muted-foreground">
            {children}
          </div>
        </blockquote>
      )
    },

    /**
     * Links with external target
     */
    a({ children, href }) {
      return (
        <a
          href={href}
          className="text-primary hover:underline font-medium transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    },

    /**
     * Paragraphs with proper spacing
     */
    p({ children }) {
      return (
        <p className="my-3 text-foreground leading-relaxed">
          {children}
        </p>
      )
    },

    /**
     * Horizontal rule
     */
    hr() {
      return <hr className="my-8 border-border" />
    },

    /**
     * Strong (bold) text
     */
    strong({ children }) {
      return (
        <strong className="font-semibold text-foreground">
          {children}
        </strong>
      )
    },

    /**
     * Emphasis (italic) text
     */
    em({ children }) {
      return (
        <em className="italic text-foreground">
          {children}
        </em>
      )
    },

    /**
     * Deleted (strikethrough) text
     */
    del({ children }) {
      return (
        <del className="line-through text-muted-foreground">
          {children}
        </del>
      )
    },

    /**
     * Images with responsive sizing
     */
    img({ src, alt }) {
      return (
        <img
          src={src}
          alt={alt || ''}
          className="max-w-full h-auto rounded-lg my-4 border border-border"
          loading="lazy"
        />
      )
    },
  }

  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm, remarkBreaks]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
