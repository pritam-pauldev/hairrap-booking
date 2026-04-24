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
          className="input-field py-2 pr-8 w-auto text-xs"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-700 rounded-lg p-1">
          <button
            onClick={() => onViewChange("grid")}
            className={clsx(
              "p-1.5 rounded",
              view === "grid"
                ? "bg-pink-700 text-white"
                : "text-zinc-400 hover:text-zinc-600",
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={clsx(
              "p-1.5 rounded",
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
