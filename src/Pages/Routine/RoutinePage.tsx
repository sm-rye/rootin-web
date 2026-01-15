import React from 'react';
import { RoutineList } from '@/widgets/routine-list';
import { useRoutines } from '@/entities/routine';

export default function RoutinePage() {
  const { data, isError, isLoading } = useRoutines();

  if (isError) return <div>error</div>;
  if (isLoading) return <div> loading</div>;

  return (
    <div className=" w-full h-full p-5 lg:p-10 flex flex-col">
      <header className="flex flex-col gap-y-2 py-2.5">
        <h1 className="text-4xl font-semibold md:text-5xl ">내 루틴</h1>
        <h4 className="text-lg">blah blah 루틴어쩌고 해보세요!</h4>
      </header>
      <hr className="border border-red-300 mb-3 mt-1.5" />

      <section className="py-2.5 md:py-5 flex-1  flex flex-col gap-y-3">
        <h4 className="text-xl font-semibold">현재 진행 중인 루틴</h4>

        {data?.routines && <RoutineList routines={data?.routines} />}
      </section>

      <section className="py-2.5 md:py-5 flex-1  flex flex-col gap-y-3">
        <h4 className="text-xl font-semibold">완료/종료된 루틴</h4>
        <article>Empty</article>
        {/* {data?.routines && <RoutineList routines={data?.routines} />} */}
      </section>
    </div>
  );
}
