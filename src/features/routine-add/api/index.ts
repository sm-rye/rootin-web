import api from '@/lib/axios';

import type { NewRoutine } from '@/entities/routine';

export const addRoutine = async (routine: NewRoutine) => {
  try {
    const res = await api.post('/routines', {
      routine: { ...routine, user_id: 1 },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
