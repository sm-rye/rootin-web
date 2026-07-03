export type SummaryResponse = {
  overallRate: number;
  currentStreak: number;
  weekday: {
    day: number;
    rate: number;
  }[];
  habitRates: {
    taskId: number;
    taskName: string;
    routineId: number;
    routineTitle: string;
    rate: number;
  }[];
};

export type TrendResponse = {
  range: number;
  trend: {
    date: string;
    rate: number;
  }[];
};

export type StreakResponse = {
  weeks: number;
  data: {
    date: string;
    level: 0 | 1 | 2 | 3;
  }[];
};

export type TrendRange = 7 | 14 | 30;
