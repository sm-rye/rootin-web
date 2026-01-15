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
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-2.5  h-full items-center">
      {routines.map((routine: Routine, idx: number) => (
        <li
          key={routine.id}
          onClick={() => handleRoutineClick(routine.id)}
          className="h-34 cursor-pointer lg:h-44"
        >
          <Card>
            <div className="flex flex-col w-full h-full p-3">
              <h6 className="text-lg font-semibold">{routine.title}</h6>
              <div className="flex-1 border">프로그레스바</div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
