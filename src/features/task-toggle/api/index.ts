import api from '@/lib/axios';

import { ENDPOINTS } from '@/constants';

export const toggleTask = async ({
  id,
  date,
}: {
  id: number;
  date: string;
}): Promise<void> => {
  await api.post(`${ENDPOINTS.TASK}/${id}/toggle-log`, { date });
};
