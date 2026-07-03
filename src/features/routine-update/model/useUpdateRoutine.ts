import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { updateRoutine } from '@/features/routine-update';
import { useToastStore } from '@/shared/model/useToastStore';
import type { Routine } from '@/entities/routine';

export default function useUpdateRoutine() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addToast = useToastStore((s) => s.addToast);

  return useMutation({
    mutationFn: ({ id, routine }: { id: number; routine: Routine }) =>
      updateRoutine(id, routine),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
      queryClient.invalidateQueries({ queryKey: ['routines', String(id)] });
      queryClient.invalidateQueries({ queryKey: ['overall-summary'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
      addToast('루틴이 수정되었습니다.', 'success');
      navigate(`/routines/${id}`);
    },
    onError: () => {
      addToast('루틴 수정에 실패했습니다.', 'error');
    },
  });
}
