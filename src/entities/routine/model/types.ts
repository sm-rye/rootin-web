import type { Task } from '@/entities/task';

export interface RoutineInfo {
  title: string;
  description?: string;
  duration_days?: number;
  start_date?: Date;
  daily_status?: DailyStatus[];
}

export type Status = {
  task_id: number;
  isCompleted: boolean;
};

export interface DailyStatus {
  day: number;
  date: string;
  status: Status[] & Task[];
}

export type Routine = {
  id: number;
  tasks?: Task[];
  completion_rate?: number;
  end_date?: Date;
  isCompleted?: boolean;
  todayTotal?: number;
  todayCompleted?: number;
} & RoutineInfo;

export type NewRoutine = {
  tasks: Task[];
} & RoutineInfo;

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RoutineCounts {
  active: number;
  completed: number;
}

export interface AllRoutineResponse {
  routines: Routine[];
  pagination: Pagination;
  counts: RoutineCounts;
}
