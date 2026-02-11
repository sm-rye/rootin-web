import api from '@/lib/axios';
import type { Routine, AllRoutineResponse } from '../model/types';

import { ENDPOINTS } from '@/constants';

export const getAllRoutines = async (
  page: number = 1,
  limit: number = 6,
  filter: 'active' | 'completed' = 'active',
): Promise<AllRoutineResponse> => {
  const { data } = await api.get<AllRoutineResponse>(
    `${ENDPOINTS.ROUTINE}?page=${page}&limit=${limit}&filter=${filter}`,
  );
  return data;
};

export const getRoutineDetail = async (id: string): Promise<Routine> => {
  const { data } = await api.get<Routine>(`${ENDPOINTS.ROUTINE}/${id}`);
  return data;
};
