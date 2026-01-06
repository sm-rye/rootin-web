import api from '@/lib/axios';
import type { Routine } from '../model/types';

const ROUTINES = '/routines';

interface AllRoutineResponse {
  routines: Routine[];
}

export const getAllRoutines = async (): Promise<AllRoutineResponse> => {
  const { data } = await api.get<AllRoutineResponse>(`${ROUTINES}`);
  return data;
};

export const getRoutineDetail = async (id: string): Promise<Routine> => {
  const { data } = await api.get<Routine>(`${ROUTINES}/${id}`);
  return data;
};
