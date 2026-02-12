import { Empty } from '@/shared/Components';

import TaskStatusItem from './TaskStatusItem';
import type { Task } from '@/entities/task';
import type { DailyStatus } from '@/entities/routine';

interface TaskCheckBoxProps {
  selectedDayTaskStaus: DailyStatus | undefined;
  tasks: Task[] | undefined;
  isCompleted?: boolean;
}

export default function TaskCheckBox({
  selectedDayTaskStaus,
  tasks,
  isCompleted = false,
}: TaskCheckBoxProps) {
  if (!selectedDayTaskStaus) return <div>종료된 루틴입니다</div>;
  if (!tasks) return <Empty />;

  const dateLabel = selectedDayTaskStaus.date;

  const completedCount = selectedDayTaskStaus.status.filter(
    (t) => t.isCompleted,
  ).length;
  const totalCount = tasks.length;
  const allDone = totalCount > 0 && completedCount === totalCount;

  return (
    <section className="px-4 pb-24">
      <h2 className="text-base font-bold text-foreground">
        {isCompleted ? '최종 결과' : '오늘의 체크리스트'}
      </h2>
      <p className="mt-0.5 text-xs text-gray-400">
        {isCompleted
          ? '이 루틴은 종료되었습니다'
          : '태스크를 완료하면 링에 반영돼요'}
      </p>
      {/* Card */}
      <article
        className={[
          'overflow-hidden rounded-2xl border bg-white',
          allDone ? 'border-primary/30' : 'border-muted',
          'shadow-[0_8px_24px_rgba(17,24,39,0.08)]',
          'mt-3 transition-all duration-300',
        ].join(' ')}
      >
        {/* Header */}
        <header
          className={[
            'flex items-start justify-between gap-3 border-b px-4 py-3',
            'border-muted',
            allDone ? 'bg-primary/5' : 'bg-background',
            'transition-all duration-300',
          ].join(' ')}
        >
          <div>
            <p className="text-xs font-medium text-muted">선택된 날짜</p>

            <div className="mt-1 flex items-center gap-2">
              <span
                className={['text-sm font-semibold text-foreground'].join(' ')}
              >
                {dateLabel}
              </span>

              <span className="text-sm text-muted">
                {completedCount}/{totalCount} 완료
              </span>
            </div>
          </div>

          {/* Status badge */}
          <span
            className={[
              'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
              allDone
                ? 'bg-[#EA4C89]/10 text-primary'
                : 'bg-[#F4F4F4] text-[#444444]',
            ].join(' ')}
          >
            {allDone ? '완성' : '미완성'}
          </span>
        </header>

        {/* Body */}
        <div className="px-4 py-4">
          <h3 className="text-base font-semibold text-foreground">
            오늘의 테스크
          </h3>
          <p className="mt-1 text-sm text-muted">
            아래 체크가 <span className="font-medium text-foreground">링</span>
            에 반영돼요.
          </p>

          <div className="mt-4 divide-y divide-primary-gray gap-2">
            {selectedDayTaskStaus.status.map((t) => {
              const currTask = tasks.find((el) => el.id === Number(t.task_id));
              if (!currTask) return null;

              return (
                <TaskStatusItem
                  key={t.task_id}
                  task_id={Number(t.task_id)}
                  isCompleted={t.isCompleted}
                  date={selectedDayTaskStaus.date}
                  name={currTask.name}
                  disabled={isCompleted}
                />
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer
          className={[
            'flex items-center justify-between gap-3 border-t bg-white px-4 py-3',
            'border-muted',
          ].join(' ')}
        >
          <div className="text-sm text-muted">
            {allDone ? (
              <span className="font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                모든 테스크 완료!
              </span>
            ) : (
              <span>
                완료까지{' '}
                <span className="font-semibold text-foreground">
                  {totalCount - completedCount}
                </span>
                개 남음
              </span>
            )}
          </div>
        </footer>
      </article>
    </section>
  );
}
