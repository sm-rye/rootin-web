import { useState } from 'react';
import type { Auth } from '@/entities/auth';

export default function useAuthForm() {
  const [authFormData, setAuthFormData] = useState<Auth>({
    email: '',
    password: '',
  });

  const [error, setError] = useState({ nickname: '', email: '', password: '' });

  const onChangeAuthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setError((prev) => ({ ...prev, [id]: '' }));

    setAuthFormData((prev) => ({ ...prev, [id]: value }));
  };

  const removeNickname = () => {
    setAuthFormData((prev) => {
      const { nickname, ...rest } = prev;
      return rest;
    });
  };

  return {
    authFormData,
    onChangeAuthInput,
    removeNickname,
    setAuthFormData,
    error,
    setError,
  };
}
