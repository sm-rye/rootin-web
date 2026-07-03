import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authStore } from '@/entities/auth/model/store';
import { useToastStore } from '@/shared/model/useToastStore';
import { guestLogin } from '../api';

export default function useGuestAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setAuth = authStore((state) => state.setAuth);
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: guestLogin,
    onSuccess: (data) => {
      const { token, user } = data;
      localStorage.setItem('token', token);
      queryClient.clear();
      queryClient.setQueryData(['user'], { user });
      setAuth(user);
      navigate('/routines', { replace: true });
    },
    onError: () => {
      addToast('게스트 체험을 시작할 수 없습니다. 잠시 후 다시 시도해주세요.', 'error');
    },
  });
}
