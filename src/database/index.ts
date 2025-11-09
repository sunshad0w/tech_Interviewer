/**
 * Database Module Index
 *
 * Экспорт всех модулей для работы с SQLite
 */

export { sqliteService } from './sqliteService'
export type { Database } from './sqliteService'

export {
  migrateToSQLite,
  isMigrationNeeded,
  rollbackMigration,
  exportDatabaseToFile,
  importDatabaseFromFile,
} from './migration'

export type { MigrationProgress, MigrationResult } from './migration'

export { DATABASE_SCHEMA, DATABASE_TRIGGERS, INTEGRITY_CHECKS } from './schema'
