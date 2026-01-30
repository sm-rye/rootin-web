import api from '@/lib/axios';

import { ENDPOINTS } from '@/constants';

export const getMe = async () => {
  try {
    const res = await api.get(`${ENDPOINTS.AUTH}/me`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
