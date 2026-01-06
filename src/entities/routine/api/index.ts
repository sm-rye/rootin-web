import api from '@/lib/axios';
import type { Routine, AllRoutineResponse } from '../model/types';

import { ENDPOINTS } from '@/constants';

export const getAllRoutines = async (): Promise<AllRoutineResponse> => {
  const { data } = await api.get<AllRoutineResponse>(`${ENDPOINTS.ROUTINE}`);
  return data;
};

export const getRoutineDetail = async (id: string): Promise<Routine> => {
  const { data } = await api.get<Routine>(`${ENDPOINTS.ROUTINE}/${id}`);
  return data;
};
