import React, { useEffect, useState } from 'react';
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
        <p className="mt-20 text-center text-neutral-400">
          종료된 루틴이 없습니다.
        </p>
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
    <ul className="grid grid-cols-1 items-start content-start p-5 gap-5 lg:grid-cols-2 lg:gap-x-7.5 lg:px-7.5  lg:py-1">
      {routines.map((routine: Routine, index: number) => {
        const rate = routine.completion_rate ?? 0;
        return (
          <li
            key={routine.id}
            onClick={() => handleRoutineClick(routine.id)}
            className="h-36 cursor-pointer lg:h-40 animate-[cardIn_0.4s_ease-out_both]"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <Card className="hover:shadow-md hover:-translate-y-0.5 transition">
              <div className="flex flex-col w-full h-full p-3.5">
                <div className="flex items-start justify-between">
                  <h6 className="text-lg font-semibold leading-snug">
                    {routine.title}
                  </h6>
                  {routine.end_date &&
                    !dayjs().isAfter(dayjs(routine.end_date)) && (
                      <span className="text-xs font-semibold text-primary bg-red-50 px-2 py-1 rounded-full shrink-0 ml-2">
                        D-
                        {dayjs(routine.end_date).diff(dayjs(), 'day')}
                      </span>
                    )}
                </div>

                <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-400">
                  {routine.start_date && (
                    <span>
                      {dayjs(routine.start_date).format('MM.DD')}
                      {' ~ '}
                      {routine.end_date
                        ? dayjs(routine.end_date).format('MM.DD')
                        : '진행 중'}
                    </span>
                  )}
                  {routine.tasks && routine.tasks.length > 0 && (
                    <>
                      <span className="text-gray-300">·</span>
                      <span>{routine.tasks.length}개 태스크</span>
                    </>
                  )}
                  {routine.duration_days && (
                    <>
                      <span className="text-gray-300">·</span>
                      <span>{routine.duration_days}일 목표</span>
                    </>
                  )}
                </div>

                <div className="mt-6 bg-red-50/60 w-full h-10 rounded-xl overflow-hidden relative">
                  <div
                    className="h-10 rounded-xl shadow-md transition-all duration-700 ease-out"
                    style={{
                      width: animated ? `${rate}%` : '0%',
                      background:
                        'linear-gradient(135deg, #ea4c89 0%, #f78fb3 50%, #ff6b81 100%)',
                    }}
                  />
                  <div className="absolute z-10 top-1/2 -translate-y-1/2 left-3 text-xs font-medium text-white drop-shadow-sm">
                    달성률 : {rate}%
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
