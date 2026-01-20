import React from 'react';

import { IoMdSearch } from 'react-icons/io';

import { RoutineList } from '@/widgets/routine-list';
import { useRoutines } from '@/entities/routine';
import { Button, Input } from '@/shared/Components';

export default function RoutinePage() {
  const { data, isError, isLoading } = useRoutines();

  if (isError) return <div>error</div>;
  if (isLoading) return <div> loading</div>;

  return (
    <div className=" w-full h-full flex flex-col">
      <header className="flex flex-col gap-y-2 p-2.5 h-24 justify-center">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-1.5 text-2xl  h-full flex items-center justify-center">
              <IoMdSearch />
            </span>
            <Input
              inputId="search"
              value={''}
              className="bg-neutral-50 px-10"
              placeHolder="루틴 검색"
            />
          </div>
          {/* todo: 정렬은 셀렉트의 default value로 */}
          <select className="w-34  px-2 border border-gray-300 rounded-sm bg-white focus:border-gray-400 ">
            <option>정렬 : a</option>
            <option>정렬 : b</option>
          </select>
        </div>
      </header>
      <hr className="border-b  border-gray-200 my-3 mt-1.5" />

      <section className="w-full h-full bg-secondary-white flex-1">
        {/* 헤더 - 루틴 필터, 루틴 추가  */}
        <div className="flex justify-between items-center p-3">
          <div className="flex gap-x-5">
            <div className="text-md font-semibold border-b-2 border-primary p-1">
              <button>진행 중인 루틴</button>
            </div>
            <div className="text-md font-semibold p-1 text-neutral-400">
              <button>종료된 루틴</button>
            </div>
          </div>
          <div>
            <Button>+ 새 루틴 추가</Button>
          </div>
        </div>
        <div>{data?.routines && <RoutineList routines={data?.routines} />}</div>
      </section>
    </div>
  );
}
