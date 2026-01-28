import type { Auth, AuthResponse } from '@/entities/auth';
import api from '@/lib/axios';
import { ENDPOINTS } from '@/constants';

export const login = async (loginInfo: Auth): Promise<AuthResponse> =>
  await api.post(`${ENDPOINTS.AUTH}/login`, { user: loginInfo });

export const signup = async (signupInfo: Auth): Promise<AuthResponse> =>
  await api.post(`${ENDPOINTS.AUTH}/signup`, { user: signupInfo });
