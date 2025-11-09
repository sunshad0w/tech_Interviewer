/**
 * SQLite Database Schema
 *
 * Полная схема базы данных для Interview Preparation App
 */

export const DATABASE_SCHEMA = `
-- ============================================================================
-- Table: guides
-- Основная информация о позициях (interview guides)
-- ============================================================================
CREATE TABLE IF NOT EXISTS guides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guide_name TEXT NOT NULL UNIQUE,
    guide_description TEXT,  -- markdown
    source_json_file TEXT,   -- для обратной совместимости
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_guides_name ON guides(guide_name);

-- ============================================================================
-- Table: guide_metadata
-- Метаданные позиций
-- ============================================================================
CREATE TABLE IF NOT EXISTS guide_metadata (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guide_id INTEGER NOT NULL,
    created_date TEXT,
    target_audience TEXT,
    covered_versions TEXT,
    difficulty_level TEXT,
    total_questions INTEGER NOT NULL DEFAULT 0,
    total_chapters INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (guide_id) REFERENCES guides(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_metadata_guide ON guide_metadata(guide_id);
CREATE INDEX IF NOT EXISTS idx_metadata_difficulty ON guide_metadata(difficulty_level);

-- ============================================================================
-- Table: chapters
-- Главы внутри позиций
-- ============================================================================
CREATE TABLE IF NOT EXISTS chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guide_id INTEGER NOT NULL,
    chapter_number INTEGER NOT NULL,
    chapter_title TEXT NOT NULL,
    chapter_description TEXT,  -- markdown
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (guide_id) REFERENCES guides(id) ON DELETE CASCADE,
    UNIQUE(guide_id, chapter_number)
);

CREATE INDEX IF NOT EXISTS idx_chapters_guide ON chapters(guide_id);
CREATE INDEX IF NOT EXISTS idx_chapters_number ON chapters(guide_id, chapter_number);

-- ============================================================================
-- Table: questions
-- Вопросы внутри глав
-- ============================================================================
CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chapter_id INTEGER NOT NULL,
    question_number INTEGER NOT NULL,
    question_number_in_chapter INTEGER NOT NULL,
    question_title TEXT NOT NULL,
    answer_markdown TEXT,  -- основной ответ
    best_practices_markdown TEXT,  -- лучшие практики
    common_mistakes_markdown TEXT,  -- частые ошибки
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
    UNIQUE(chapter_id, question_number)
);

CREATE INDEX IF NOT EXISTS idx_questions_chapter ON questions(chapter_id);
CREATE INDEX IF NOT EXISTS idx_questions_number ON questions(question_number);
CREATE INDEX IF NOT EXISTS idx_questions_title ON questions(question_title);

-- ============================================================================
-- Table: question_subsections
-- Подсекции внутри вопросов (опционально)
-- ============================================================================
CREATE TABLE IF NOT EXISTS question_subsections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    subsection_order INTEGER NOT NULL,
    subsection_title TEXT NOT NULL,
    subsection_content_markdown TEXT,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    UNIQUE(question_id, subsection_order)
);

CREATE INDEX IF NOT EXISTS idx_subsections_question ON question_subsections(question_id);

-- ============================================================================
-- Table: user_statistics
-- Общая статистика пользователя по позициям
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_statistics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guide_id INTEGER NOT NULL,
    overall_score REAL DEFAULT 0,  -- средний балл по позиции
    total_answered INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (guide_id) REFERENCES guides(id) ON DELETE CASCADE,
    UNIQUE(guide_id)
);

CREATE INDEX IF NOT EXISTS idx_user_stats_guide ON user_statistics(guide_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_activity ON user_statistics(last_activity);

-- ============================================================================
-- Table: chapter_statistics
-- Статистика по главам
-- ============================================================================
CREATE TABLE IF NOT EXISTS chapter_statistics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chapter_id INTEGER NOT NULL,
    chapter_score REAL DEFAULT 0,
    answered_count INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
    UNIQUE(chapter_id)
);

CREATE INDEX IF NOT EXISTS idx_chapter_stats_chapter ON chapter_statistics(chapter_id);

-- ============================================================================
-- Table: question_statistics
-- Статистика по отдельным вопросам
-- ============================================================================
CREATE TABLE IF NOT EXISTS question_statistics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    answer_score INTEGER,  -- NULL = не отвечено, 0-5 = оценка
    answered_at TIMESTAMP,
    attempts_count INTEGER DEFAULT 0,  -- количество попыток
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    UNIQUE(question_id)
);

CREATE INDEX IF NOT EXISTS idx_question_stats_question ON question_statistics(question_id);
CREATE INDEX IF NOT EXISTS idx_question_stats_score ON question_statistics(answer_score);
`

