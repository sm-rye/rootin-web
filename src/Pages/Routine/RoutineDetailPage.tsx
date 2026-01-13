import React from 'react';
import { useParams } from 'react-router-dom';
import { useRoutineDetail } from '@/entities/routine';

import { TaskDailyList } from '@/widgets/task-daily-list';

export default function RoutineDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: routine, isLoading, isError } = useRoutineDetail(id!);

  if (isLoading) return <div>상세 정보 로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  if (!routine) return <></>;

  return (
    <article>
      <h1>{routine.title}</h1>
      <div>
        <button>수정</button>
      </div>

      <p>설명 : {routine.description}</p>

      <div>
        <p>테스크 목록</p>
        <ol>
          {routine?.tasks?.map((t) => (
            <li key={t.id}>
              {t.sort_order} {t.name}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-wrap">
        <TaskDailyList dailyTaskData={routine.daily_status} />
      </div>
    </article>
  );
}
