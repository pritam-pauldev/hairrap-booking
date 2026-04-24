import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, MessageCircle, Moon, Sun, ChevronDown, FishingHook } from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import clsx from "clsx";
import { LogoIcon, ProfilePicture, ChatIcon } from "../../assets/index";

const NAV_LINKS = [
  { to: "/", label: "Home", hasDropdown: true },
  { to: "/services", label: "Services", hasDropdown: true },
  { to: "/about", label: "About Us", hasDropdown: true },
  { to: "/contact", label: "Contact", hasDropdown: true },
];

export default function Navbar() {
  const { state, dispatch } = useBooking();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={LogoIcon}
              alt="Hair Rap By YOYO"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-zinc-100 hover:text-zinc-900 dark:bg-pink-950 dark:text-pink-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800",
                  )
                }
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => dispatch({ type: "TOGGLE_DARK" })}
              className="btn-ghost p-2"
              aria-label="Toggle dark mode"
            >
              {state.darkMode ? (
                <Sun className="w-[18px] h-[18px]" />
              ) : (
                <Moon className="w-[18px] h-[18px]" />
              )}
            </button>

            <button
              className="btn-ghost p-2 relative"
              aria-label="Notifications"
            >
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-pink-500" />
            </button>

            <button
              onClick={() => dispatch({ type: "SET_CHAT_OPEN", payload: true })}
              className="btn-ghost p-2"
              aria-label="Open AI assistant"
            >
              <MessageCircle className="w-[18px] h-[18px]" />
            </button>

            {/* Profile → opens Dashboard */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 ml-1 pl-3 border-l border-zinc-200 dark:border-zinc-700"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-pink-500/30">
                <img
                  src={ProfilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}