import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteRoutine } from '../api';
import { useToastStore } from '@/shared/model/useToastStore';

export default function useDeleteRoutine() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addToast = useToastStore((s) => s.addToast);

  return useMutation({
    mutationFn: (id: number) => deleteRoutine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
      queryClient.invalidateQueries({ queryKey: ['overall-summary'] });
      addToast('루틴이 삭제되었습니다.', 'success');
      navigate('/routines');
    },
    onError: () => {
      addToast('루틴 삭제에 실패했습니다.', 'error');
    },
  });
}
