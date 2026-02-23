import type { Auth, AuthMode } from '@/entities/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, signup } from '../api';
import { useNavigate } from 'react-router-dom';
import { authStore } from '@/entities/auth/model/store';
import { useToastStore } from '@/shared/model/useToastStore';

export default function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setAuth = authStore((state) => state.setAuth);
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: ({ mode, formData }: { mode: AuthMode; formData: Auth }) =>
      mode === 'signup' ? signup(formData) : login(formData),
    onSuccess: (data) => {
      const { token, user } = data;

      // 1. token 셋팅
      localStorage.setItem('token', token);
      queryClient.invalidateQueries({ queryKey: ['user'] });

      //2. user 응답값 스토어 저장
      setAuth(user);

      //3. 루틴 페이지로 라우팅
      navigate('/routines', { replace: true });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || '인증에 실패했습니다. 다시 시도해주세요.';
      addToast(message, 'error');
    },
  });
}
