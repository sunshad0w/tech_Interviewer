/**
 * Migration Dialog Component
 *
 * Компонент для миграции данных из JSON + localStorage в SQLite
 */

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { migrateToSQLite, rollbackMigration } from '@/database'
import type { MigrationResult, MigrationProgress } from '@/database'

interface MigrationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete?: () => void
}

type MigrationState = 'idle' | 'migrating' | 'success' | 'error'

export default function MigrationDialog({
  open,
  onOpenChange,
  onComplete,
}: MigrationDialogProps) {
  const [state, setState] = useState<MigrationState>('idle')
  const [progress, setProgress] = useState<MigrationProgress>({
    step: '',
    current: 0,
    total: 100,
    percentage: 0,
  })
  const [result, setResult] = useState<MigrationResult | null>(null)

  const handleMigrate = async () => {
    setState('migrating')
    setProgress({ step: 'Начинаем миграцию...', current: 0, total: 100, percentage: 0 })

    try {
      const migrationResult = await migrateToSQLite((prog) => {
        setProgress(prog)
      })

      setResult(migrationResult)

      if (migrationResult.success) {
        setState('success')
        onComplete?.()
      } else {
        setState('error')
      }
    } catch (error) {
      console.error('Migration failed:', error)
      setState('error')
      setResult({
        success: false,
        guidesImported: 0,
        questionsImported: 0,
        statisticsImported: 0,
        errors: [String(error)],
        duration: 0,
      })
    }
  }

  const handleRollback = async () => {
    try {
      await rollbackMigration()
      setState('idle')
      setResult(null)
      onOpenChange(false)
    } catch (error) {
      console.error('Rollback failed:', error)
    }
  }

  const handleClose = () => {
    if (state !== 'migrating') {
      setState('idle')
      setResult(null)
      onOpenChange(false)
    }
  }

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}мс`
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}с`
    return `${(ms / 60000).toFixed(1)}мин`
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {state === 'idle' && 'Миграция в SQLite'}
            {state === 'migrating' && 'Миграция в процессе...'}
            {state === 'success' && 'Миграция завершена'}
            {state === 'error' && 'Ошибка миграции'}
          </DialogTitle>
          <DialogDescription>
            {state === 'idle' &&
              'Миграция данных из JSON файлов и localStorage в SQLite базу данных для улучшения производительности.'}
            {state === 'migrating' && progress.step}
            {state === 'success' && 'Все данные успешно перенесены в SQLite базу данных.'}
            {state === 'error' && 'Произошла ошибка при миграции данных.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Idle State */}
          {state === 'idle' && (
            <Alert>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Все JSON guides будут импортированы в базу данных</li>
                  <li>Статистика из localStorage будет сохранена</li>
                  <li>Вы сможете экспортировать/импортировать базу данных</li>
                  <li>Процесс занимает около 5-10 секунд</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Migrating State */}
          {state === 'migrating' && (
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Прогресс</span>
                  <span className="font-medium">{progress.percentage}%</span>
                </div>
                <Progress value={progress.percentage} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">{progress.step}</p>
            </div>
          )}

          {/* Success State */}
          {state === 'success' && result && (
            <div className="space-y-3">
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <AlertDescription>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Импортировано позиций:</span>
                      <span className="font-semibold">{result.guidesImported}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Импортировано вопросов:</span>
                      <span className="font-semibold">{result.questionsImported}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Импортировано статистики:</span>
                      <span className="font-semibold">{result.statisticsImported}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Время выполнения:</span>
                      <span className="font-semibold">{formatDuration(result.duration)}</span>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              <p className="text-sm text-muted-foreground text-center">
                Приложение теперь использует SQLite для хранения данных.
              </p>
            </div>
          )}

          {/* Error State */}
          {state === 'error' && result && (
            <Alert className="border-destructive">
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold">Ошибки миграции:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {result.errors.map((error, index) => (
                      <li key={index} className="text-destructive">
                        {error}
                      </li>
                    ))}
                  </ul>
                  {result.guidesImported > 0 && (
                    <p className="text-sm mt-3">
                      Частично импортировано: {result.guidesImported} позиций,{' '}
                      {result.questionsImported} вопросов
                    </p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {state === 'idle' && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Отмена
              </Button>
              <Button onClick={handleMigrate}>Начать миграцию</Button>
            </>
          )}

          {state === 'migrating' && (
            <Button disabled className="w-full">
              Миграция...
            </Button>
          )}

          {state === 'success' && (
            <Button onClick={handleClose} className="w-full">
              Готово
            </Button>
          )}

          {state === 'error' && (
            <>
              <Button variant="outline" onClick={handleRollback}>
                Откатить изменения
              </Button>
              <Button onClick={handleMigrate}>Повторить</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
