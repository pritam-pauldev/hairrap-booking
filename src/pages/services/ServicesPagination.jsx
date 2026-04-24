import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export default function ServicesPagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      <button
        onClick={() => onPageChange((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="btn-ghost px-3 py-2 text-xs disabled:opacity-40"
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={clsx(
            "w-8 h-8 rounded-lg text-xs font-medium transition-colors",
            page === i + 1
              ? "bg-[#B56584] text-white shadow-lg"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
          )}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        className="btn-ghost px-3 py-2 text-xs disabled:opacity-40"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
