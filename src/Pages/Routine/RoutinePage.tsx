import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';

import { RoutineList } from '@/widgets/routine-list';
import { useRoutines } from '@/entities/routine';
import { Button, Input, Pagination, Loading, Error } from '@/shared/Components';

type SortOption = 'newest' | 'oldest' | 'name';
type FilterOption = 'active' | 'completed';

const PAGE_SIZE = 6;

export default function RoutinePage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('newest');
  const [filter, setFilter] = useState<FilterOption>('active');

  const { data, isError, isLoading } = useRoutines(
    page,
    PAGE_SIZE,
    filter,
    sort,
  );

  const totalPages = data?.pagination?.totalPages ?? 1;
  const activeCount = data?.counts?.active ?? 0;
  const completedCount = data?.counts?.completed ?? 0;

  const handleFilterChange = (newFilter: FilterOption) => {
    setFilter(newFilter);
    setPage(1);
  };

  const displayedRoutines = useMemo(() => {
    if (!data?.routines) return [];

    if (!search.trim()) return data.routines;

    const keyword = search.trim().toLowerCase();
    return data.routines.filter((r) => r.title.toLowerCase().includes(keyword));
  }, [data?.routines, search]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <header className="flex flex-col gap-y-2 p-2.5 lg:px-8 h-24 justify-center">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-1.5 text-2xl h-full flex items-center justify-center">
              <IoMdSearch />
            </span>
            <Input
              inputId="search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="bg-neutral-50 px-10"
              placeHolder="루틴 검색"
            />
          </div>
          <select
            className="w-34 px-2 border border-gray-300 rounded-sm bg-white focus:border-gray-400"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortOption);
              setPage(1);
            }}
          >
            <option value="newest">정렬 : 최신순</option>
            <option value="oldest">정렬 : 오래된순</option>
            <option value="name">정렬 : 이름순</option>
          </select>
        </div>
      </header>
      <hr className="border-b border-gray-200 my-3 mt-1.5" />

      <section className="w-full bg-secondary-white flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => handleFilterChange('active')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                filter === 'active'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-500'
              }`}
            >
              진행 중
              <span
                className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  filter === 'active'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-gray-200 text-neutral-400'
                }`}
              >
                {activeCount}
              </span>
            </button>
            <button
              onClick={() => handleFilterChange('completed')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                filter === 'completed'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-500'
              }`}
            >
              종료
              <span
                className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  filter === 'completed'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-gray-200 text-neutral-400'
                }`}
              >
                {completedCount}
              </span>
            </button>
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
        <div className="flex-1 overflow-y-auto min-h-0">
          <RoutineList routines={displayedRoutines} filter={filter} />
        </div>

        {displayedRoutines.length > 0 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </section>
    </div>
  );
}
