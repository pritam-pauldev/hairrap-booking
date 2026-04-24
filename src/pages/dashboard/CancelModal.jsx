import { X } from "lucide-react";

export default function CancelModal({ onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in px-4">
      <div className="card p-6 max-w-sm w-full animate-slide-up">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-semibold text-zinc-900 dark:text-white">
            Cancel Booking?
          </h3>
          <button onClick={onClose} className="btn-ghost p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
          Are you sure you want to cancel this booking? Refunds are processed in
          3–5 business days.
        </p>
        <div className="flex gap-3 justify-end">
          <button className="btn-secondary" onClick={onClose}>
            Keep Booking
          </button>
          <button
            className="btn-primary bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
