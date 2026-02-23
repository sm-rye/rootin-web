import api from '@/lib/axios';

import type { NewRoutine } from '@/entities/routine';
import { ENDPOINTS } from '@/constants';

export const addRoutine = async (routine: NewRoutine) => {
  const res = await api.post(`${ENDPOINTS.ROUTINE}`, { routine });
  return res;
};
