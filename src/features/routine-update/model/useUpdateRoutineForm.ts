import * as React from 'react';
import { useState } from 'react';
import type { Routine } from '@/entities/routine';

export default function useUpdateRoutineForm() {
  const [routineInfo, setRoutineInfo] = useState<Routine | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
  });

  const handleRoutineEditBtn = () => {
    setIsEditing((prev) => !prev);
  };

  const handleRoutineInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

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
