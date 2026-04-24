import { useState, useMemo } from 'react';
import { LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import ServiceCard from '../components/services/ServiceCard';
import ServiceFilters from '../components/services/ServiceFilters';
import { SERVICES } from '../services/mockData';
import clsx from 'clsx';
import { ServicesHeroBanner } from "../assets";

const SORT_OPTIONS = ['Price Low to High', 'Price High to Low', 'Rating', 'Most Popular'];
const PAGE_SIZE = 9;

const defaultFilters = { keyword: '', category: '', maxPrice: 999, minRating: 0 };

export default function ServicesPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState('Price Low to High');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);

  function handleFilterChange(patch) {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  }

  const filtered = useMemo(() => {
    let list = SERVICES.filter((s) => {
      if (filters.keyword && !s.name.toLowerCase().includes(filters.keyword.toLowerCase()) &&
          !s.salon.toLowerCase().includes(filters.keyword.toLowerCase())) return false;
      if (filters.category && s.category !== filters.category) return false;
      if (s.price > filters.maxPrice) return false;
      if (s.rating < filters.minRating) return false;
      return true;
    });

    if (sort === 'Price Low to High') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'Price High to Low') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'Rating') list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [filters, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div
        className="relative h-40 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${ServicesHeroBanner})`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 self-start sticky top-24">
            <div className="card p-5 ">
              <ServiceFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={() => setFilters(defaultFilters)}
              />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Found{" "}
                <span className="font-bold text-pink-700 text-base">
                  {filtered.length}
                </span>{" "}
                Services
              </p>
              <div className="flex items-center gap-3">
                <span className="font-normal text-[14px] leading-[24px] tracking-normal text-zinc-700 dark:text-zinc-300">
                  Sort
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="input-field py-2 pr-8 w-auto text-xs"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>

                <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-700 rounded-lg p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={clsx(
                      "p-1.5 rounded",
                      view === "grid"
                        ? "bg-pink-700 text-white"
                        : "text-zinc-400 hover:text-zinc-600",
                    )}
                  >
                    <LayoutGrid className=" w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setView("list")}
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

            {/* Grid */}
            {paginated.length > 0 ? (
              <div
                className={clsx(
                  "grid gap-5",
                  view === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1",
                )}
              >
                {paginated.map((s) => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </div>
            ) : (
              <div className="card p-16 text-center">
                <p className="text-zinc-400 dark:text-zinc-500">
                  No services match your filters.
                </p>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="btn-primary mt-4"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-ghost px-3 py-2 text-xs disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={clsx(
                      "w-8 h-8 rounded-lg text-xs font-medium transition-colors",
                      page === i + 1
                        ? "bg-pink-700 text-white shadow-lg"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    )}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn-ghost px-3 py-2 text-xs disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
