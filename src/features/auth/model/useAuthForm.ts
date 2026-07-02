import { useState } from 'react';
import type { Auth } from '@/entities/auth';

import {
  validatePassword,
  validateEmail,
  validateNickname,
} from '../lib/validation';

export default function useAuthForm() {
  const [authFormData, setAuthFormData] = useState<Auth>({
    email: '',
    password: '',
    nickname: '',
  });
  const [error, setError] = useState({ nickname: '', email: '', password: '' });
  const [validatedForm, setValidatedForm] = useState(false);

  const onChangeAuthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setAuthFormData((prev) => ({ ...prev, [id]: value }));

    if (validatedForm) {
      switch (id) {
        case 'email':
          setError({ ...error, [id]: validateEmail(value) });
          break;
        case 'nickname':
          setError({ ...error, [id]: validateNickname(value) });
          break;
        case 'password':
          setError({ ...error, [id]: validatePassword(value) });
          break;
      }
    }
  };

  const validateFormData = (isSignup: boolean) => {
    const { email, password, nickname } = authFormData;

    const validatedEmail = validateEmail(email);
    const validatedPassword = validatePassword(password);
    const validatedNickname = isSignup ? validateNickname(nickname) : '';

    setValidatedForm(true);

    const isAllValid =
      !validatedEmail && !validatedPassword && !validatedNickname;

    if (isAllValid) return true;

    setError({
      email: validatedEmail,
      password: validatedPassword,
      nickname: validatedNickname,
    });

    return false;
  };

  const resetData = () => {
    setAuthFormData({
      nickname: '',
      email: '',
      password: '',
    });
  };

  return {
    authFormData,
    onChangeAuthInput,
    setAuthFormData,
    resetData,
    error,
    validatedForm,
    setError,
    validateFormData,
  };
}
