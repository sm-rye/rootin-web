import type { DailyStatus } from '@/entities/routine';
import { Empty } from '@/shared/Components';
import React from 'react';

interface TaskRingDisplayProps {
  taskDailyStatus: DailyStatus[] | undefined;
  selectedDayTaskStaus: DailyStatus | undefined;
  setSelectedDayTaskStaus: React.Dispatch<
    React.SetStateAction<DailyStatus | undefined>
  >;
}

export default function TaskRingDisplay({
  taskDailyStatus,
  selectedDayTaskStaus,
  setSelectedDayTaskStaus,
}: TaskRingDisplayProps) {
  if (!taskDailyStatus?.length) return <Empty />;

  const handleDayBoxClick = (dayStatus: DailyStatus) =>
    setSelectedDayTaskStaus(dayStatus);

  // 링 스타일: task idx 별로 바깥→안쪽 링
  // idx 0: outer, idx 1: middle, idx 2: inner ...
  const getRingStyle = (idx: number, isCompleted: boolean) => {
    // size는 px 단위로 확실히 고정 (Tailwind 동적 클래스 회피)
    const size = 38 - idx * 9; // 38, 29, 20 ... (task 4개면 마지막은 더 작아짐)
    const border = 4; // 링 두께

    // Dribbble Pink 기반. 완료/미완료 대비를 명확히.
    const completedColors = ['#EA4C89', '#00B6E3', '#8ABA56', '#FF8833']; // 핑크/블루/그린/오렌지
    const ringColor = isCompleted
      ? completedColors[idx % completedColors.length]
      : '#E5E7EB';

    return {
      width: `${size}px`,
      height: `${size}px`,
      borderWidth: `${border}px`,
      borderColor: ringColor,
      // 도넛 링 느낌
      backgroundColor: 'transparent',
      // 쌓이는 순서: 바깥 링이 아래, 안쪽 링이 위로
      zIndex: 10 + idx,
    } as React.CSSProperties;
  };

  const isSelected = (d: DailyStatus) => d.date === selectedDayTaskStaus?.date;

  return (
    <section className="px-4">
      <h2 className="text-sm font-semibold text-foreground">목표 달성 링</h2>

      {/* 100일 대응: 스크롤 영역 (그리드 유지) */}
      <div
        className="
          mt-3 max-h-80 overflow-auto rounded-2xl
          border border-[#E5E7EB] bg-white p-3
        "
      >
        <div className="grid grid-cols-7 gap-2 sm:grid-cols-8">
          {taskDailyStatus.map((d) => {
            const selected = isSelected(d);

            return (
              <button
                key={d.date}
                type="button"
                onClick={() => handleDayBoxClick(d)}
                className={[
                  'group relative rounded-xl p-2 text-left transition',
                  'bg-background hover:bg-white',
                  'border',
                  selected
                    ? 'border-primary shadow-[0_6px_16px_rgba(234,76,137,0.18)]'
                    : 'border-transparent',
                  selected ? 'ring-2 ring-primary/25' : 'ring-0',
                ].join(' ')}
                aria-pressed={selected}
              >
                {/* day number */}
                <div className="flex items-center justify-between">
                  <span
                    className={[
                      'text-xs font-medium',
                      selected ? 'text-primary' : 'text-foreground',
                    ].join(' ')}
                  >
                    {d.day}
                  </span>

                  {/* 선택 뱃지(선택된 날짜임을 명확히) */}
                  {/* {selected && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary" />
                  )} */}
                </div>

                {/* rings */}
                <div className="mt-2 flex h-12 items-center justify-center">
                  <div className="relative h-12 w-12">
                    {/* 바깥 → 안쪽 링 순서로 렌더 (idx 작을수록 바깥) */}
                    {d.status.map((t, idx) => (
                      <span
                        key={`${d.date}-${t.task_id}-${idx}`}
                        className="absolute left-1/2 top-1/2 rounded-full"
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
