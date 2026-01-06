export interface RoutineInfo {
  title: string;
  description?: string;
  duration_days?: number;

  start_date?: Date;
  daily_status?: DailyStatus[];
}

export interface Task {
  name: string;
  sort_order: number;
  id?: number;
}

export interface Status {
  task_id: number;
  isCompleted: boolean;
}

export interface DailyStatus {
  day: number;
  date: string;
  status: Status[];
}

export type Routine = {
  id: number;
  tasks?: Task[];
} & RoutineInfo;

export type NewRoutine = {
  tasks: Task[];
} & RoutineInfo;

export interface AllRoutineResponse {
  routines: Routine[];
}
