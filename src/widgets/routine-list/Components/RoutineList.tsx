import React from 'react';

import type { Routine } from '@/entities/routine';
import { useNavigate } from 'react-router-dom';

import { Card } from '@/shared/Components';

export default function RoutineList({ routines }: { routines: Routine[] }) {
  const navigate = useNavigate();

  const handleRoutineClick = (id: number) => {
    navigate(`${id}`);
  };

  return (
    <ul className="grid grid-cols-1 h-full items-center p-5 gap-5 lg:grid-cols-2 lg:gap-x-7.5 lg:px-7.5">
      {routines.map((routine: Routine, idx: number) => (
        <li
          key={routine.id}
          onClick={() => handleRoutineClick(routine.id)}
          className="h-34 cursor-pointer lg:h-44 "
        >
          <Card>
            <div className="flex flex-col w-full h-full p-3">
              <h6 className="text-lg font-semibold">{routine.title}</h6>
              {routine?.start_date && (
                <p className="text-gray-400 text-sm">
                  시작일 : {routine?.start_date}
                </p>
              )}

              <div className="flex-1  flex h-full flex-col justify-center ">
                <div className="bg-red-50  w-full h-10 rounded-xl overflow-hidden relative">
                  <div className="bg-primary w-[70%] h-10 shadow" />
                  <div className="text-white absolute z-10 top-3 left-3 text-xs">
                    달성률 : 70%
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
