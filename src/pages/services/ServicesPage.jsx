import { useState, useMemo } from "react";
import clsx from "clsx";
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

  function handleFilterChange(patch) {
    setFilters((f) => ({ ...f, ...patch }));
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 self-start sticky top-24">
            <div className="card p-5">
              <ServiceFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={() => {
                  setFilters(defaultFilters);
                  setPage(1);
                }}
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
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="btn-primary mt-4"
                >
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
