import api from '@/lib/axios';

import { ENDPOINTS } from '@/constants';

export const getMe = async () => {
  const res = await api.get(`${ENDPOINTS.AUTH}/me`);
  return res.data;
};
