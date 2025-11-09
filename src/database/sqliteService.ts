/**
 * SQLite Service for Browser
 *
 * Manages SQLite database in the browser using sql.js and IndexedDB for persistence
 */

import initSqlJs, { Database, SqlJsStatic } from 'sql.js'
import { DATABASE_SCHEMA, DATABASE_TRIGGERS } from './schema'

/**
 * IndexedDB configuration
 */
const DB_NAME = 'InterviewPreparationDB'
const DB_VERSION = 1
const STORE_NAME = 'sqliteData'
const DATA_KEY = 'database'

/**
 * SQLite Service Class
 * Singleton pattern for managing database connection
 */
class SQLiteService {
  private static instance: SQLiteService
  private sql: SqlJsStatic | null = null
  private db: Database | null = null
  private initialized = false

  private constructor() {}

  /**
   * Get singleton instance
   */
  public static getInstance(): SQLiteService {
    if (!SQLiteService.instance) {
      SQLiteService.instance = new SQLiteService()
    }
    return SQLiteService.instance
  }

  /**
   * Initialize sql.js and load database from IndexedDB (or create new)
   */
  public async initialize(): Promise<void> {
    if (this.initialized) {
      return
    }

    try {
      // Initialize sql.js
      this.sql = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      })

      // Try to load existing database from IndexedDB
      const savedData = await this.loadFromIndexedDB()

      if (savedData) {
        // Load existing database
        this.db = new this.sql.Database(savedData)
        console.log('✅ Loaded existing database from IndexedDB')
      } else {
        // Create new database
        this.db = new this.sql.Database()
        console.log('✅ Created new database')

        // Run schema creation
        this.db.run(DATABASE_SCHEMA)
        this.db.run(DATABASE_TRIGGERS)

        // Save to IndexedDB
        await this.saveToIndexedDB()
        console.log('✅ Database schema created and saved')
      }

      this.initialized = true
    } catch (error) {
      console.error('❌ Failed to initialize SQLite:', error)
      throw new Error(`SQLite initialization failed: ${error}`)
    }
  }

  /**
   * Get database instance (throws if not initialized)
   */
  public getDB(): Database {
    if (!this.db) {
      throw new Error('Database not initialized. Call initialize() first.')
    }
    return this.db
  }

  /**
   * Check if database is initialized
   */
  public isInitialized(): boolean {
    return this.initialized
  }

  /**
   * Execute SQL query
   * @param sql SQL query string
   * @param params Query parameters
   * @returns Query results
   */
  public exec(sql: string, params?: unknown[]): unknown[] {
    const db = this.getDB()
    const stmt = db.prepare(sql)

    if (params) {
      stmt.bind(params)
    }

    const results: unknown[] = []
    while (stmt.step()) {
      results.push(stmt.getAsObject())
    }

    stmt.free()
    return results
  }

  /**
   * Execute SQL query and return single row
   */
  public execOne(sql: string, params?: unknown[]): unknown | null {
    const results = this.exec(sql, params)
    return results.length > 0 ? results[0] : null
  }

  /**
   * Run SQL statement (for INSERT, UPDATE, DELETE)
   * @param sql SQL statement
   * @param params Statement parameters
   */
  public run(sql: string, params?: unknown[]): void {
    const db = this.getDB()
    const stmt = db.prepare(sql)

    if (params) {
      stmt.bind(params)
    }

    stmt.step()
    stmt.free()
  }

  /**
   * Begin transaction
   */
  public beginTransaction(): void {
    this.run('BEGIN TRANSACTION')
  }

  /**
   * Commit transaction
   */
  public commit(): void {
    this.run('COMMIT')
  }

  /**
   * Rollback transaction
   */
  public rollback(): void {
    this.run('ROLLBACK')
  }

  /**
   * Execute function within transaction
   * Automatically commits on success, rolls back on error
   */
  public async transaction<T>(fn: () => T | Promise<T>): Promise<T> {
    this.beginTransaction()
    try {
      const result = await fn()
      this.commit()
      return result
    } catch (error) {
      this.rollback()
      throw error
    }
  }

  /**
   * Save database to IndexedDB
   */
  public async saveToIndexedDB(): Promise<void> {
    if (!this.db) {
      throw new Error('No database to save')
    }

    const data = this.db.export()
    const db = await this.openIndexedDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.put(data, DATA_KEY)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Load database from IndexedDB
   */
  private async loadFromIndexedDB(): Promise<Uint8Array | null> {
    try {
      const db = await this.openIndexedDB()

      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.get(DATA_KEY)

        request.onsuccess = () => {
          resolve(request.result || null)
        }
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.warn('Failed to load from IndexedDB:', error)
      return null
    }
  }

  /**
   * Open IndexedDB connection
   */
  private openIndexedDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME)
        }
      }
    })
  }

  /**
   * Export database as binary data
   */
  public exportDatabase(): Uint8Array {
    const db = this.getDB()
    return db.export()
  }

  /**
   * Import database from binary data
   */
  public async importDatabase(data: Uint8Array): Promise<void> {
    if (!this.sql) {
      throw new Error('SQL.js not initialized')
    }

    // Close current database
    if (this.db) {
      this.db.close()
    }

    // Load new database
    this.db = new this.sql.Database(data)

    // Save to IndexedDB
    await this.saveToIndexedDB()

    console.log('✅ Database imported successfully')
  }

  /**
   * Clear all data and reset database
   */
  public async resetDatabase(): Promise<void> {
    if (!this.sql) {
      throw new Error('SQL.js not initialized')
    }

    // Close current database
    if (this.db) {
      this.db.close()
    }

    // Create new empty database
    this.db = new this.sql.Database()

    // Run schema
    this.db.run(DATABASE_SCHEMA)
    this.db.run(DATABASE_TRIGGERS)

    // Save to IndexedDB
    await this.saveToIndexedDB()

    console.log('✅ Database reset successfully')
  }

  /**
   * Close database connection
   */
  public close(): void {
    if (this.db) {
      this.db.close()
      this.db = null
      this.initialized = false
    }
  }

  /**
   * Get database stats
   */
  public getStats(): {
    guides: number
    chapters: number
    questions: number
    answeredQuestions: number
  } {
    const guidesCount = this.execOne('SELECT COUNT(*) as count FROM guides') as { count: number }
    const chaptersCount = this.execOne('SELECT COUNT(*) as count FROM chapters') as {
      count: number
    }
    const questionsCount = this.execOne('SELECT COUNT(*) as count FROM questions') as {
      count: number
    }
    const answeredCount = this.execOne(
      'SELECT COUNT(*) as count FROM question_statistics WHERE answer_score IS NOT NULL'
    ) as { count: number }

    return {
      guides: guidesCount?.count ?? 0,
      chapters: chaptersCount?.count ?? 0,
      questions: questionsCount?.count ?? 0,
      answeredQuestions: answeredCount?.count ?? 0,
    }
  }
}

// Export singleton instance
export const sqliteService = SQLiteService.getInstance()

// Export type for use in other files
export type { Database }
