import api from '@/lib/axios';
import { ENDPOINTS } from '@/constants';
import type { SummaryResponse, TrendResponse, StreakResponse, TrendRange } from '../model/types';

export const getDashboardSummary = async (): Promise<SummaryResponse> => {
  const { data } = await api.get<SummaryResponse>(`${ENDPOINTS.DASHBOARD}/summary`);
  return data;
};

export const getDashboardTrend = async (range: TrendRange = 7): Promise<TrendResponse> => {
  const { data } = await api.get<TrendResponse>(`${ENDPOINTS.DASHBOARD}/trend?range=${range}`);
  return data;
};

export const getDashboardStreak = async (weeks: number = 12): Promise<StreakResponse> => {
  const { data } = await api.get<StreakResponse>(`${ENDPOINTS.DASHBOARD}/streak?weeks=${weeks}`);
  return data;
};
