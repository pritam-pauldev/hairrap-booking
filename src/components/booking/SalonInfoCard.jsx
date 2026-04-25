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
    <div className="card p-4 sm:p-5 mb-14">
      {/* Top row: image + name/rating */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
        {/* Image */}
        <img
          src={service.image}
          alt={service.salon}
          className="w-full sm:w-24 sm:h-24 h-44 rounded-xl object-cover shrink-0"
        />

        {/* Name + rating + meta */}
        <div className="flex-1 min-w-0">
          {/* Stars + review count */}
          <div className="flex items-center gap-1 mb-1 flex-wrap">
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
          <h5 className="font-archivo text-lg font-bold text-zinc-900 dark:text-white mb-1">
            {service.salon}
          </h5>

          {/* Tagline */}
          <p className="font-archivo text-xs text-[#656B76] dark:text-zinc-400 mb-2">
            We connect top talents with top companies
          </p>

          {/* Industry + Member Since */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-zinc-400 dark:text-zinc-500">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              Salon Industry
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              Member Since 19 Aug 2023
            </span>
          </div>
        </div>
      </div>

      {/* Contact details — always visible, responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-xs font-archivo font-bold text-[#242B3A] dark:text-zinc-400">
              Email
            </span>
          </div>
          <p className="text-xs font-archivo text-zinc-700 dark:text-zinc-300 break-all">
            {service.email ?? "Glamxxxxxx@example.com"}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="font-archivo text-xs font-bold text-[#242B3A] dark:text-zinc-400">
              Language Known
            </span>
          </div>
          <p className="font-archivo text-xs text-zinc-700 dark:text-zinc-300">
            English, Arabic, French{" "}
            <span className="font-archivo text-pink-700 dark:text-pink-400 font-medium">
              +4 More
            </span>
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="font-archivo text-xs font-bold text-[#242B3A] dark:text-zinc-400">
              Phone Number
            </span>
          </div>
          <p className="text-xs font-archivo text-zinc-700 dark:text-zinc-300">
            {service.phone ?? "+1 888 8XX XXXX"}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-xs font-archivo font-bold text-[#242B3A] dark:text-zinc-400">
              Address
            </span>
          </div>
          <p className="text-xs font-archivo text-zinc-700 dark:text-zinc-300">
            {service.location}
          </p>
        </div>
      </div>

      {/* Footer: View Salon + Social */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <button className="btn-primary font-archivo text-xs px-5 py-2.5 flex items-center gap-2 w-full sm:w-auto">
          <Building2 className="w-3.5 h-3.5" />
          View Salon
        </button>

        <div className="flex items-center gap-3">
          <p className="text-xs font-archivo font-bold text-[#242B3A] dark:text-zinc-400">
            Social Profiles
          </p>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
