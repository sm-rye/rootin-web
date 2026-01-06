import React from 'react';
import { useParams } from 'react-router-dom';
import { useRoutineDetail } from '@/entities/routine';

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

      <p>{routine.description}</p>

      <div>
        <ol>
          {routine?.tasks?.map((t) => (
            <li key={t.id}>
              {t.sort_order} {t.name}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-wrap">
        {routine.daily_status?.map((d) => {
          return (
            <div key={d.day} className="w-20 h-20 border">
              <p>{d.date}</p>
              <div>
                {d.status.map((t) => (
                  <div className="w-5 h-5 rounded-full" key={t.task_id}>
                    {t.isCompleted}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
