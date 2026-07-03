import { useQuery } from '@tanstack/react-query';
import { getDashboardTrend } from '../api';
import type { TrendRange } from './types';

export default function useDashboardTrend(range: TrendRange = 7) {
  return useQuery({
    queryKey: ['dashboard', 'trend', range],
    queryFn: () => getDashboardTrend(range),
    staleTime: 1000 * 60 * 5,
  });
}
