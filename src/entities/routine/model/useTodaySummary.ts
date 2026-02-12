import { useQuery } from '@tanstack/react-query';
import { getTodaySummary } from '@/entities/routine';

export default function useTodaySummary() {
  return useQuery({
    queryKey: ['today-summary'],
    queryFn: getTodaySummary,
    staleTime: 1000 * 60 * 5,
  });
}
