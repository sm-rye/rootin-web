import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useRoutineDetail } from '@/entities/routine';
import { Loading, Error, Empty } from '@/shared/Components';
import {
  RoutineDetailHeader,
  OverallProgressBar,
} from '@/widgets/routine-detail';

import { UpdateRoutineForm } from '@/features/routine-update';

import { TaskRingDisplay } from '@/widgets/task-ring';
import { TaskCheckBox, useDailyToggleTask } from '@/features/task-toggle';
import { formatDate, getDDay } from '@/shared/lib/date';

export default function RoutineDetailPage() {
  const [isEditingRoutine, setIsEditingRoutine] = useState(false);

  const { id } = useParams();
  const { data: routine, isLoading, isError } = useRoutineDetail(id!);
  const { selectedDayTaskStaus, setSelectedDayTaskStaus } = useDailyToggleTask(
    routine?.daily_status,
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (!routine) return <Empty />;

  const isCompleted = routine.isCompleted ?? false;
  const { description, start_date, end_date, duration_days, tasks } =
    routine;
  const dDay = getDDay(end_date);

  {
    /*
      모바일: overflow-y-auto → 자연스러운 페이지 스크롤
      데스크탑(lg+): overflow-hidden → 뷰포트에 고정, 내부에서만 스크롤
    */
  }
  return (
    <div className="w-full h-full flex flex-col overflow-y-auto lg:overflow-hidden lg:px-36 overflow-x-hidden">
      {/* 앱바 */}
      <RoutineDetailHeader
        routine={routine}
        isEditingRoutine={!isCompleted && isEditingRoutine}
        setIsEditingRoutine={isCompleted ? () => {} : setIsEditingRoutine}
        isCompleted={isCompleted}
      />

      {/* 콘텐츠 영역 — 데스크탑에서만 flex-1 min-h-0으로 남은 높이 채움 */}
      <div className="flex flex-col p-5 pt-2 lg:flex-1 lg:min-h-0 lg:overflow-hidden">
        {/* 메타 정보 — 뷰 모드에서만 */}
        {!isEditingRoutine && (
          <div className="pt-1 lg:shrink-0">
            {/* {title && (
              <h1 className="mt-1.5 text-xl text-gray-800 font-bold">
                {title}
              </h1>
            )} */}
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
          </div>
        )}

        {/* 뷰/수정 모드 — 데스크탑: flex-1로 남은 높이 채움 */}
        <div className="relative mt-3 lg:flex-1 lg:min-h-0 lg:overflow-hidden">
          {/* 뷰 모드 */}
          <div
            className="h-full flex flex-col gap-3 transition-all duration-300 ease-in-out"
            style={{
              transform: isEditingRoutine
                ? 'translateX(-100%)'
                : 'translateX(0)',
              opacity: isEditingRoutine ? 0 : 1,
              position: isEditingRoutine ? 'absolute' : 'relative',
              inset: isEditingRoutine ? 0 : undefined,
              width: '100%',
            }}
          >
            {/* 전체 달성률 — 전체 너비 행 */}
            <OverallProgressBar dailyStatus={routine?.daily_status} />

            {/* 두 컬럼 — 데스크탑: 좌우, 모바일: 세로 */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row lg:gap-10">
              {/* 좌: 링 캘린더 */}
              <div className="lg:w-1/2 lg:h-full lg:overflow-y-auto ">
                <TaskRingDisplay
                  taskDailyStatus={routine?.daily_status}
                  tasks={routine?.tasks}
                  selectedDayTaskStaus={selectedDayTaskStaus}
                  setSelectedDayTaskStaus={setSelectedDayTaskStaus}
                />
              </div>

              {/* 우: 태스크 체크박스 */}
              <div className="mt-7.5 lg:mt-0 lg:flex-1 lg:h-full lg:overflow-y-auto ">
                <TaskCheckBox
                  selectedDayTaskStaus={selectedDayTaskStaus}
                  tasks={routine?.tasks}
                  isCompleted={isCompleted}
                />
              </div>
            </div>
          </div>

          {/* 수정 모드 */}
          <div
            className="h-full overflow-y-auto transition-all duration-300 ease-in-out"
            style={{
              transform: isEditingRoutine
                ? 'translateX(0)'
                : 'translateX(100%)',
              opacity: isEditingRoutine ? 1 : 0,
              position: !isEditingRoutine ? 'absolute' : 'relative',
              inset: !isEditingRoutine ? 0 : undefined,
              width: '100%',
            }}
          >
            <UpdateRoutineForm routine={routine} />
          </div>
        </div>
      </div>
    </div>
  );
}
