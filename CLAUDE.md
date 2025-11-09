# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interview Preparation Web Application - a TypeScript-based web app for conducting mock technical interviews. The application loads interview guides from JSON files, displays questions with markdown-formatted answers, and tracks user performance statistics via localStorage.

## Tech Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui + Tailwind CSS
- **State Management**: React Context (for global state, statistics, theme)
- **Markdown Rendering**: react-markdown with react-syntax-highlighter (syntax highlighting required)
- **Language**: Russian (UI and content)
- **Storage**: localStorage (client-side statistics)
- **Routing**: React Router
- **UI/UX**: Responsive design (mobile/tablet/desktop), Dark mode with toggle

## Project Structure

```
interviewer/
├── jsons/              # Symlink to ../interview/jsons (interview JSON files)
├── GUIDE_JSON_SCHEMA.md  # JSON schema for interview guides
├── main_idea.md        # Product requirements (Russian)
└── temp/mds/           # Temporary markdown files (YYYY-MM-DD_HH-mm format)
```

## JSON Data Schema

Interview guides follow the schema defined in `GUIDE_JSON_SCHEMA.md`. Key interfaces:

- **InterviewGuide**: Root structure with metadata, chapters, questions, and conclusion
- **GuideMetadata**: Created date, target audience, versions, difficulty level, etc.
- **Chapter**: Logical sections grouping related questions
- **Question**: Individual questions with markdown answers and best practices
- **Statistics**: Client-side tracking stored in localStorage per position

### Important JSON Fields with Markdown Content

These fields contain markdown and must be rendered with react-markdown:
- `guide_description`
- `chapter_description`
- `answer_markdown`
- `subsection_content_markdown`
- `key_topics_markdown`
- `recommendations_markdown`


## Communication

**Language:** Communicate with the developer in Russian as they are a native Russian speaker.


## Application Architecture

### Main User Flow

1. **Home Screen**: Card-based layout displaying job positions (each card shows position name, brief metadata, and overall statistics)
2. **Position Overview**: Display metadata + table of contents with expandable chapter/question lists + statistics + "Start Interview" button
3. **Interview Mode**: Weighted randomization of questions (can filter by specific chapter or all chapters)
4. **Question View**: Display question → "Show Answer" button → Answer with markdown → Slider input (0-5) → **Auto-advance to next question immediately after rating**
5. **Interview Completion**: Summary screen displaying session statistics (questions answered, average score, progress), then button to return to position overview

### Navigation Requirements

- From question → back to position overview
- From position overview → back to position selection
- Clicking a question in table of contents → shows only that specific question (NOT interview mode)
- "Start Interview" button → launches interview mode with optional chapter filter
- Interview mode → "Exit Interview" button available to end session early
- After interview completion → Summary screen → button to return to position overview

### Statistics System

**Storage**: localStorage, separate entry per position

**Structure**:
```typescript
{
  position: string;
  sourceJsonFile: string;
  overallScore: number;
  statistics: {
    chapterTitle: string;
    chapterNumber: number;
    chapterScore: number;
    answeredCount: number;        // For progress tracking
    totalQuestions: number;       // For progress tracking
    questions: {
      questionTitle: string;
      questionNumber: number;
      answerScore: number | null; // null = not answered yet, 0-5 = user rating
    }[]
  }[]
}
```

**Initialization**: On first load of a position, initialize all questions with `answerScore: null` (NOT 0)

**Distinguishing "Not Answered" vs "Rated as 0"**:
- `null` = Question never answered
- `0` = User explicitly rated their answer as 0 (no knowledge)
- Users can re-rate questions; new rating overwrites previous one

**Score Calculation**:
- Question score: User input (0 = no knowledge, 5 = complete answer)
- Chapter score: Average of all answered questions (ignore null values)
- Position score: Average of all chapter scores (ignore chapters with no answers)
- Progress: `answeredCount / totalQuestions` (percentage)

**Reset Functionality**:
- Reset entire position statistics (all chapters and questions)
- Reset individual chapter statistics (all questions within that chapter)

## Development Commands

### Project Initialization

```bash
# Initialize Vite project with React + TypeScript
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn/ui (follow prompts for setup)
npx shadcn-ui@latest init

# Install additional dependencies
npm install react-router-dom
npm install react-markdown react-syntax-highlighter
npm install -D @types/react-syntax-highlighter

# Optional: State management
npm install zustand  # or jotai, or use React Context
```

### Development Commands
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check  # (add to package.json if needed)

# Linting
npm run lint
```

### Adding shadcn/ui Components

```bash
# Add specific components as needed
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add dialog

