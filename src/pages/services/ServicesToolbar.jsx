import { LayoutGrid, List } from "lucide-react";
import clsx from "clsx";
import { SORT_OPTIONS } from "./servicesConfig";

export default function ServicesToolbar({
  count,
  sort,
  onSortChange,
  view,
  onViewChange,
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Found <span className="font-bold text-pink-700 text-base">{count}</span>{" "}
        Services
      </p>

      <div className="flex items-center gap-3">
        <span className="font-normal text-[14px] leading-[24px] tracking-normal text-zinc-700 dark:text-zinc-300">
          Sort
        </span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="input-field py-2 pl-3 pr-7 w-auto text-xs appearance-none bg-no-repeat bg-[right_0.4rem_center] bg-[length:12px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onViewChange("grid")}
            className={clsx(
              "p-2 border border-zinc-200 dark:border-zinc-700 rounded-md",
              view === "grid"
                ? "bg-pink-700 text-white "
                : "text-zinc-400 hover:text-zinc-600 border ",
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={clsx(
              "p-2 border border-zinc-200 dark:border-zinc-700 rounded-md",
              view === "list"
                ? "bg-pink-700 text-white"
                : "text-zinc-400 hover:text-zinc-600",
            )}
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
