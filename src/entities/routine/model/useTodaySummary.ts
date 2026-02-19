import { useQuery } from '@tanstack/react-query';
import { getOverallSummary } from '@/entities/routine';

export default function useOverallSummary() {
  return useQuery({
    queryKey: ['overall-summary'],
    queryFn: getOverallSummary,
    staleTime: 1000 * 60 * 5,
  });
}
