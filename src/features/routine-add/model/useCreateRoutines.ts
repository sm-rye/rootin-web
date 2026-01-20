import React, { useState } from 'react';
import type { RoutineInfo } from '@/entities/routine';

export default function useCreateRoutines() {
  const DEFAULT_DURATION = 7;

  const [routineInfo, setRoutineInfo] = useState<RoutineInfo>({
    title: '',
    description: '',
    duration_days: DEFAULT_DURATION,
  });

  const changeRoutineInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    setRoutineInfo((prev) => ({
      ...prev,
      [id]: id === 'duration_days' ? Number(value) : value,
    }));
  };

  return {
    routineInfo,
    changeRoutineInput,
  };
}
