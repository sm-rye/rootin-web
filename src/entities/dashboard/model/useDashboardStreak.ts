import { useQuery } from '@tanstack/react-query';
import { getDashboardStreak } from '../api';

export default function useDashboardStreak(weeks: number = 12) {
  return useQuery({
    queryKey: ['dashboard', 'streak', weeks],
    queryFn: () => getDashboardStreak(weeks),
    staleTime: 1000 * 60 * 5,
  });
}
