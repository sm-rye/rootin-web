import React from 'react';

import { IoIosArrowRoundBack } from 'react-icons/io';

import { RoutineCreateForm } from '@/features/routine-add';
import { PageHeader } from '@/shared/Components';

export default function RoutineCreatePage() {
  return (
    <div className="w-full h-full flex flex-col p-5">
      <header>
        <h1>새 루틴 등록</h1>
      </header>
      <hr />
      <RoutineCreateForm />
    </div>
  );
}
