import { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Heart,
  Wallet,
  Star,
  MessageCircle,
  Settings,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";
import clsx from "clsx";
import { ProfilePicture, DashboardHeroBanner } from "../assets";

const TABS = ["All", "Pending", "Canceled", "Completed"];

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Calendar, label: "Bookings", id: "bookings" },
  { icon: Heart, label: "Favorites", id: "favorites" },
  { icon: Wallet, label: "Wallet", id: "wallet" },
  { icon: Star, label: "Reviews", id: "reviews" },
  { icon: MessageCircle, label: "Help – AI Assistant", id: "ai" },
  { icon: Settings, label: "Settings", id: "settings" },
];

function StatusBadge({ status }) {
  return (
    <span
      className={clsx(
        "badge capitalize",
        status === "completed" && "badge-completed",
        status === "pending" && "badge-pending",
        status === "canceled" && "badge-canceled",
      )}
    >
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const { state, dispatch } = useBooking();
  const [activeTab, setActiveTab] = useState("All");
  const [activeNav, setActiveNav] = useState("bookings");
  const [confirmCancel, setConfirmCancel] = useState(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const filtered = state.bookings.filter((b) => {
    if (activeTab === "All") return true;
    return b.status === activeTab.toLowerCase();
  });

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const counts = {
    All: state.bookings.length,
    Pending: state.bookings.filter((b) => b.status === "pending").length,
    Canceled: state.bookings.filter((b) => b.status === "canceled").length,
    Completed: state.bookings.filter((b) => b.status === "completed").length,
  };

  function handleCancel(id) {
    dispatch({ type: "CANCEL_BOOKING", payload: id });
    setConfirmCancel(null);
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="relative h-40 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${DashboardHeroBanner})`,
        }}
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
          {/* ── Sidebar ── */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="bg-[#F4F5F5] rounded-md border-[1px] border-[#EBECED] p-4 sticky top-24 dark:bg-zinc-900 dark:border-zinc-800">
              {/* Profile */}
              <div className="flex flex-col items-center py-4 border-b border-zinc-100 dark:border-zinc-800 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-[#F4F5F5] mb-3">
                  <img
                    src={ProfilePicture}
                    alt="John Smith"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold font-archivo text-zinc-900 dark:text-white text-sm">
                  John Smith
                </p>
                <p className="text-xs font-archivo font-normal text-zinc-400 dark:text-zinc-500">
                  Member Since Sep 2021
                </p>
              </div>

              {/* Nav */}
              <nav className="space-y-0.5">
                {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveNav(id);
                      if (id === "ai")
                        dispatch({ type: "SET_CHAT_OPEN", payload: true });
                    }}
                    className={clsx(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      activeNav === id
                        ? "text-pink-700 dark:text-pink-400 font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white",
                    )}
                  >
                    <Icon
                      className={clsx(
                        "w-4 h-4 shrink-0",
                        activeNav === id
                          ? "text-pink-700 dark:text-pink-400"
                          : "text-zinc-400",
                      )}
                    />
                    {label}
                    {id === "settings" && (
                      <ChevronRight className="w-3.5 h-3.5 ml-auto text-zinc-400" />
                    )}
                  </button>
                ))}

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  <LogOut className="w-4 h-4 text-zinc-400" />
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* ── Main content ── */}
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
                  <div key={booking.id} className="card px-5 py-4">
                    {/* Top row — checkbox + title + ref + status */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 rounded accent-pink-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-bold text-black dark:text-white text-sm">
                              {booking.salon} | {booking.service}
                            </p>
                            <p className="text-xs text-black font-inter dark:text-zinc-500 mt-0.5">
                              # {booking.ref}
                            </p>
                          </div>
                          <StatusBadge status={booking.status} />
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#DCDCDC] dark:border-zinc-800 my-3 " />

                    {/* Bottom row — booking date + total paid + booking details */}
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
                        <span>
                          <span className="text-pink-700 dark:text-pink-400 font-medium">
                            Booking Date
                          </span>{" "}
                          {booking.date} • {booking.time}
                        </span>
                        <span>
                          Total paid{" "}
                          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                            ₹{booking.totalPaid}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {booking.status === "pending" && (
                          <button
                            onClick={() => setConfirmCancel(booking.id)}
                            className="text-xs text-red-500 hover:text-red-700 hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                        <button className="text-xs text-[#B56584] dark:text-pink-400 font-medium hover:underline flex items-center gap-0.5">
                          Booking Details
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
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

      {/* Cancel confirmation modal */}
      {confirmCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in px-4">
          <div className="card p-6 max-w-sm w-full animate-slide-up">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Cancel Booking?
              </h3>
              <button
                onClick={() => setConfirmCancel(null)}
                className="btn-ghost p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
              Are you sure you want to cancel this booking? Refunds are
              processed in 3–5 business days.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                className="btn-secondary"
                onClick={() => setConfirmCancel(null)}
              >
                Keep Booking
              </button>
              <button
                className="btn-primary bg-red-600 hover:bg-red-700"
                onClick={() => handleCancel(confirmCancel)}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
