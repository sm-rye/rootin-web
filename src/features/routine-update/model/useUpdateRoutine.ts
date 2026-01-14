import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateRoutine } from '@/features/routine-update';
import type { Routine } from '@/entities/routine';

export default function useUpdateRoutine(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, routine }: { id: number; routine: Routine }) =>
      updateRoutine(id, routine),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
      alert('업데이트 되었읍니다');
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    },
  });
}
