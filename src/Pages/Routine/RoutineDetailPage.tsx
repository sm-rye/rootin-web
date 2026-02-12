import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useRoutineDetail } from '@/entities/routine';
import { Loading, Error, Empty } from '@/shared/Components';
import { RoutineDetailHeader } from '@/widgets/routine-detail';

import { UpdateRoutineForm } from '@/features/routine-update';

import { TaskRingDisplay } from '@/widgets/task-ring';
import { TaskCheckBox, useDailyToggleTask } from '@/features/task-toggle';

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

  return (
    <div className="w-full h-full overflow-y-auto p-5 lg:px-36 lg:py-10">
      <RoutineDetailHeader
        routine={routine}
        isEditingRoutine={!isCompleted && isEditingRoutine}
        setIsEditingRoutine={isCompleted ? () => {} : setIsEditingRoutine}
        isCompleted={isCompleted}
      />

      <div className="relative mt-5 overflow-x-hidden overflow-y-auto  min-h-0">
        {/* 뷰 모드 */}
        <div
          className="flex flex-col gap-y-7.5 transition-all duration-300 ease-in-out"
          style={{
            transform: isEditingRoutine ? 'translateX(-100%)' : 'translateX(0)',
            opacity: isEditingRoutine ? 0 : 1,
            position: isEditingRoutine ? 'absolute' : 'relative',
            inset: isEditingRoutine ? 0 : undefined,
            width: '100%',
          }}
        >
          <TaskRingDisplay
            taskDailyStatus={routine?.daily_status}
            tasks={routine?.tasks}
            selectedDayTaskStaus={selectedDayTaskStaus}
            setSelectedDayTaskStaus={setSelectedDayTaskStaus}
          />
          <TaskCheckBox
            selectedDayTaskStaus={selectedDayTaskStaus}
            tasks={routine?.tasks}
            isCompleted={isCompleted}
          />
        </div>

        {/* 수정 모드 */}
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            transform: isEditingRoutine ? 'translateX(0)' : 'translateX(100%)',
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
  );
}
