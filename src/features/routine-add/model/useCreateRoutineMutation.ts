import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addRoutine } from '../api';
import { useToastStore } from '@/shared/model/useToastStore';
import type { NewRoutine } from '@/entities/routine';

export default function useCreateRoutineMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addToast = useToastStore((s) => s.addToast);

  return useMutation({
    mutationFn: (formData: NewRoutine) => addRoutine(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
      addToast('루틴이 등록되었습니다.', 'success');
      navigate('/routines');
    },
    onError: () => {
      addToast('루틴 등록에 실패했습니다.', 'error');
    },
  });
}
