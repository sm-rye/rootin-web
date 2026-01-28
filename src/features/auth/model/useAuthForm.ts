import { useState } from 'react';
import type { Auth } from '@/entities/auth';

// mode login일 때, 닉네임 삭제하도록
export default function useAuthForm() {
  const [authFormData, setAuthFormData] = useState<Auth>({
    email: '',
    password: '',
  });

  const onChangeAuthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAuthFormData((prev) => ({ ...prev, [id]: value }));
  };

  const removeNickname = () => {
    setAuthFormData((prev) => {
      const { nickname, ...rest } = prev;
      return rest;
    });
  };

  return { authFormData, onChangeAuthInput, removeNickname, setAuthFormData };
}
