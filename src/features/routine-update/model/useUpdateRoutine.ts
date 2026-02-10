import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateRoutine } from '@/features/routine-update';
import type { Routine } from '@/entities/routine';

export default function useUpdateRoutine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, routine }: { id: number; routine: Routine }) =>
      updateRoutine(id, routine),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
      alert('업데이트 되었읍니다');
    },
    onError: (error) => {
      console.error('업데이트 실패:', error);
      alert('업데이트 중 오류가 발생했습니다.');
    },
  });
}
