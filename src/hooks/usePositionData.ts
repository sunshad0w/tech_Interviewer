import { useState, useEffect } from 'react';
import type { InterviewGuide } from '../types/interview';
import type { PositionStatistics } from '../types/statistics';
import { getGuide, getStatistics } from '@/database/adapter';
import { initializeStatistics } from '../services/localStorage';

/**
 * Summary statistics calculated from position data
 */
export interface SummaryStats {
  overallScore: number;
  totalQuestions: number;
  answeredCount: number;
  progressPercentage: number;
}

/**
 * Hook result type
 */
export interface UsePositionDataResult {
  guide: InterviewGuide | null;
  statistics: PositionStatistics | null;
  summaryStats: SummaryStats;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

/**
 * Custom hook for loading position data (guide + statistics)
 *
 * @param positionName - Position name from route parameter
 * @returns Guide data, statistics, summary stats, loading/error states
 */
export function usePositionData(positionName: string): UsePositionDataResult {
  const [guide, setGuide] = useState<InterviewGuide | null>(null);
  const [statistics, setStatistics] = useState<PositionStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Decode position name (может быть закодирован в URL)
      const decodedPositionName = decodeURIComponent(positionName);

      // Load guide using adapter (SQLite or JSON)
      const loadedGuide = await getGuide(decodedPositionName);

      if (!loadedGuide) {
        throw new Error(`Позиция "${decodedPositionName}" не найдена`);
      }

      setGuide(loadedGuide);

      // Load statistics using adapter
      let stats = getStatistics(loadedGuide.guide_name);

      if (!stats) {
        // Initialize statistics if not found (только для старой системы localStorage)
        stats = initializeStatistics(loadedGuide);
      }

      setStatistics(stats);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      console.error('Error loading position data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (positionName) {
      loadData();
    }
  }, [positionName]);

  // Calculate summary statistics
  const summaryStats: SummaryStats = {
    overallScore: statistics?.overallScore ?? 0,
    totalQuestions: 0,
    answeredCount: 0,
    progressPercentage: 0,
  };

  if (statistics) {
    // Calculate totals from all chapters
    for (const chapter of statistics.statistics) {
      summaryStats.totalQuestions += chapter.totalQuestions;
      summaryStats.answeredCount += chapter.answeredCount;
    }

    // Calculate progress percentage
    if (summaryStats.totalQuestions > 0) {
      summaryStats.progressPercentage = Math.round(
        (summaryStats.answeredCount / summaryStats.totalQuestions) * 100
      );
    }
  }

  return {
    guide,
    statistics,
    summaryStats,
    loading,
    error,
    reload: loadData,
  };
}
