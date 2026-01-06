import { useQuery } from '@tanstack/react-query';

import { getAllRoutines } from '@/entities/routine';

export default function useRoutines() {
  return useQuery({
    queryKey: ['routines'],
    queryFn: getAllRoutines,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}