# Components are copied to src/components/ui/ for full control
```

## Key Implementation Notes

### Markdown Rendering
- Use `react-markdown` component for all markdown fields from JSON
- **REQUIRED**: Syntax highlighting for code blocks using `react-syntax-highlighter`
- Support tables, lists, and emojis in markdown content
- Ensure proper rendering in both light and dark themes

### UI Components (shadcn/ui + Tailwind)
- shadcn/ui components are copied to `src/components/ui/` (not imported as library)
- Full control over styling and behavior
- Dark mode managed via Tailwind's `dark:` classes and `next-themes` or custom context
- Use Tailwind utility classes for responsive design

**Key Components Needed**:
- **Button**: Actions, navigation
- **Card**: Position cards, question containers
- **Slider**: Rating input (0-5 scale)
- **Accordion**: Expandable chapter lists in table of contents
- **Dialog**: Reset confirmation modals
- **Dropdown Menu**: Chapter filter selection

### State Management
- **Use React Context** for global state (selected position, statistics, theme)
- localStorage operations should be abstracted into a dedicated service/hook
- Create separate contexts for:
  - Statistics/Position data
  - Theme (light/dark mode)
  - Interview session state (current question, mode, filter)

### TypeScript Types
- Generate TypeScript interfaces based on `GUIDE_JSON_SCHEMA.md`
- Ensure strict typing for JSON imports and statistics structure
- Use `satisfies` operator for JSON validation where appropriate

### File Naming Convention for Temp Files
When creating markdown documentation files, save them in `temp/mds/` with format:
```
[NAME]_YYYY-MM-DD_HH-mm.md
```
This allows tracking file freshness and relevance to current project state.

## Data Sources

- **JSON Files**: Located in `jsons/` (symlinked to `../interview/jsons`)
- **Schema Reference**: `GUIDE_JSON_SCHEMA.md` contains complete TypeScript interface definitions
- **Product Requirements**: `main_idea.md` (in Russian) contains detailed functional requirements

## UI/UX Considerations

### Home Screen (Position Selection)
- **Layout**: Card-based grid
- **Card Content**: Position name, brief info (difficulty, total questions), overall score, progress percentage
- **Responsive**: Adjust grid columns for mobile/tablet/desktop

### Position Overview Screen
**Display Metadata**:
- Target audience (целевая аудитория)
- Covered versions (охваченные версии)
- Total questions and chapters
- Difficulty level
- `guide_description` (markdown rendered)

**Table of Contents**:
- Expandable/collapsible chapter list
- Each chapter shows: title, question count, chapter score, progress (X/Y answered)
- Expand chapter to see individual questions
- Each question shows: title, individual score (or "не отвечено" if null)
- Click question → navigate to single question view (NOT interview mode)

**Actions**:
- "Start Interview" button with optional chapter filter dropdown
- Reset statistics options:
  - Reset entire position (with confirmation dialog)
  - Reset individual chapter (with confirmation dialog)
- Back to position selection

### Rating Interface
- **UI Element**: Slider (range input 0-5)
- **Labels**:
  - 0: Совсем не знает ответ
  - 1-2: Частичное понимание
  - 3-4: Хорошее знание
  - 5: Полный ответ
- **Behavior**: After rating submitted → **immediately auto-advance** to next question (no delay, no button)

### Interview Mode Details

**Question Selection Algorithm (Weighted Randomization)**:
When starting interview mode:
1. Apply chapter filter if selected (specific chapter or all chapters)
2. Calculate weight for each question: `weight = (5 - score)^2`
   - `null` (not answered) treated as score 0 → weight = 25
   - score 0 → weight = 25
   - score 1 → weight = 16
   - score 2 → weight = 9
   - score 3 → weight = 4
   - score 4 → weight = 1
   - score 5 → weight = 0 (effectively excluded unless all questions are rated 5)
3. Select randomly using weights (higher weight = higher probability)
4. Present one question at a time

**Interview Session Flow**:
1. User clicks "Start Interview" with optional chapter filter
2. Questions presented one at a time with weighted randomization
3. User answers → sees answer → rates (0-5) → **auto-advance** to next question
4. "Exit Interview" button available at all times to end session early
5. When finished → **Summary Screen** displays:
   - Total questions answered in this session
   - Average score for this session
   - Updated overall position statistics
   - Progress update (X/Y questions answered overall)
   - Button: "Return to Position Overview"

### Theme Support
- Light mode and dark mode toggle (use Tailwind's dark mode)
- Save theme preference in localStorage
- Ensure markdown rendering (especially code blocks) looks good in both themes
- Use `next-themes` library or custom context for theme management

**Tailwind Dark Mode Setup**:
```typescript
// tailwind.config.js
export default {
  darkMode: 'class', // Use class-based dark mode
  // ... rest of config
}

// Theme toggle implementation
const { theme, setTheme } = useTheme();
<Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  Toggle Theme
</Button>
```

## Future Considerations

- Multi-language support (i18n) may be added later
- Export functionality for statistics
- Progress tracking and learning paths
- Spaced repetition algorithm for question scheduling
