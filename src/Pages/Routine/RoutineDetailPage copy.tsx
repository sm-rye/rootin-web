import { useNavigate, useParams } from 'react-router-dom';
import { useRoutineDetail, type DailyStatus } from '@/entities/routine';
import {
  UpdateRoutineBtn,
  UpdateRoutineForm,
  useUpdateRoutineForm,
} from '@/features/routine-update';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Button } from '@/shared/Components';
import { TaskStatusItem } from '@/features/task-toggle';

import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from 'react-icons/md';

export default function RoutineDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedDailyStatus, setSelectedDailyStatus] = useState<
    DailyStatus | undefined
  >();

  const { data: routine, isLoading, isError } = useRoutineDetail(id!);
  const { isEditing, handleRoutineEditBtn, setIsEditing } =
    useUpdateRoutineForm();

  if (isLoading) return <div>상세 정보 로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  if (!routine) return <></>;

  const today = dayjs().format('YYYY-MM-DD');
  const handleRootinDay = (d: DailyStatus) => {
    setSelectedDailyStatus(d);
  };

  const getRingStyle = (idx: number, isCompleted: boolean) => {
    const num = idx + 1;
    return `w-${6 + 4 * idx} h-${6 + 4 * idx} bg-red-${100 * num} z-${50 - idx * 10}`;
  };

  return (
    <article className="flex flex-col gap-2 w-full h-full">
      <header className="flex justify-between">
        <Button
          colorScheme={isEditing ? 'primary' : 'secondary'}
          variant="link"
          onClick={() => {
            isEditing ? setIsEditing(false) : '';
          }}
          className="gap-1"
        >
          <MdOutlineArrowBackIos />
          <p>{isEditing ? '취소' : '루틴으로 돌아가기'}</p>
        </Button>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="gap-x-1 flex justify-between"
          >
            <p>수정</p>
            <MdOutlineArrowForwardIos />
          </Button>
        )}
      </header>

      {isEditing ? (
        <UpdateRoutineForm routine={routine} />
      ) : (
        <div className="bg-secondary-white flex flex-col gap-y-3 p-5 w-full h-full flex-1">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl">{routine.title}</h1>
            <p className="text-gray-600">{routine.description}</p>
          </div>
          <div className="bg-white  flex-1 shadow ">
            <div>
              <h2>목표 달성 링</h2>
              <div className="grid grid-cols-5">
                {routine.daily_status?.map((d) => {
                  const selectedDay = d.date === selectedDailyStatus?.date;
                  return (
                    <>
                      <div key={d.date} className="w-20 h-20 border">
                        <div
                          className={`flex flex-col border ${selectedDay && 'border-red-300'}`}
                          onClick={() => handleRootinDay(d)}
                        >
                          <div>
                            <h3>{d.day}</h3>
                            {today === d.date && (
                              <div className="bg-red-300 rounded text-xs text-white w-fit p-1">
                                오늘
                              </div>
                            )}
                          </div>
                          <div className=" flex items-center justify-center relative">
                            {d.status.map((t, idx) => {
                              if (!selectedDailyStatus) {
                                const initDay = today === d.date;
                                if (initDay) {
                                  handleRootinDay(d);
                                }
                              }
                              return (
                                <div
                                  key={t.task_id}
                                  className={`rounded-full ${getRingStyle(idx, t.isCompleted)} absolute hover:scale-105   cursor-pointer`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            {selectedDailyStatus && (
              <div className="">
                <h2> {selectedDailyStatus.date}의 테스크 </h2>
                <div>
                  {selectedDailyStatus.status.map((t) => (
                    <TaskStatusItem
                      task_id={t.task_id}
                      isCompleted={t.isCompleted}
                      date={selectedDailyStatus.date}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
