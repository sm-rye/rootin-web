import { useQuery } from '@tanstack/react-query';
import { getRoutineDetail } from '../api';

export default function useRoutineDetail(id: string) {
  return useQuery({
    queryKey: ['routines', id],
    queryFn: () => getRoutineDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}
