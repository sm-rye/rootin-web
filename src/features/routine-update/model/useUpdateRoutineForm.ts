import * as React from 'react';
import { useState } from 'react';
import type { Routine } from '@/entities/routine';

export default function useUpdateRoutineForm() {
  const [routineInfo, setRoutineInfo] = useState<Routine | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    duration_days: '',
  });

  const handleRoutineEditBtn = () => {
    setIsEditing((prev) => !prev);
  };

  const handleRoutineInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    if (id === 'duration_days') {
      const num = Number(value);
      setErrors((prev) => ({
        ...prev,
        duration_days:
          num < 1 || num > 365 ? '기간은 1일 이상 365일 이하로 입력해주세요.' : '',
      }));
    }

    setRoutineInfo((prev) =>
      prev
        ? { ...prev, [id]: id === 'duration_days' ? Number(value) : value }
        : prev,
    );
  };

  return {
    isEditing,
    routineInfo,
    errors,
    setIsEditing,
    setErrors,
    handleRoutineEditBtn,
    setRoutineInfo,
    handleRoutineInputChange,
  };
}
