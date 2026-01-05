import { useQuery } from '@tanstack/react-query';

import { getAllRoutines } from '@/entities/routine';

export default function useRoutines() {
  const query = useQuery({
    queryKey: ['routines'],
    queryFn: getAllRoutines,
    // staleTime: 60 * 5 * 1000,
  });

  return query;
}
