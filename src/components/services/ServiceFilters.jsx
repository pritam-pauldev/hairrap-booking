import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Star,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { CATEGORIES } from "../../services/mockData";
import clsx from "clsx";

export default function ServiceFilters({ filters, onChange, onReset }) {
  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-base">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </div>
        <button
          onClick={onReset}
          className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 flex items-center gap-1"
        >
          Reset Filter
        </button>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-700 mb-5" />

      {/* Search by Keyword */}
      <div className="mb-5">
        <p className="text-sm font-bold text-zinc-900 dark:text-white mb-3">
          Search By Keyword
        </p>
        <div className="relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={filters.keyword}
            onChange={(e) => onChange({ keyword: e.target.value })}
            className="input-field py-2.5 text-sm font-inter font-regular"
          />
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-700 mb-5" />

      {/* Categories */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-zinc-900 dark:text-white">
            Categories
          </p>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </div>
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-pink-700 cursor-pointer"
                checked={
                  filters.category === cat ||
                  (cat === "All" && !filters.category)
                }
                onChange={() =>
                  onChange({ category: cat === "All" ? "" : cat })
                }
              />
              <span
                className={clsx(
                  "text-sm transition-colors",
                  filters.category === cat ||
                    (cat === "All" && !filters.category)
                    ? "text-pink-700 dark:text-pink-400 font-medium"
                    : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white",
                )}
              >
                {cat === "All" ? "All Categories" : cat}
              </span>
            </label>
          ))}
        </div>
        <button className="flex items-center gap-1 text-xs text-pink-700 dark:text-pink-400 mt-3 hover:underline">
          View More
          <span className="w-4 h-4 rounded-full border border-pink-700 dark:border-pink-400 flex items-center justify-center">
            <ChevronDown className="w-2.5 h-2.5" />
          </span>
        </button>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-700 mb-5" />

      {/* Sub Category */}
      <div className="mb-5">
        <p className="text-sm font-bold text-zinc-900 dark:text-white mb-3">
          Sub Category
        </p>
        <div className="relative">
          <select className="input-field py-2.5 text-sm appearance-none pr-8 text-zinc-400">
            <option value="">Select Sub Category</option>
            <option>Blow Dry</option>
            <option>Root Touch Up</option>
            <option>Highlights</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-700 mb-5" />

      {/* Location */}
      <div className="mb-5">
        <p className="text-sm font-bold text-zinc-900 dark:text-white mb-3">
          Location
        </p>
        <div className="relative">
          <input
            type="text"
            placeholder="Select Location"
            className="input-field py-2.5 text-sm pr-10"
          />
          <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-700 mb-5" />

      {/* Price Range */}
      <div className="mb-5">
        <p className="text-sm font-bold text-zinc-900 dark:text-white mb-4">
          Price Range
        </p>
        <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2">
          <span>₹0</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#B56584] text-white font-semibold text-xs">
            ₹{filters.maxPrice}
          </span>
          <span>₹999</span>
        </div>
        <input
          type="range"
          min={0}
          max={999}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-pink-700"
        />
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
          Price: ₹05 – ₹2000
        </p>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-700 mb-5" />

      {/* Ratings */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-zinc-900 dark:text-white">
            Ratings
          </p>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </div>
        <div className="space-y-2.5">
          {[5, 4, 3, 2, 1].map((stars) => {
            const counts = { 5: 55, 4: 48, 3: 13, 2: 5, 1: 0 };
            return (
              <label
                key={stars}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="rating"
                  className="w-4 h-4 accent-pink-700"
                  checked={filters.minRating === stars}
                  onChange={() => onChange({ minRating: stars })}
                />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={clsx(
                        "w-3.5 h-3.5",
                        i < stars
                          ? "fill-amber-400 text-amber-400"
                          : "fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700",
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-auto">
                  ({String(counts[stars]).padStart(2, "0")})
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={() => {}}
        className="btn-primary w-full justify-center py-3"
      >
        <Search className="w-4 h-4" />
        Search
      </button>
    </aside>
  );
}
