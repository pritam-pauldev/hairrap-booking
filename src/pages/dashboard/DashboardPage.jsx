// import { useState, useEffect } from "react";
import { useState } from "react";
import clsx from "clsx";
import { useBooking } from "../../context/BookingContext";
import { DashboardHeroBanner } from "../../assets";
import DashboardSidebar from "./DashboardSidebar";
import DashboardBookingCard from "./DashboardBookingCard";
import CancelModal from "./CancelModal";
import { TABS, getCounts } from "./dashboardConfig";
// import api from "../../services/api";

export default function DashboardPage() {
  const { state, dispatch } = useBooking();
  const [activeTab, setActiveTab] = useState("All");
  const [activeNav, setActiveNav] = useState("bookings");
  const [confirmCancel, setConfirmCancel] = useState(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   setLoading(true);
  //   api
  //     .get("/bookings") // GET /bookings
  //     .then((res) => {
  //       dispatch({ type: "SET_BOOKINGS", payload: res.data }); // needs reducer update — see note below
  //     })
  //     .catch((err) => setError(err.message))
  //     .finally(() => setLoading(false));
  // }, []);

  const filtered = state.bookings.filter((b) =>
    activeTab === "All" ? true : b.status === activeTab.toLowerCase(),
  );
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const counts = getCounts(state.bookings);

  function handleCancel(id) {
    dispatch({ type: "CANCEL_BOOKING", payload: id });
    setConfirmCancel(null);
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="relative h-40 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${DashboardHeroBanner})` }}
      >
        <div className="absolute inset-0 bg-zinc-900/60" />
        <div className="relative text-center">
          <h1 className="font-archivo text-3xl font-bold text-white">
            Dashboard
          </h1>
          <p className="text-zinc-300 text-sm mt-1">
            Home › Customer › Dashboard
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <DashboardSidebar activeNav={activeNav} setActiveNav={setActiveNav} />

          {/* Main content */}
          <div className="flex-1 min-w-0 bg-[#F4F5F5] rounded-md border-[1px] border-[#EBECED] p-10 dark:bg-zinc-900 dark:border-zinc-800">
            {/* Tabs row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setPage(1);
                    }}
                    className={clsx(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                      activeTab === tab
                        ? "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
                    )}
                  >
                    {tab} ({counts[tab]})
                  </button>
                ))}
              </div>

              <button className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 font-medium">
                Sort by
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                  <path
                    d="M2 4h10M4 7h6M6 10h2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Booking cards */}
            <div className="space-y-3">
              {paginated.length === 0 ? (
                <div className="card py-16 text-center text-zinc-400 dark:text-zinc-600 text-sm">
                  No {activeTab.toLowerCase()} bookings found.
                </div>
              ) : (
                paginated.map((booking) => (
                  <DashboardBookingCard
                    key={booking.id}
                    booking={booking}
                    onCancelClick={setConfirmCancel}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-6">
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
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel modal */}
      {confirmCancel && (
        <CancelModal
          onConfirm={() => handleCancel(confirmCancel)}
          onClose={() => setConfirmCancel(null)}
        />
      )}
    </div>
  );
}