/**
 * Триггеры для автоматического обновления статистики
 */
export const DATABASE_TRIGGERS = `
-- ============================================================================
-- Trigger: Обновление overall_score при изменении question_statistics
-- ============================================================================
CREATE TRIGGER IF NOT EXISTS update_chapter_score_on_question_update
AFTER UPDATE ON question_statistics
FOR EACH ROW
BEGIN
    UPDATE chapter_statistics
    SET
        chapter_score = (
            SELECT AVG(qs.answer_score)
            FROM question_statistics qs
            JOIN questions q ON qs.question_id = q.id
            WHERE q.chapter_id = (
                SELECT chapter_id FROM questions WHERE id = NEW.question_id
            ) AND qs.answer_score IS NOT NULL
        ),
        answered_count = (
            SELECT COUNT(*)
            FROM question_statistics qs
            JOIN questions q ON qs.question_id = q.id
            WHERE q.chapter_id = (
                SELECT chapter_id FROM questions WHERE id = NEW.question_id
            ) AND qs.answer_score IS NOT NULL
        ),
        last_activity = CURRENT_TIMESTAMP
    WHERE chapter_id = (SELECT chapter_id FROM questions WHERE id = NEW.question_id);

    -- Обновляем user_statistics
    UPDATE user_statistics
    SET
        overall_score = (
            SELECT AVG(cs.chapter_score)
            FROM chapter_statistics cs
            JOIN chapters c ON cs.chapter_id = c.id
            WHERE c.guide_id = (
                SELECT guide_id FROM chapters WHERE id = (
                    SELECT chapter_id FROM questions WHERE id = NEW.question_id
                )
            ) AND cs.answered_count > 0
        ),
        total_answered = (
            SELECT COUNT(*)
            FROM question_statistics qs
            JOIN questions q ON qs.question_id = q.id
            JOIN chapters c ON q.chapter_id = c.id
            WHERE c.guide_id = (
                SELECT guide_id FROM chapters WHERE id = (
                    SELECT chapter_id FROM questions WHERE id = NEW.question_id
                )
            ) AND qs.answer_score IS NOT NULL
        ),
        last_activity = CURRENT_TIMESTAMP
    WHERE guide_id = (
        SELECT guide_id FROM chapters WHERE id = (
            SELECT chapter_id FROM questions WHERE id = NEW.question_id
        )
    );
END;

-- ============================================================================
-- Trigger: Обновление updated_at в guides при изменении
-- ============================================================================
CREATE TRIGGER IF NOT EXISTS update_guides_timestamp
AFTER UPDATE ON guides
FOR EACH ROW
BEGIN
    UPDATE guides SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
`

/**
 * Утилитарные запросы для проверки целостности данных
 */
export const INTEGRITY_CHECKS = `
-- Проверка несоответствия total_questions в metadata и фактического количества
SELECT
    g.guide_name,
    gm.total_questions as metadata_count,
    COUNT(q.id) as actual_count
FROM guides g
JOIN guide_metadata gm ON g.id = gm.guide_id
LEFT JOIN chapters c ON g.id = c.guide_id
LEFT JOIN questions q ON c.id = q.chapter_id
GROUP BY g.id
HAVING metadata_count != actual_count;

-- Проверка orphaned records (вопросы без глав, главы без guides)
SELECT 'orphaned_chapters' as issue_type, COUNT(*) as count
FROM chapters c
LEFT JOIN guides g ON c.guide_id = g.id
WHERE g.id IS NULL
UNION ALL
SELECT 'orphaned_questions' as issue_type, COUNT(*) as count
FROM questions q
LEFT JOIN chapters c ON q.chapter_id = c.id
WHERE c.id IS NULL;
`
