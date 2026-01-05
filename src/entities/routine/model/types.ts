export interface RoutineInfo {
  title: string;
  description?: string;
  duration_days: number;
}

export interface Task {
  name: string;
  sort_order: number;
}

export type Routine = {
  tasks: Task[];
} & RoutineInfo;
