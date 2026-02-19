interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 py-4 shrink-0 border-t border-gray-100">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:text-gray-300 disabled:cursor-not-allowed text-gray-500 hover:bg-gray-100"
      >
        이전
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
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
      ))}
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
