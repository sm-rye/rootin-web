import React from 'react';

import { useNavigate } from 'react-router-dom';

import type { Routine } from '@/entities/routine';

import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from 'react-icons/md';

import { DeleteRoutineBtn } from '@/features/routine-delete';

type RoutineDetailHeaderProps = {
  routine: Routine;
  isEditingRoutine: boolean;
  setIsEditingRoutine: React.Dispatch<React.SetStateAction<boolean>>;
  isCompleted?: boolean;
};

function formatDate(date: Date | undefined) {
  if (!date) return '';
  const d = new Date(date);
  return `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function getDDay(endDate: Date | undefined) {
  if (!endDate) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  const diff = Math.ceil(
    (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diff < 0) return '종료';
  if (diff === 0) return 'D-Day';
  return `D-${diff}`;
}

export default function RoutineDetailHeader({
  routine,
  isEditingRoutine,
  setIsEditingRoutine,
  isCompleted = false,
}: RoutineDetailHeaderProps) {
  const navigate = useNavigate();
  const { title, description, start_date, end_date, duration_days, tasks } =
    routine;

  const dDay = getDDay(end_date);

  return (
    <header className="bg-white px-4">
      {/* 네비게이션 행: 뒤로가기 / 수정(or 돌아가기) */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            isEditingRoutine
              ? setIsEditingRoutine(false)
              : navigate('/routines')
          }
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <MdOutlineArrowBackIos size={12} />
          <span>{isEditingRoutine ? '루틴으로 돌아가기' : '루틴 목록'}</span>
        </button>

        {!isEditingRoutine &&
          (isCompleted ? (
            <DeleteRoutineBtn id={routine.id} />
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingRoutine(true)}
              className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span>수정</span>
              <MdOutlineArrowForwardIos size={12} />
            </button>
          ))}
      </div>

      {/* 타이틀 + 메타 (뷰 모드에서만) */}
      {!isEditingRoutine && (
        <div className="mt-3">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && (
            <p className="mt-1.5 text-sm text-gray-500">{description}</p>
          )}

          {isCompleted && (
            <div
              className={[
                'mt-3 flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium',
                routine.completion_rate === 100
                  ? 'bg-primary/10 text-primary'
                  : 'bg-gray-100 text-gray-500',
              ].join(' ')}
            >
              <span className="text-base">
                {routine.completion_rate === 100 ? '🎉' : '📋'}
              </span>
              <span>
                {routine.completion_rate === 100
                  ? `축하합니다! 루틴을 완주했어요 (달성률 ${routine.completion_rate}%)`
                  : `기간이 만료된 루틴입니다 (달성률 ${routine.completion_rate ?? 0}%)`}
              </span>
            </div>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-gray-400">
            {start_date && (
              <span>
                {formatDate(start_date)}
                {end_date ? ` ~ ${formatDate(end_date)}` : ''}
              </span>
            )}
            {tasks && tasks.length > 0 && (
              <>
                <span>·</span>
                <span>태스크 {tasks.length}개</span>
              </>
            )}
            {duration_days && (
              <>
                <span>·</span>
                <span>{duration_days}일 목표</span>
              </>
            )}
            {dDay && (
              <span className="ml-1 text-xs font-semibold text-primary bg-red-50 px-2 py-1 rounded-full">
                {dDay}
              </span>
            )}
          </div>

          {/* 4. 구분선 */}
          <div className="mt-4 border-b border-gray-200" />
        </div>
      )}
    </header>
  );
}
