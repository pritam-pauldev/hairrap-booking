import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, AlertCircle } from "lucide-react";
import {
  SERVICES,
  TIME_SLOTS,
  BOOKED_SLOTS,
  STYLISTS,
} from "../../services/mockData";
import { useBooking } from "../../context/BookingContext";
import clsx from "clsx";
import { format } from "date-fns";
import { BookingHeroBanner } from "../../assets";
import SalonInfoCard from "../../components/booking/SalonInfoCard";
import BookingSuccess from "./BookingSuccess";
import {
  PERSONAL_FIELDS,
  INITIAL_FORM,
  generateDateOptions,
  getSelectFields,
} from "./bookingConfig";
import { validateBookingForm } from "./bookingValidation";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useBooking();
  const service = SERVICES.find((s) => s.id === id);

  const [form, setForm] = useState(INITIAL_FORM);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">Service not found.</p>
          <button className="btn-primary" onClick={() => navigate("/services")}>
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const discount = Math.round(
    ((service.originalPrice - service.price) / service.originalPrice) * 100,
  );
  const dates = generateDateOptions();
  const selectFields = getSelectFields(service, STYLISTS);

  async function handleSubmit() {
    const e = validateBookingForm(form, agreed);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    dispatch({
      type: "ADD_BOOKING",
      payload: {
        id: "b" + Date.now(),
        service: service.name,
        salon: service.salon,
        ref: "R" + Math.floor(Math.random() * 900 + 100),
        status: "pending",
        date: form.date,
        time: form.time,
        totalPaid: service.price,
        image: service.image,
      },
    });
    setStatus("success");
  }

  if (status === "success") {
    return <BookingSuccess service={service} form={form} />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="relative h-40 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${BookingHeroBanner})` }}
      >
        <div className="relative text-center">
          <h1 className="font-inter text-3xl font-bold text-white">Booking</h1>
          <p className="text-zinc-300 text-sm mt-1">
            Home › Services › Booking
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="btn-ghost mb-6 -ml-2 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <SalonInfoCard service={service} />

        <div>
          <h1 className="mb-4 font-archivo text-4xl font-bold text-zinc-900 dark:text-white">
            Book an Appointment
          </h1>
          <p className="text-[#434343] font-inter dark:text-zinc-400 text-sm mb-14">
            Ready to take the first step toward your dream property? Fill out
            the form below, and our real estate wizards will work their magic to
            find your perfect match. Don't wait; let's embark on this exciting
            journey together.
          </p>
        </div>

        <div className="border-[1px] border-[#434343] dark:bg-zinc-900 rounded-lg bg-white p-10 sm:p-8">
          <div className="p-8">
            {/* Personal info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              {PERSONAL_FIELDS.map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-s font-inter font-bold text-[#000000] dark:text-zinc-300 mb-1.5">
                    {label}
                  </label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, [key]: e.target.value }));
                      setErrors((er) => ({ ...er, [key]: "" }));
                    }}
                    className={clsx(
                      "input-field bg-[#EAEAEA] font-inter",
                      errors[key] &&
                        "border-red-400 focus:border-red-400 focus:ring-red-400/30",
                    )}
                  />
                  {errors[key] && (
                    <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Choose Whom */}
            <div className="mb-12">
              <label className="block text-s font-inter font-bold text-[#000000] dark:text-zinc-300 mb-1.5">
                Choose Whom
              </label>
              <select
                value={form.gender}
                onChange={(e) =>
                  setForm((f) => ({ ...f, gender: e.target.value }))
                }
                className="input-field bg-[#EAEAEA] font-inter text-[#898989]"
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </div>

            {/* Select fields row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {selectFields.map(({ key, label, options }) => (
                <div key={key}>
                  <label className="block text-s font-inter font-bold text-[#000000] dark:text-zinc-300 mb-1.5">
                    {label}
                  </label>
                  <select
                    value={form[key]}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, [key]: e.target.value }));
                      setErrors((er) => ({ ...er, [key]: "" }));
                    }}
                    className={clsx(
                      "input-field bg-[#EAEAEA] font-inter text-[#898989]",
                      errors[key] &&
                        "border-red-400 focus:border-red-400 focus:ring-red-400/30",
                    )}
                  >
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors[key] && (
                    <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <div>
                <label className="block text-s font-inter font-bold text-[#000000] dark:text-zinc-300 mb-1.5">
                  Select Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  min={format(dates[0], "yyyy-MM-dd")}
                  max={format(dates[6], "yyyy-MM-dd")}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, date: e.target.value }));
                    setErrors((er) => ({ ...er, date: "" }));
                  }}
                  className={clsx(
                    "input-field bg-[#EAEAEA] font-inter",
                    errors.date &&
                      "border-red-400 focus:border-red-400 focus:ring-red-400/30",
                  )}
                />
                {errors.date && (
                  <p className="text-xs text-red-500 mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-s font-inter font-bold text-[#000000] dark:text-zinc-300 mb-1.5">
                  Time
                </label>
                <select
                  value={form.time}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, time: e.target.value }));
                    setErrors((er) => ({ ...er, time: "" }));
                  }}
                  className={clsx(
                    "input-field bg-[#EAEAEA] font-inter",
                    errors.time &&
                      "border-red-400 focus:border-red-400 focus:ring-red-400/30",
                  )}
                >
                  <option value="">Select Time</option>
                  {TIME_SLOTS.map((slot) => (
                    <option
                      key={slot}
                      value={slot}
                      disabled={BOOKED_SLOTS.includes(slot)}
                    >
                      {slot} {BOOKED_SLOTS.includes(slot) ? "(Booked)" : ""}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-xs text-red-500 mt-1">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-s font-inter font-bold text-[#000000] dark:text-zinc-300 mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Enter your Message here.."
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="input-field bg-[#EAEAEA] resize-none font-inter"
              />
            </div>

            {/* Total & Submit */}
            <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800">
              <p className="text-xs font-archivo text-zinc-400 dark:text-zinc-500 mb-1">
                Total
              </p>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-archivo text-3xl font-bold text-[#242B3A] dark:text-white">
                    ₹{service.price}
                  </span>
                  <span className="text-sm text-zinc-400 line-through">
                    ₹{service.originalPrice}
                  </span>
                </div>
                {discount > 0 && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                    ● {discount}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      setErrors((er) => ({ ...er, agreed: "" }));
                    }}
                    className="w-4 h-4 rounded accent-pink-700"
                  />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    I agree with{" "}
                    <a href="#" className="hover:text-pink-700 underline">
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a href="#" className="hover:text-pink-700 underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                <button
                  className="btn-primary px-8 shrink-0"
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Booking...
                    </span>
                  ) : (
                    "Book Now"
                  )}
                </button>
              </div>
            </div>

            {errors.agreed && (
              <div className="mt-3 flex items-center gap-2 text-xs text-red-500">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.agreed}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
