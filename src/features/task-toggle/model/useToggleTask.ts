import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleTask } from '@/features/task-toggle';
import { useParams } from 'react-router-dom';
import { useToastStore } from '@/shared/model/useToastStore';

export default function useToggleTask() {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  const { id: routineId } = useParams<{ id: string }>();

  return useMutation({
    mutationFn: ({ id, date }: { id: number; date: string }) =>
      toggleTask({ id, date }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['overall-summary'] });
      queryClient.invalidateQueries({ queryKey: ['routines'] });
      if (routineId) {
        queryClient.invalidateQueries({ queryKey: ['routines', routineId] });
      }
    },
    onError: () => {
      addToast('태스크 토글 중 오류가 발생했습니다.', 'error');
    },
  });
}
