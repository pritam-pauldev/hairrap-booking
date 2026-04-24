import { ChevronRight } from "lucide-react";
import clsx from "clsx";

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

export default function DashboardBookingCard({ booking, onCancelClick }) {
  return (
    <div className="card px-5 py-4">
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
      <div className="border-t border-[#DCDCDC] dark:border-zinc-800 my-3" />

      {/* Bottom row — booking date + total paid + booking details */}
      <div className="flex items-center justify-between">
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
              onClick={() => onCancelClick(booking.id)}
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
  );
}
