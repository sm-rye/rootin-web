import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { getAllRoutines } from '@/entities/routine';

export default function useRoutines(
  page: number = 1,
  limit: number = 6,
  filter: 'active' | 'completed' = 'active',
) {
  return useQuery({
    queryKey: ['routines', page, limit, filter],
    queryFn: () => getAllRoutines(page, limit, filter),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}
