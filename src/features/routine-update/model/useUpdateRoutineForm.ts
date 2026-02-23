import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Routine } from '@/entities/routine';
import { validateDuration } from '@/entities/routine';

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

  const handleRoutineInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    if (id === 'duration_days') {
      setErrors((prev) => ({
        ...prev,
        duration_days: validateDuration(Number(value)),
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
