interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE = 5;

function getPageNumbers(page: number, totalPages: number): (number | '...')[] {
  if (totalPages <= MAX_VISIBLE) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(MAX_VISIBLE / 2);
  let start = Math.max(2, page - half);
  let end = Math.min(totalPages - 1, page + half);

  if (page - half <= 1) end = Math.min(totalPages - 1, MAX_VISIBLE - 1);
  if (page + half >= totalPages) start = Math.max(2, totalPages - MAX_VISIBLE + 2);

  const pages: (number | '...')[] = [1];
  if (start > 2) pages.push('...');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push('...');
  pages.push(totalPages);

  return pages;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = getPageNumbers(page, totalPages);

  return (
    <div className="flex justify-center items-center gap-2 py-4 shrink-0 border-t border-gray-100">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:text-gray-300 disabled:cursor-not-allowed text-gray-500 hover:bg-gray-100"
      >
        이전
      </button>
      {pages.map((num, idx) =>
        num === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-1 text-gray-400 select-none">
            …
          </span>
        ) : (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              num === page
                ? 'bg-primary text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {num}
          </button>
        ),
      )}
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:text-gray-300 disabled:cursor-not-allowed text-gray-500 hover:bg-gray-100"
      >
        다음
      </button>
    </div>
  );
}
