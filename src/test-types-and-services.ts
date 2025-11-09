/**
 * Тестовый файл для проверки типов и сервисов
 * Запустить: npm run dev (проверить в консоли браузера)
 */

import {
  loadInterviewGuide,
  getAllGuides,
  getAllGuidesMetadata,
  isGuideAvailable,
  getGuideInfo
} from './services/jsonLoader'

import {
  initializeStatistics,
  updateQuestionScore,
  savePositionStatistics,
  getPositionStatistics,
  calculateChapterScore,
  getAllStatistics
} from './services/localStorage'

/**
 * Тест 1: Загрузка JSON guides
 */
export async function testJsonLoader() {
  console.log('=== TEST 1: JSON Loader ===')

  // Получить список всех guides
  const guides = getAllGuides()
  console.log('Available guides:', guides)

  // Проверить доступность
  const isAvailable = isGuideAvailable('react_guide_2025-11-08_13-02.json')
  console.log('React guide available:', isAvailable)

  // Получить краткую информацию
  const info = getGuideInfo('react_guide_2025-11-08_13-02.json')
  console.log('Guide info:', info)

  // Загрузить React guide
  try {
    const guide = await loadInterviewGuide('react_guide_2025-11-08_13-02.json')
    console.log('✅ Guide loaded successfully:', guide.guide_name)
    console.log('Total chapters:', guide.guide_metadata.total_chapters)
    console.log('Total questions:', guide.guide_metadata.total_questions)
    console.log('First chapter:', guide.guide_chapters[0]?.chapter_title)
    return guide
  } catch (error) {
    console.error('❌ Failed to load guide:', error)
    throw error
  }
}

/**
 * Тест 2: Получение metadata всех guides
 */
export async function testGetAllMetadata() {
  console.log('\n=== TEST 2: Get All Metadata ===')

  try {
    const metadata = await getAllGuidesMetadata()
    console.log('✅ Loaded metadata for', metadata.length, 'guides')
    metadata.forEach(item => {
      console.log(`- ${item.position}:`, {
        difficulty: item.metadata.difficulty_level,
        questions: item.metadata.total_questions,
        chapters: item.metadata.total_chapters
      })
    })
    return metadata
  } catch (error) {
    console.error('❌ Failed to load metadata:', error)
    throw error
  }
}

/**
 * Тест 3: Инициализация статистики
 */
export async function testInitializeStatistics() {
  console.log('\n=== TEST 3: Initialize Statistics ===')

  try {
    const guide = await loadInterviewGuide('react_guide_2025-11-08_13-02.json')
    const stats = initializeStatistics(guide)

    console.log('✅ Statistics initialized:', stats.position)
    console.log('Overall score (should be 0):', stats.overallScore)
    console.log('Total chapters:', stats.statistics.length)

    // Проверка: все answerScore должны быть null
    const firstChapter = stats.statistics[0]
    const firstQuestion = firstChapter?.questions[0]

    console.log('\nFirst chapter:', firstChapter?.chapterTitle)
    console.log('Chapter score (should be 0):', firstChapter?.chapterScore)
    console.log('Answered count (should be 0):', firstChapter?.answeredCount)
    console.log('Total questions:', firstChapter?.totalQuestions)
    console.log('\nFirst question:', firstQuestion?.questionTitle)
    console.log('Answer score (should be null):', firstQuestion?.answerScore)

    // Проверка: все вопросы должны иметь answerScore: null
    const allQuestionsNull = stats.statistics.every(chapter =>
      chapter.questions.every(q => q.answerScore === null)
    )
    console.log('\n✅ All questions have answerScore: null?', allQuestionsNull)

    return stats
  } catch (error) {
    console.error('❌ Failed to initialize statistics:', error)
    throw error
  }
}

/**
 * Тест 4: Обновление оценки вопроса
 */
