import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Heart } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function ServiceCard({ service }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const discount = Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100);

  return (
    <div className="card card-hover group cursor-pointer overflow-hidden animate-fade-in">
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ height: '180px' }}
        onClick={() => navigate(`/services/${service.id}`)}
      >
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-xs font-semibold text-zinc-700 dark:text-zinc-200 shadow-sm">
          {service.category}
        </span>

        {/* Heart */}
        <button
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 dark:bg-zinc-900/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          aria-label="Add to favorites"
        >
          <Heart className={clsx('w-3.5 h-3.5 transition-colors', liked ? 'fill-pink-700 text-pink-700' : 'text-zinc-400')} />
        </button>

        {/* Stylist avatar */}
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-md">
          <img src={service.stylistAvatar} alt={service.stylist} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Body */}
      <div className="p-4" onClick={() => navigate(`/services/${service.id}`)}>
        <h3 className="font-semibold text-zinc-900 dark:text-white text-lg leading-snug line-clamp-1 mb-1">
          {service.salon}
        </h3>

        <div className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500 text-xs mb-3">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="line-clamp-1">{service.location}</span>
          <span className="ml-auto flex items-center gap-0.5 text-amber-500 font-medium">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {service.rating}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-zinc-900 dark:text-white">₹{service.price}</span>
            {service.originalPrice > service.price && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500 line-through">₹{service.originalPrice}</span>
            )}
          </div>

          <button
            className="btn-primary px-4 py-1.5 text-xs"
            onClick={(e) => { e.stopPropagation(); navigate(`/services/${service.id}`); }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
