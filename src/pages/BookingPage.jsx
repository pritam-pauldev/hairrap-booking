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
          <h1 className="font-display text-3xl font-bold text-white">
            Booking
          </h1>
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
          <h1 className="mb-4 font-display text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Book an Appointment
          </h1>
          <p className="text-[#434343] dark:text-zinc-400 text-sm mb-14">
            Ready to take the first step toward your dream property? Fill out
            the form below, and our real estate wizards will work their magic to
            find your perfect match. Don't wait; let's embark on this exciting
            journey together.
          </p>
        </div>
        <div className="border-[1px] border-[#434343] rounded-lg bg-white p-10 sm:p-8">
          {/* Personal info row */}
          <div className='p-8'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
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
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
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
                      "input-field bg-[#EAEAEA]",
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
            <div className="mb-5">
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Choose Whom
              </label>
              <select
                value={form.gender}
                onChange={(e) =>
                  setForm((f) => ({ ...f, gender: e.target.value }))
                }
                className="input-field bg-[#EAEAEA]"
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </div>

            {/* Stylist / Gender / Service / Category */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Choose Stylist
                </label>
                <select
                  value={form.stylist}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, stylist: e.target.value }))
                  }
                  className="input-field bg-[#EAEAEA]"
                >
                  <option value="">Select Stylist</option>
                  {STYLISTS.map((s) => (
                    <option key={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Gender
                </label>
                <select
                  value={form.gender}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, gender: e.target.value }))
                  }
                  className="input-field bg-[#EAEAEA]"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Services Type
                </label>
                <select
                  className="input-field bg-[#EAEAEA]"
                  value={form.serviceType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, serviceType: e.target.value }))
                  }
                >
                  <option value="">{service.name}</option>
                  <option>Men's Haircut</option>
                  <option>Women's Haircut</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Service Category
                </label>
                <select className="input-field bg-[#EAEAEA]">
                  <option>{service.category}</option>
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Select Date
                </label>
                <div className="flex flex-wrap gap-2">
                  {dates.slice(0, 7).map((d) => {
                    const label = format(d, "EEE d");
                    const val = format(d, "EEE d MMM");
                    return (
                      <button
                        key={val}
                        onClick={() => {
                          setForm((f) => ({ ...f, date: val }));
                          setErrors((e) => ({ ...e, date: "" }));
                        }}
                        className={clsx(
                          "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                          form.date === val
                            ? "bg-pink-700 text-white border-pink-700 shadow-lg"
                            : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-pink-400 hover:text-pink-700",
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                {errors.date && (
                  <p className="text-xs text-red-500 mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Select Time{" "}
                  <span className="text-zinc-400 ml-1 font-normal">
                    (duration: {service.duration} min)
                  </span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {TIME_SLOTS.map((slot) => {
                    const isBooked = BOOKED_SLOTS.includes(slot);
                    return (
                      <button
                        key={slot}
                        disabled={isBooked}
                        onClick={() => {
                          setForm((f) => ({ ...f, time: slot }));
                          setErrors((e) => ({ ...e, time: "" }));
                        }}
                        className={clsx(
                          "px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors",
                          isBooked
                            ? "border-zinc-100 dark:border-zinc-800 text-zinc-300 dark:text-zinc-700 cursor-not-allowed bg-zinc-50 dark:bg-zinc-900 line-through"
                            : form.time === slot
                              ? "bg-pink-700 text-white border-pink-700 shadow-lg"
                              : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-pink-400",
                        )}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {errors.time && (
                  <p className="text-xs text-red-500 mt-1">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Enter your Message here.."
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="input-field bg-[#EAEAEA] resize-none"
              />
            </div>

            {/* Total & Submit */}
            <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800">
              {/* Row 1 — Total price + discount badge */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">
                    Total
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
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
                    <a href="#" className="text-pink-700 hover:underline">
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-pink-700 hover:underline">
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
