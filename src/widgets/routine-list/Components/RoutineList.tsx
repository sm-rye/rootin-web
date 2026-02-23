import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import type { Routine } from '@/entities/routine';
import { useNavigate } from 'react-router-dom';

import { Card, Empty } from '@/shared/Components';

interface RoutineListProps {
  routines: Routine[];
  filter?: 'active' | 'completed';
}

export default function RoutineList({
  routines,
  filter = 'active',
}: RoutineListProps) {
  const navigate = useNavigate();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Web API (Window 객체) - 브라우저가 다음 화면을 그리기 직전에 콜백을 실행해 줌
    const timer = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleRoutineClick = (id: number) => {
    navigate(`${id}`);
  };

  if (routines.length <= 0) {
    if (filter === 'completed') {
      return (
        <div className="mt-20">
          <Empty
            title="종료된 루틴이 없습니다."
            description="완료한 루틴이 여기에 표시됩니다."
          />
        </div>
      );
    }
    return (
      <div className="mt-20">
        <Empty
          title="아직 루틴이 없습니다."
          description="성공적인 하루를 위한 첫 걸음, 지금 새로운 루틴을 만들어보세요!"
          actionLabel="첫 루틴 만들기"
          onAction={() => navigate('/routines/new')}
        />
      </div>
    );
  }

  return (
    <ul
      className={`grid grid-cols-1 items-start content-start p-5 gap-5 lg:grid-cols-2 lg:gap-x-7.5 lg:px-7.5  lg:py-1 `}
    >
      {routines.map((routine: Routine, index: number) => {
        const rate = routine.completion_rate ?? 0;
        return (
          <li
            key={routine.id}
            onClick={() => handleRoutineClick(routine.id)}
            className="h-36 cursor-pointer lg:h-40 animate-[cardIn_0.4s_ease-out_both]"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <Card
              className={`hover:shadow-md hover:-translate-y-0.5 transition ${
                filter === 'completed' ? 'grayscale-20' : ''
              }`}
            >
              <div className="flex flex-col w-full h-full p-3.5">
                <div className="flex items-start justify-between">
                  <h6
                    className={`text-lg font-semibold leading-snug ${filter === 'completed' ? 'text-gray-400' : ''}`}
                  >
                    {routine.title}
                  </h6>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {filter === 'completed' && (
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-400">
                        종료
                      </span>
                    )}
                    {routine.todayTotal != null &&
                      routine.todayTotal > 0 &&
                      !routine.isCompleted && (
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            routine.todayCompleted === routine.todayTotal
                              ? 'bg-green-50 text-green-600'
                              : 'bg-amber-50 text-amber-600'
                          }`}
                        >
                          오늘의 달성률 : {routine.todayCompleted}/
                          {routine.todayTotal}
                        </span>
                      )}
                  </div>
                </div>

                <div className="flex items-center gap-y-1.5 mt-1 text-sm text-gray-400 ">
                  {routine.duration_days && (
                    <>
                      <span className="text-gray-300">·</span>
                      <span>{routine.duration_days}일 목표</span>
                    </>
                  )}
                  {routine.start_date && (
                    <span className="mx-2">
                      {dayjs(routine.start_date).format('YY.MM.DD')}
                      {' ~ '}
                      {routine.end_date
                        ? dayjs(routine.end_date).format('YY.MM.DD')
                        : '진행 중'}
                    </span>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="flex justify-end mb-1">
                    <span className="text-xs text-gray-500">
                      {rate === 100 ? '🎉 ' : ''}달성률 {rate}%
                    </span>
                  </div>
                  <div className="bg-red-50/60 w-full h-10 rounded-xl overflow-hidden">
                    <div
                      className="h-10 rounded-xl shadow-md transition-all duration-700 ease-out"
                      style={{
                        width: animated ? `${rate}%` : '0%',
                        background:
                          filter === 'completed'
                            ? 'linear-gradient(135deg, #ea4c89 0%, #f78fb3 50%, #ff6b81 100%)'
                            : 'linear-gradient(90deg, #EA4C89 0%, #FF8833 100%)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
