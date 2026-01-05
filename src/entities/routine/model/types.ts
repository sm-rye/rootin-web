export interface RoutineInfo {
  title: string;
  description?: string;
  duration_days?: number;
}

export interface Task {
  name: string;
  sort_order: number;
}

export type Routine = {
  start_date?: Date;
  id: number;
} & RoutineInfo;

export type NewRoutine = {
  tasks: Task[];
} & RoutineInfo;
