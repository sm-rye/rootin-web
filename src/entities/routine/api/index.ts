import api from '@/lib/axios';
import type { Routine, AllRoutineResponse } from '../model/types';

import { ENDPOINTS } from '@/constants';

export const getAllRoutines = async (
  page: number = 1,
  limit: number = 6,
  filter: 'active' | 'completed' = 'active',
  sort: 'newest' | 'oldest' | 'name' = 'newest',
): Promise<AllRoutineResponse> => {
  const { data } = await api.get<AllRoutineResponse>(
    `${ENDPOINTS.ROUTINE}?page=${page}&limit=${limit}&filter=${filter}&sort=${sort}`,
  );
  return data;
};

export interface TodaySummary {
  totalTasks: number;
  completedTasks: number;
}

export const getTodaySummary = async (): Promise<TodaySummary> => {
  const { data } = await api.get<TodaySummary>(
    `${ENDPOINTS.ROUTINE}/today-summary`,
  );
  return data;
};

export const getRoutineDetail = async (id: string): Promise<Routine> => {
  const { data } = await api.get<Routine>(`${ENDPOINTS.ROUTINE}/${id}`);
  return data;
};
