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

  const { title } = routine;

  return (
    <div className="w-full h-full flex flex-col  gap-y-10 p-5 lg:px-20 lg:py-10">
      <RoutineDetailHeader
        title={title}
        description={routine?.description}
        isEditingRoutine={isEditingRoutine}
        setIsEditingRoutine={setIsEditingRoutine}
      />
      {isEditingRoutine ? (
        <>
          <UpdateRoutineForm routine={routine} />
        </>
      ) : (
        <div className="flex-1 flex flex-col gap-y-5">
          <TaskRingDisplay
            taskDailyStatus={routine?.daily_status}
            selectedDayTaskStaus={selectedDayTaskStaus}
            setSelectedDayTaskStaus={setSelectedDayTaskStaus}
          />
          <TaskCheckBox
            selectedDayTaskStaus={selectedDayTaskStaus}
            tasks={routine?.tasks}
          />
        </div>
      )}
    </div>
  );
}
