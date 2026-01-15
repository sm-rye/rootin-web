import { useParams } from 'react-router-dom';
import { useRoutineDetail } from '@/entities/routine';

import { TaskDailyList } from '@/widgets/task-daily-list';

import { UpdateRoutineForm } from '@/features/routine-update';

import { DeleteRoutineBtn } from '@/features/routine-delete';

export default function RoutineDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: routine, isLoading, isError } = useRoutineDetail(id!);

  if (isLoading) return <div>상세 정보 로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  if (!routine) return <></>;

  return (
    <article>
      <UpdateRoutineForm routine={routine} />
      <div className="flex flex-wrap">
        <TaskDailyList dailyTaskData={routine.daily_status} />
      </div>
      <footer className="w-full flex justify-center">
        <DeleteRoutineBtn id={routine.id} />
      </footer>
    </article>
  );
}
