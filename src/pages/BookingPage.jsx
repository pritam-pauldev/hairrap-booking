import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Star,
  Clock,
  Globe,
  Phone,
  Mail,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Scissors,
  Building2,
} from "lucide-react";
import { SERVICES, TIME_SLOTS, BOOKED_SLOTS, STYLISTS } from '../services/mockData';
import { useBooking } from '../context/BookingContext';
import clsx from 'clsx';
import { format, addDays } from 'date-fns';
import { BookingHeroBanner } from '../assets';
import SocialLinks from '../components/ui/SocialLinks';
import SalonInfoCard from '../components/booking/SalonInfoCard';

function generateDateOptions() {
  return Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));
}

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useBooking();
  const service = SERVICES.find((s) => s.id === id);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    gender: '', stylist: '', serviceType: '', date: '', time: '', message: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">Service not found.</p>
          <button className="btn-primary" onClick={() => navigate('/services')}>Back to Services</button>
        </div>
      </div>
    );
  }

  const discount = Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100);
  const dates = generateDateOptions();

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.date) e.date = 'Select a date';
    if (!form.time) e.time = 'Select a time slot';
    if (!agreed) e.agreed = 'You must agree to the terms';
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus('loading');
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    dispatch({
      type: 'ADD_BOOKING',
      payload: {
        id: 'b' + Date.now(),
        service: service.name,
        salon: service.salon,
        ref: 'R' + Math.floor(Math.random() * 900 + 100),
        status: 'pending',
        date: form.date,
        time: form.time,
        totalPaid: service.price,
        image: service.image,
      },
    });
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card p-10 text-center max-w-sm w-full animate-slide-up">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-zinc-900 dark:text-white mb-2">Booking Confirmed!</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">{service.salon}</p>
          <p className="text-zinc-600 dark:text-zinc-300 font-medium mb-6">{form.date} at {form.time}</p>
          <div className="flex gap-3 justify-center">
            <button className="btn-secondary" onClick={() => navigate('/dashboard')}>My Bookings</button>
            <button className="btn-primary" onClick={() => navigate('/services')}>Book Another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="relative h-40 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${BookingHeroBanner})` }}
      >
        {/* <div className="absolute inset-0 bg-zinc-900/60" /> */}
        <div className="relative text-center">
          <h1 className="font-inter text-3xl font-bold text-white">Booking</h1>
          <p className="text-zinc-300 text-sm mt-1">
            Home › Services › Booking
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="btn-ghost mb-6 -ml-2 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        {/* Salon info card */}
        <SalonInfoCard service={service} />

        {/* Booking form */}
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
          {/* Personal info row */}
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              {[
                {
                  key: "firstName",
                  label: "First Name",
                  placeholder: "Enter First Name",
                },
                {
                  key: "lastName",
                  label: "Last Name",
                  placeholder: "Enter Last Name",
                },
                {
                  key: "email",
                  label: "Email",
                  placeholder: "Enter your Email",
                },
                {
                  key: "phone",
                  label: "Phone",
                  placeholder: "Enter Phone Number",
                },
              ].map(({ key, label, placeholder }) => (
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

            {/* Choose whom */}
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

            {/* Stylist / Gender / Service / Category */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                {
                  key: "stylist",
                  label: "Choose Stylist",
                  options: [
                    { value: "", label: "Select Stylist" },
                    ...STYLISTS.map((s) => ({ value: s.id, label: s.name })),
                  ],
                },
                {
                  key: "gender",
                  label: "Gender",
                  options: [
                    { value: "", label: "Select Gender" },
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ],
                },
                {
                  key: "serviceType",
                  label: "Service Type",
                  options: [
                    { value: "", label: service.name },
                    { value: "mens-haircut", label: "Men's Haircut" },
                    { value: "womens-haircut", label: "Women's Haircut" },
                  ],
                },
                {
                  key: "serviceCategory",
                  label: "Service Category",
                  options: [
                    { value: service.category, label: service.category },
                  ],
                },
              ].map(({ key, label, options }) => (
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
                <div className="relative">
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
                </div>
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
              {/* Row 1 — Total price + discount badge */}
              <p className="text-xs font-archivo text-zinc-400 dark:text-zinc-500 mb-1">
                Total
              </p>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-archivo text-3xl font-bold text-[#242B3A] dark:text-white">
                      ₹{service.price}
                    </span>
                    <span className="text-sm text-zinc-400 line-through">
                      ₹{service.originalPrice}
                    </span>
                  </div>
                </div>

                {discount > 0 && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                    ● {discount}% OFF
                  </span>
                )}
              </div>

              {/* Row 2 — Checkbox + Book Now */}
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

          {errors.agreed && (
            <div className="mt-3 flex items-center gap-2 text-xs text-red-500">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.agreed}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
