import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingSuccess({ service, form }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card p-10 text-center max-w-sm w-full animate-slide-up">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="font-display text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">
          {service.salon}
        </p>
        <p className="text-zinc-600 dark:text-zinc-300 font-medium mb-6">
          {form.date} at {form.time}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            className="btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            My Bookings
          </button>
          <button className="btn-primary" onClick={() => navigate("/services")}>
            Book Another
          </button>
        </div>
      </div>
    </div>
  );
}
