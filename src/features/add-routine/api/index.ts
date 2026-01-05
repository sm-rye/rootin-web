import api from '@/lib/axios';

import type { Routine } from '@/entities/routine/model/types';

export const addRoutine = async (routine: Routine) => {
  console.log(routine);
  try {
    const res = await api.post('/routines', {
      routine: { ...routine, user_id: 1 },
    });

    return res;
  } catch (err) {
    console.error(err);
  }
};
