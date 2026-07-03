import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary } from '../api';

export default function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: getDashboardSummary,
    staleTime: 1000 * 60 * 5,
  });
}
