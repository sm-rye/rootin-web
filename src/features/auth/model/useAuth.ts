import type { Auth, AuthMode } from '@/entities/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, signup } from '../api';

export default function useAuth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mode, formData }: { mode: AuthMode; formData: Auth }) =>
      mode === 'signup' ? signup(formData) : login(formData),
    onError: (error) => {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    },
  });
}
