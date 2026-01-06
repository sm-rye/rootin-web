import React from 'react';

import { useRoutines } from '@/entities/routine';
import type { Routine } from '@/entities/routine';
import { useNavigate } from 'react-router-dom';

import { DeleteRoutineBtn } from '@/features/routine-delete';

export default function RoutineList() {
  const { data, isError, isLoading } = useRoutines();
  const navigate = useNavigate();

  if (isError) return <div>error</div>;

  if (isLoading) return <div> loading</div>;

  const handleRoutineClick = (id: number) => {
    navigate(`${id}`);
  };

  return (
    <ul>
      {data?.routines?.map((routine: Routine, idx: number) => (
        <li
          key={routine.id}
          className="flex"
          onClick={() => handleRoutineClick(routine.id)}
        >
          <p>{idx + 1}.</p>
          <h3>{routine.title}</h3>
          <DeleteRoutineBtn id={routine.id} />
        </li>
      ))}
    </ul>
  );
}
