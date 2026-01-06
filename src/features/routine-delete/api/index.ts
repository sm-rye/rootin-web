import api from '@/lib/axios';
import { ENDPOINTS } from '@/constants';

export const deleteRoutine = async (id: number): Promise<void> => {
  await api.delete(`${ENDPOINTS.ROUTINE}/${id}`);
};
