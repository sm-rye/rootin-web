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
} & RoutineInfo;

export type NewRoutine = {
  tasks: Task[];
} & RoutineInfo;

export interface AllRoutineResponse {
  routines: Routine[];
}
