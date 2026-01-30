import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api';

export default function useGetMe(isEnabled: boolean) {
  return useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    enabled: isEnabled,
    retry: 1,
  });
}
