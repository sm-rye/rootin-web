import React from 'react';

import { useRoutines } from '@/entities/routine';
import type { Routine } from '@/entities/routine';

export default function RoutinesList() {
  const { data, isError, isLoading } = useRoutines();

  console.log(data?.routines);

  if (isError) return <div>error</div>;

  if (isLoading) return <div> loading</div>;

  return (
    <ul>
      {data?.routines?.map((routine: Routine, idx: number) => (
        <li key={routine.id} className="flex">
          <p>{idx + 1}.</p>
          <h3>{routine.title}</h3>
        </li>
      ))}
    </ul>
  );
}
