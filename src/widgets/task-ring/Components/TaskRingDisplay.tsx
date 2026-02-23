import type { DailyStatus } from '@/entities/routine';
import type { Task } from '@/entities/task';
import { Empty } from '@/shared/Components';
import React from 'react';

const completedColors = ['#EA4C89', '#00B6E3', '#8ABA56', '#FF8833'];

interface TaskRingDisplayProps {
  taskDailyStatus: DailyStatus[] | undefined;
  tasks: Task[] | undefined;
  selectedDayTaskStaus: DailyStatus | undefined;
  setSelectedDayTaskStaus: React.Dispatch<
    React.SetStateAction<DailyStatus | undefined>
  >;
}

export default function TaskRingDisplay({
  taskDailyStatus,
  tasks,
  selectedDayTaskStaus,
  setSelectedDayTaskStaus,
}: TaskRingDisplayProps) {
  if (!taskDailyStatus?.length) return <Empty />;

  const handleDayBoxClick = (dayStatus: DailyStatus) =>
    setSelectedDayTaskStaus(dayStatus);

  // 링 스타일: task idx 별로 바깥→안쪽 링
  const getRingStyle = (idx: number, isCompleted: boolean) => {
    const size = Math.max(4, 38 - idx * 9);
    const border = 4;

    const ringColor = isCompleted
      ? completedColors[idx % completedColors.length]
      : '#E5E7EB';

    return {
      width: `${size}px`,
      height: `${size}px`,
      borderWidth: `${border}px`,
      borderColor: ringColor,
      backgroundColor: 'transparent',
      zIndex: 10 + idx,
    } as React.CSSProperties;
  };

  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');
  const isToday = (d: DailyStatus) => d.date === today;
  const isSelected = (d: DailyStatus) => d.date === selectedDayTaskStaus?.date;

  return (
    <section className="lg:h-full lg:flex lg:flex-col">
      <h2 className="text-xl font-bold text-foreground">달성 현황</h2>
      <p className="mt-0.5 text-sm text-gray-400">
        일별 태스크 완료 상태를 링으로 확인하세요
      </p>

      {/* 색상 범례 */}
      {tasks && tasks.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {tasks.map((task, idx) => (
            <div key={task.id} className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor:
                    completedColors[idx % completedColors.length],
                }}
              />
              <span className="text-xs text-gray-500">{task.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* 100일 대응: 스크롤 영역 (그리드 유지) */}
      <div
        className="
          mt-3 max-h-80 lg:max-h-none lg:flex-1 overflow-auto rounded-2xl
          border border-[#E5E7EB] bg-white px-3 py-8
        "
      >
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
          }}
        >
          {taskDailyStatus.map((d) => {
            const selected = isSelected(d);
            const today_ = isToday(d);

            return (
              <button
                key={d.date}
                type="button"
                onClick={() => handleDayBoxClick(d)}
                className={[
                  'group relative rounded-xl p-2 text-left transition-all duration-200',
                  'bg-background hover:bg-white hover:border hover:border-primary/30 hover:shadow-[0_3px_8px_rgba(234,76,137,0.18)]',
                  'border',
                  selected
                    ? 'border-primary shadow-[0_6px_16px_rgba(234,76,137,0.18)]'
                    : today_
                      ? 'border-primary/40'
                      : 'border-transparent',
                  selected ? 'ring-2 ring-primary/25' : 'ring-0',
                ].join(' ')}
                aria-pressed={selected}
                aria-current={today_ ? 'date' : undefined}
              >
                {/* 호버 날짜 툴팁 */}
                <span
                  className="
                    pointer-events-none absolute left-1/2 -translate-x-1/2 -top-8
                    rounded-md bg-gray-800 px-2 py-1
                    text-[10px] font-medium text-white whitespace-nowrap
                    opacity-0 scale-95 transition-all duration-150
                    group-hover:opacity-100 group-hover:scale-100
                    z-200
                  "
                >
                  {d.date}
                </span>

                {/* day number */}
                <div className="flex items-center justify-between">
                  <span
                    className={[
                      'text-xs font-medium',
                      selected || today_ ? 'text-primary' : 'text-foreground',
                    ].join(' ')}
                  >
                    {d.day}
                  </span>
                  {today_ && (
                    <span className="text-[9px] font-semibold text-white bg-primary rounded-full px-1.5 py-1 leading-none">
                      오늘
                    </span>
                  )}
                </div>

                {/* rings */}
                <div className="mt-2 flex h-12 items-center justify-center">
                  <div className="relative h-12 w-12">
                    {d.status.map((t, idx) => (
                      <span
                        key={`${d.date}-${t.task_id}-${idx}`}
                        className="absolute left-1/2 top-1/2 rounded-full transition-all duration-200"
                        style={{
                          ...getRingStyle(idx, t.isCompleted),
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* 미니 요약: 완료 개수 */}
                <div className="flex justify-center mt-2 text-[11px] text-[#9BA5A8]">
                  {d.status.filter((s) => s.isCompleted).length}/
                  {d.status.length}
                </div>

                {/* 키보드/접근성 포커스 */}
                <span className="pointer-events-none absolute inset-0 rounded-xl group-focus-visible:ring-2 group-focus-visible:ring-primary/40" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
