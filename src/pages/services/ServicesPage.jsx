import { useState, useMemo } from "react";
import clsx from "clsx";
import { SlidersHorizontal, X } from "lucide-react";
import ServiceCard from "../../components/services/ServiceCard";
import ServiceFilters from "../../components/services/ServiceFilters";
import { SERVICES } from "../../services/mockData";
import { ServicesHeroBanner } from "../../assets";
import ServicesToolbar from "./ServicesToolbar";
import ServicesPagination from "./ServicesPagination";
import {
  PAGE_SIZE,
  defaultFilters,
  applyFilters,
  applySort,
} from "./servicesConfig";

export default function ServicesPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState("Price Low to High");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleFilterChange(patch) {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  }

  function handleReset() {
    setFilters(defaultFilters);
    setPage(1);
  }

  const filtered = useMemo(
    () => applySort(applyFilters(SERVICES, filters), sort),
    [filters, sort],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div
        className="relative h-40 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${ServicesHeroBanner})` }}
      />

      {/* Mobile filter drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile filter drawer */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-72 bg-white dark:bg-zinc-900 z-50 shadow-2xl overflow-y-auto transition-transform duration-300 lg:hidden",
          drawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-700">
          <span className="font-bold text-zinc-900 dark:text-white">
            Filters
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">
          <ServiceFilters
            filters={filters}
            onChange={(patch) => {
              handleFilterChange(patch);
            }}
            onReset={() => {
              handleReset();
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter toggle button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {(filters.keyword ||
              filters.category ||
              filters.minRating ||
              filters.maxPrice < 999) && (
              <span className="ml-1 w-2 h-2 rounded-full bg-pink-600" />
            )}
          </button>
        </div>

        <div className="flex gap-8 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 self-start sticky top-24">
            <div className="card p-5">
              <ServiceFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <ServicesToolbar
              count={filtered.length}
              sort={sort}
              onSortChange={setSort}
              view={view}
              onViewChange={setView}
            />

            {/* Grid / List */}
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
                <button onClick={handleReset} className="btn-primary mt-4">
                  Reset Filters
                </button>
              </div>
            )}

            <ServicesPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
