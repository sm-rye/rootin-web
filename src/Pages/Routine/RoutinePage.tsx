import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';

import { RoutineList } from '@/widgets/routine-list';
import { useRoutines, type Routine } from '@/entities/routine';
import { Button, Input } from '@/shared/Components';

type SortOption = 'newest' | 'oldest' | 'name';
type FilterOption = 'active' | 'completed';

function isRoutineCompleted(routine: Routine): boolean {
  if (routine.completion_rate === 100) return true;
  if (!routine.end_date) return false;
  return dayjs().isAfter(dayjs(routine.end_date));
}

export default function RoutinePage() {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useRoutines();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('newest');
  const [filter, setFilter] = useState<FilterOption>('active');

  const filteredRoutines = useMemo(() => {
    if (!data?.routines) return [];

    let result = data.routines;

    // Filter by search
    if (search.trim()) {
      const keyword = search.trim().toLowerCase();
      result = result.filter((r) =>
        r.title.toLowerCase().includes(keyword),
      );
    }

    // Filter by active/completed
    result = result.filter((r) =>
      filter === 'completed' ? isRoutineCompleted(r) : !isRoutineCompleted(r),
    );

    // Sort
    result = [...result].sort((a, b) => {
      if (sort === 'newest') {
        return (
          dayjs(b.start_date).valueOf() - dayjs(a.start_date).valueOf()
        );
      }
      if (sort === 'oldest') {
        return (
          dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf()
        );
      }
      return a.title.localeCompare(b.title);
    });

    return result;
  }, [data?.routines, search, sort, filter]);

  if (isError) return <div>error</div>;
  if (isLoading) return <div> loading</div>;

  return (
    <div className="w-full h-full flex flex-col">
      <header className="flex flex-col gap-y-2 p-2.5 h-24 justify-center">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-1.5 text-2xl h-full flex items-center justify-center">
              <IoMdSearch />
            </span>
            <Input
              inputId="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-neutral-50 px-10"
              placeHolder="루틴 검색"
            />
          </div>
          <select
            className="w-34 px-2 border border-gray-300 rounded-sm bg-white focus:border-gray-400"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          >
            <option value="newest">정렬 : 최신순</option>
            <option value="oldest">정렬 : 오래된순</option>
            <option value="name">정렬 : 이름순</option>
          </select>
        </div>
      </header>
      <hr className="border-b border-gray-200 my-3 mt-1.5" />

      <section className="w-full h-full bg-secondary-white flex-1">
        <div className="flex justify-between items-center p-3">
          <div className="flex gap-x-5">
            <div
              className={`text-md font-semibold p-1 ${filter === 'active' ? 'border-b-2 border-primary' : 'text-neutral-400'}`}
            >
              <button onClick={() => setFilter('active')}>
                진행 중인 루틴
              </button>
            </div>
            <div
              className={`text-md font-semibold p-1 ${filter === 'completed' ? 'border-b-2 border-primary' : 'text-neutral-400'}`}
            >
              <button onClick={() => setFilter('completed')}>
                종료된 루틴
              </button>
            </div>
          </div>
          {filter === 'active' && (
            <Button
              variant="dashed"
              size="sm"
              onClick={() => navigate('/routines/new')}
            >
              + 루틴 추가
            </Button>
          )}
        </div>
        <div>
          <RoutineList routines={filteredRoutines} filter={filter} />
        </div>
      </section>
    </div>
  );
}
