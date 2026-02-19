import React from 'react';

import { useNavigate } from 'react-router-dom';

import type { Routine } from '@/entities/routine';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { useDeleteRoutine } from '@/features/routine-delete';
import { useConfirmStore } from '@/shared/model/useConfirmStore';

type RoutineDetailHeaderProps = {
  routine: Routine;
  isEditingRoutine: boolean;
  setIsEditingRoutine: React.Dispatch<React.SetStateAction<boolean>>;
  isCompleted?: boolean;
};

export default function RoutineDetailHeader({
  routine,
  isEditingRoutine,
  setIsEditingRoutine,
  isCompleted = false,
}: RoutineDetailHeaderProps) {
  const navigate = useNavigate();
  const { mutate: deleteRoutine, isPending: isDeleting } = useDeleteRoutine();
  const openConfirm = useConfirmStore((s) => s.openConfirm);

  const { title } = routine;

  const handleBack = () => {
    if (isEditingRoutine) {
      setIsEditingRoutine(false);
    } else {
      navigate('/routines');
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    openConfirm('이 루틴을 정말 삭제하시겠습니까?', () =>
      deleteRoutine(routine.id),
    );
  };

  return (
    <nav className="flex items-center h-16 px-2 bg-white border-b border-gray-200 shrink-0">
      {/* 뒤로가기 */}
      <button
        type="button"
        onClick={handleBack}
        className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors shrink-0"
      >
        <MdOutlineArrowBackIos size={18} />
      </button>

      {/* 타이틀 — 중앙 */}
      <span className="flex-1 text-center text-2xl font-semibold text-gray-800 truncate px-2">
        {isEditingRoutine ? '루틴 수정' : title}
      </span>

      {/* 액션 버튼 */}
      <div className="w-10 h-10 flex items-center justify-end shrink-0">
        {!isEditingRoutine &&
          (isCompleted ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-sm text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
            >
              {isDeleting ? '삭제중' : '삭제'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingRoutine(true)}
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              수정
            </button>
          ))}
      </div>
    </nav>
  );
}
