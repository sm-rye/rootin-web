import React, { useState } from 'react';
import type { RoutineInfo } from '@/entities/routine';

export default function useCreateRoutines() {
  const DEFAULT_DURATION = 7;

  const [routineInfo, setRoutineInfo] = useState<RoutineInfo>({
    title: '',
    description: '',
    duration_days: DEFAULT_DURATION,
  });
  const [errors, setErrors] = useState({
    title: '',
    duration_days: '',
  });

  const changeRoutineInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    if (id === 'title') setErrors((prev) => ({ ...prev, title: '' }));

    if (id === 'duration_days') {
      const num = Number(value);
      if (num < 1 || num > 365) {
        setErrors((prev) => ({
          ...prev,
          duration_days: '기간은 1일 이상 365일 이하로 입력해주세요.',
        }));
      } else {
        setErrors((prev) => ({ ...prev, duration_days: '' }));
      }
    }

    setRoutineInfo((prev) => ({
      ...prev,
      [id]: id === 'duration_days' ? Number(value) : value,
    }));
  };

  return {
    routineInfo,
    errors,
    setErrors,
    changeRoutineInput,
  };
}
