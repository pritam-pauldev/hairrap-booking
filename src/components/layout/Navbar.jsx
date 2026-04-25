import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  MessageCircle,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src={LogoIcon}
              alt="Hair Rap By YOYO"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav links */}
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
                      ? "bg-zinc-100 dark:bg-[#342128] dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-white dark:hover:bg-zinc-800",
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
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Dark mode */}
            <button
              onClick={() => dispatch({ type: "TOGGLE_DARK" })}
              className="btn-ghost bg-[#F4F5F5] dark:bg-[#342128] p-2"
              aria-label="Toggle dark mode"
            >
              {state.darkMode ? (
                <Sun className="w-[18px] h-[18px]" />
              ) : (
                <Moon className="w-[18px] h-[18px]" />
              )}
            </button>

            {/* Notifications — hidden on very small screens */}
            <button
              className="hidden sm:inline-flex btn-ghost bg-[#F4F5F5] dark:bg-zinc-800 p-2 relative"
              aria-label="Notifications"
            >
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-pink-500" />
            </button>

            {/* AI chat */}
            <button
              onClick={() => dispatch({ type: "SET_CHAT_OPEN", payload: true })}
              className="btn-ghost dark:bg-zinc-800 bg-[#F4F5F5] p-2"
              aria-label="Open AI assistant"
            >
              <MessageCircle className="w-[18px] h-[18px]" />
            </button>

            {/* Profile → Dashboard */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 pl-2 sm:pl-3 sm:ml-1 sm:border-l border-zinc-200 dark:border-zinc-700"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-pink-500/30">
                <img
                  src={ProfilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden btn-ghost bg-[#F4F5F5] dark:bg-zinc-800 p-2 ml-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={clsx(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-zinc-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={closeMobile}
              className={({ isActive }) =>
                clsx(
                  "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "bg-zinc-100 dark:bg-[#342128] text-zinc-900 dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white",
                )
              }
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              )}
            </NavLink>
          ))}

          {/* Notification row in mobile menu */}
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors sm:hidden">
            <Bell className="w-4 h-4" />
            Notifications
            <span className="ml-auto w-2 h-2 rounded-full bg-pink-500" />
          </button>
        </nav>
      </div>
    </header>
  );
}