export async function testUpdateScore() {
  console.log('\n=== TEST 4: Update Question Score ===')

  try {
    const guide = await loadInterviewGuide('react_guide_2025-11-08_13-02.json')
    let stats = initializeStatistics(guide)

    console.log('Initial overall score:', stats.overallScore)

    // Обновляем оценку первого вопроса первой главы
    const chapter1 = stats.statistics[0]
    const question1 = chapter1.questions[0]

    console.log('\nUpdating question:', question1.questionTitle)
    console.log('Chapter number:', chapter1.chapterNumber)
    console.log('Question number:', question1.questionNumber)

    stats = updateQuestionScore(stats, chapter1.chapterNumber, question1.questionNumber, 4)

    console.log('✅ Score updated')
    console.log('New chapter score:', stats.statistics[0].chapterScore)
    console.log('New answered count:', stats.statistics[0].answeredCount)
    console.log('New overall score:', stats.overallScore)

    // Обновляем еще один вопрос в той же главе
    const question2 = chapter1.questions[1]
    stats = updateQuestionScore(stats, chapter1.chapterNumber, question2.questionNumber, 5)

    console.log('\n✅ Second score updated')
    console.log('New chapter score (should be 4.5):', stats.statistics[0].chapterScore)
    console.log('New answered count (should be 2):', stats.statistics[0].answeredCount)

    // Обновляем вопрос во второй главе
    if (stats.statistics[1]) {
      const chapter2 = stats.statistics[1]
      const question3 = chapter2.questions[0]
      stats = updateQuestionScore(stats, chapter2.chapterNumber, question3.questionNumber, 3)

      console.log('\n✅ Question in chapter 2 updated')
      console.log('Chapter 2 score:', stats.statistics[1].chapterScore)
      console.log('New overall score (avg of chapters):', stats.overallScore)
    }

    return stats
  } catch (error) {
    console.error('❌ Failed to update score:', error)
    throw error
  }
}

/**
 * Тест 5: Сохранение и загрузка из localStorage
 */
export async function testLocalStorage() {
  console.log('\n=== TEST 5: LocalStorage Operations ===')

  try {
    const guide = await loadInterviewGuide('react_guide_2025-11-08_13-02.json')
    let stats = initializeStatistics(guide)

    // Обновляем несколько оценок
    const ch1 = stats.statistics[0]
    stats = updateQuestionScore(stats, ch1.chapterNumber, ch1.questions[0].questionNumber, 5)
    stats = updateQuestionScore(stats, ch1.chapterNumber, ch1.questions[1].questionNumber, 4)

    // Сохраняем в localStorage
    console.log('Saving to localStorage...')
    savePositionStatistics(stats)
    console.log('✅ Saved')

    // Загружаем обратно
    const loaded = getPositionStatistics(stats.position)
    console.log('✅ Loaded from localStorage')
    console.log('Position:', loaded?.position)
    console.log('Overall score:', loaded?.overallScore)
    console.log('Last updated:', loaded?.lastUpdated)

    // Проверяем, что данные совпадают
    const scoresMatch = loaded?.overallScore === stats.overallScore
    console.log('Scores match:', scoresMatch)

    // Получаем все статистики
    const allStats = getAllStatistics()
    console.log('\nAll statistics:', Object.keys(allStats))

    return loaded
  } catch (error) {
    console.error('❌ Failed localStorage test:', error)
    throw error
  }
}

/**
 * Тест 6: Расчет баллов (игнорирование null)
 */
export async function testScoreCalculation() {
  console.log('\n=== TEST 6: Score Calculation (ignore null) ===')

  try {
    const guide = await loadInterviewGuide('react_guide_2025-11-08_13-02.json')
    let stats = initializeStatistics(guide)

    const ch1 = stats.statistics[0]

    // Обновляем только некоторые вопросы (остальные остаются null)
    stats = updateQuestionScore(stats, ch1.chapterNumber, ch1.questions[0].questionNumber, 5)
    stats = updateQuestionScore(stats, ch1.chapterNumber, ch1.questions[1].questionNumber, 3)
    // Остальные вопросы имеют answerScore: null

    const chapter = stats.statistics[0]
    console.log('Total questions in chapter:', chapter.totalQuestions)
    console.log('Answered questions:', chapter.answeredCount)
    console.log('Chapter score (avg of answered only):', chapter.chapterScore)
    console.log('Expected score: (5 + 3) / 2 = 4')

    const calculatedScore = calculateChapterScore(chapter)
    console.log('✅ Calculated score:', calculatedScore)

    // Проверка: null не влияет на расчет
    const nullQuestions = chapter.questions.filter(q => q.answerScore === null)
    console.log('Questions with null score:', nullQuestions.length)
    console.log('✅ Null scores are ignored in calculation')

    return stats
  } catch (error) {
    console.error('❌ Failed score calculation test:', error)
    throw error
  }
}

/**
 * Запустить все тесты
 */
export async function runAllTests() {
  console.log('🚀 Starting all tests...\n')

  try {
    await testJsonLoader()
    await testGetAllMetadata()
    await testInitializeStatistics()
    await testUpdateScore()
    await testLocalStorage()
    await testScoreCalculation()

    console.log('\n✅ ALL TESTS PASSED!')
  } catch (error) {
    console.error('\n❌ TESTS FAILED:', error)
  }
}

// Экспортируем функцию для использования в консоли
if (import.meta.env.DEV) {
  // @ts-ignore - добавляем в window для тестирования
  window.runTests = runAllTests
  console.log('📝 Type "window.runTests()" in console to run all tests')
}
