import { useParams } from 'react-router-dom';
import { useRoutineDetail } from '@/entities/routine';

import { TaskDailyList } from '@/widgets/task-daily-list';

import { UpdateRoutineForm } from '@/features/routine-update';

import { DeleteRoutineBtn } from '@/features/routine-delete';
import { Button } from '@/shared/Components';

import dayjs from 'dayjs';

export default function RoutineDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: routine, isLoading, isError } = useRoutineDetail(id!);

  if (isLoading) return <div>상세 정보 로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  if (!routine) return <></>;

  const today = dayjs().format('YYYY-MM-DD');

  console.log(today);

  const todayTask = routine.daily_status?.filter((d) => d.date === today);

  console.log(todayTask);
  return (
    <article className="flex flex-col gap-2">
      {/* <UpdateRoutineForm routine={routine} /> */}
      <header className="flex justify-between p-3 items-center ">
        <div>루틴목록으로 돌아가기</div>
        <Button>
          <p>수정</p>
        </Button>
      </header>
      <div>
        <h1 className="text-2xl">{routine.title}</h1>
        <p>{routine.description}</p>
      </div>
      <div className="flex flex-wrap">
        <TaskDailyList dailyTaskData={routine.daily_status} />
      </div>
      <footer className="w-full flex justify-center">
        <DeleteRoutineBtn id={routine.id} />
      </footer>
    </article>
  );
}
