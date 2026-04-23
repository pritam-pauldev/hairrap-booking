import {
  Star,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
  Clock,
} from "lucide-react";
import SocialLinks from "../ui/SocialLinks";
import clsx from "clsx";

export default function SalonInfoCard({ service }) {
  return (
    <div className="card p-5 mb-14">
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Image */}
        <img
          src={service.image}
          alt={service.salon}
          className="w-24 h-24 rounded-xl object-cover shrink-0"
        />

        {/* Left — name + rating + meta */}
        <div className="flex-1 min-w-0">
          {/* Stars + review count */}
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={clsx(
                  "w-3.5 h-3.5",
                  i < Math.floor(service.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700",
                )}
              />
            ))}
            <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-1">
              {service.rating} ({service.reviews} reviews)
            </span>
          </div>

          {/* Salon name */}
          <div className="flex items-center gap-2 mb-1">
            <h5 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
              {service.salon}
            </h5>
          </div>

          {/* Tagline */}
          <p className="text-xs text-[#656B76] dark:text-zinc-400  mb-2">
            We connect top talents with top companies
          </p>

          {/* Salon Industry + Member Since */}
          <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              Salon Industry
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Member Since 19 Aug 2023
            </span>
          </div>
        </div>

        {/* Center — contact details 2x2 grid */}
        <div className="hidden sm:grid grid-cols-2 gap-x-10 gap-y-4 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xs font-bold text-[#242B3A] dark:text-zinc-400">
                Email
              </span>
            </div>
            <p className="text-xs text-zinc-700 dark:text-zinc-300">
              {service.email ?? "Glamxxxxxx@example.com"}
            </p>
          </div>

          <div className="mr-[60px]">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Globe className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xs font-bold text-[#242B3A] dark:text-zinc-400">
                Language Known
              </span>
            </div>
            <p className="text-xs text-zinc-700 dark:text-zinc-300">
              English, Arabic, French{" "}
              <span className="text-pink-700 dark:text-pink-400 font-medium">
                +4 More
              </span>
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xs font-bold text-[#242B3A] dark:text-zinc-400">
                Phone Number
              </span>
            </div>
            <p className="text-xs text-zinc-700 dark:text-zinc-300">
              {service.phone ?? "+1 888 8XX XXXX"}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xs font-bold text-[#242B3A] dark:text-zinc-400">
                Address
              </span>
            </div>
            <p className="text-xs text-zinc-700 dark:text-zinc-300">
              {service.location}
            </p>
          </div>
        </div>

        {/* Right — View Salon button + Social profiles */}
        <div className="flex flex-col items-start gap-3 shrink-0">
          <button className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2 w-full">
            <Building2 className="w-3.5 h-3.5" />
            View Salon
          </button>

          <div className="flex flex-col items-start gap-2">
            <p className="text-xs font-bold text-[#242B3A] dark:text-zinc-400">
              Social Profiles
            </p>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
