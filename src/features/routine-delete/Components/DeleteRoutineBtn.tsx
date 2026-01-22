import React from 'react';
import { useDeleteRoutine } from '@/features/routine-delete';
import { Button } from '@/shared/Components';

interface DeleteRoutineBtnProps {
  id: number;
}

export default function DeleteRoutineBtn({ id }: DeleteRoutineBtnProps) {
  const { mutate, isPending } = useDeleteRoutine();

  const handleRoutineDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    if (window.confirm('정말 삭제하시겠습니까?')) {
      mutate(id);
    }
  };

  return (
    <Button onClick={handleRoutineDelete} type="button" variant="outline">
      {isPending ? '삭제중' : '삭제'}
    </Button>
  );
}
