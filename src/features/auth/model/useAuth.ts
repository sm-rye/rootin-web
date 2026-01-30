import type { Auth, AuthMode } from '@/entities/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, signup } from '../api';
import { useNavigate } from 'react-router-dom';
import { authStore } from '@/entities/auth/model/store';

export default function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setAuth = authStore((state) => state.setAuth); // 액션 가져오기

  return useMutation({
    mutationFn: ({ mode, formData }: { mode: AuthMode; formData: Auth }) =>
      mode === 'signup' ? signup(formData) : login(formData),
    onSuccess: (data) => {
      const { token, user } = data;

      localStorage.setItem('token', token);
      queryClient.invalidateQueries({ queryKey: ['user'] });

      setAuth(user);
      alert('반갑습니다!');

      navigate('/routines', { replace: true });
    },
    onError: (error) => {
      console.error('인증 실패:', error);
      alert('로그인/회원가입 중 오류가 발생했습니다.');
    },
  });
}
