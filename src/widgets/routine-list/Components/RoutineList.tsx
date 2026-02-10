import React from 'react';
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
    <ul className="grid grid-cols-1 h-full items-center p-5 gap-5 lg:grid-cols-2 lg:gap-x-7.5 lg:px-7.5">
      {routines.map((routine: Routine) => {
        const rate = routine.completion_rate ?? 0;
        return (
          <li
            key={routine.id}
            onClick={() => handleRoutineClick(routine.id)}
            className="h-34 cursor-pointer lg:h-44"
          >
            <Card>
              <div className="flex flex-col w-full h-full p-3">
                <h6 className="text-lg font-semibold">{routine.title}</h6>
                {routine?.start_date && (
                  <p className="text-gray-400 text-sm">
                    시작일 :{' '}
                    {dayjs(routine?.start_date).format('YYYY-MM-DD')}
                  </p>
                )}

                <div className="flex-1 flex h-full flex-col justify-center">
                  <div className="bg-red-50 w-full h-10 rounded-xl overflow-hidden relative">
                    <div
                      className="bg-primary h-10 shadow"
                      style={{ width: `${rate}%` }}
                    />
                    <div className="text-white absolute z-10 top-3 left-3 text-xs">
                      달성률 : {rate}%
                    </div>
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
