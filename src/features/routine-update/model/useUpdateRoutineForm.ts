import * as React from 'react';
import { useState } from 'react';
import type { Routine } from '@/entities/routine';

export default function useUpdateRoutineForm() {
  const [routineInfo, setRoutineInfo] = useState<Routine | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  const handleRoutineEditBtn = () => {
    setIsEditing(true);
  };

  const handleRoutineInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setRoutineInfo((prev) => (prev ? { ...prev, [id]: value } : prev));
  };

  return {
    isEditing,
    setIsEditing,
    routineInfo,
    handleRoutineEditBtn,
    setRoutineInfo,
    handleRoutineInputChange,
  };
}
