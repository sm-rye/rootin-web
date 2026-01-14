import api from '@/lib/axios';
import { ENDPOINTS } from '@/constants';
import type { Routine } from '@/entities/routine';

export const updateRoutine = async (
  id: number,
  routine: Routine,
): Promise<void> => {
  await api.patch(`${ENDPOINTS.ROUTINE}/${id}`, { routine });
};
