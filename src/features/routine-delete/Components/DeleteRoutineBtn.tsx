import React from 'react';
import { useDeleteRoutine } from '@/features/routine-delete';

interface DeleteRoutineBtnProps {
  id: number;
}

export default function DeleteRoutineBtn({ id }: DeleteRoutineBtnProps) {
  const { mutate, isPending } = useDeleteRoutine(id);

  const handleRoutineDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    if (window.confirm('정말 삭제하시겠습니까?')) {
      // 여기서 mutate를 호출하면 API가 실행됩니다!
      mutate(id);
    }
  };

  return (
    <button className="border " onClick={handleRoutineDelete}>
      {isPending ? '삭제중' : '삭제'}
    </button>
  );
}
