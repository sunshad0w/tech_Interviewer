/**
 * Тестовый скрипт для проверки загрузки guides
 * Запустить: npx tsx test-guides-loading.ts
 */

import { loadInterviewGuide, getAllGuides } from './src/services/jsonLoader'

async function testGuidesLoading() {
  console.log('🔍 Тестирование загрузки guides...\n')

  try {
    // Получаем список всех guides
    const filenames = getAllGuides()
    console.log(`📚 Найдено ${filenames.length} guides:`)
    filenames.forEach((filename, index) => {
      console.log(`  ${index + 1}. ${filename}`)
    })
    console.log()

    // Загружаем каждый guide
    for (const filename of filenames) {
      try {
        console.log(`⏳ Загрузка: ${filename}`)
        const guide = await loadInterviewGuide(filename)

        console.log(`  ✅ Успешно загружен`)
        console.log(`     Название: ${guide.guide_name}`)
        console.log(`     Вопросов: ${guide.guide_metadata.total_questions}`)
        console.log(`     Глав: ${guide.guide_metadata.total_chapters}`)
        console.log(`     Сложность: ${guide.guide_metadata.difficulty_level || 'не указана'}`)
        console.log()
      } catch (error) {
        console.error(`  ❌ Ошибка при загрузке ${filename}:`, error)
        console.log()
      }
    }

    console.log('✅ Тестирование завершено успешно!')
  } catch (error) {
    console.error('❌ Критическая ошибка:', error)
    process.exit(1)
  }
}

testGuidesLoading()
