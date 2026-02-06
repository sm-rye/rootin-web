import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addRoutine } from '../api';
import type { NewRoutine } from '@/entities/routine';

export default function useCreateRoutineMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: NewRoutine) => addRoutine(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
      navigate('/routines');
    },
    onError: (err) => {
      console.error(err);
    },
  });
}
