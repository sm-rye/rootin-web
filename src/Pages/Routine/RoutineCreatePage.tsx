import React from 'react';

import { RoutineCreateForm } from '@/features/routine-add';
import { PageHeader } from '@/shared/Components';

export default function RoutineCreatePage() {
  return (
    <div className="w-full h-full flex flex-col p-5">
      <PageHeader
        mainText="새 루틴 등록"
        subText="목표를 일상의 루틴으로 만들어보세요."
      />
      <RoutineCreateForm />
    </div>
  );
}
