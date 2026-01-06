import api from '@/lib/axios';

import type { NewRoutine } from '@/entities/routine';
import { ENDPOINTS } from '@/constants';

export const addRoutine = async (routine: NewRoutine) => {
  try {
    const res = await api.post(`${ENDPOINTS.ROUTINE}`, {
      routine: { ...routine, user_id: 1 },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
