import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleTask } from '@/features/task-toggle';
import { useParams } from 'react-router-dom';

export default function useToggleTask() {
  const queryClient = useQueryClient();

  const { id: routineId } = useParams<{ id: string }>();

  return useMutation({
    mutationFn: ({ id, date }: { id: number; date: string }) =>
      toggleTask({ id, date }),
    onSuccess: () => {
      if (routineId) {
        queryClient.invalidateQueries({ queryKey: ['routines', routineId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['routines'] });
      }
    },
    onError: (error) => {
      console.error('테스크 토글 실패:', error);
      alert('토글 중 오류가 발생했습니다.');
    },
  });
}
