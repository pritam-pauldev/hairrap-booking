import { LogOut, ChevronRight } from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import clsx from "clsx";
import { ProfilePicture } from "../../assets";
import { NAV_ITEMS } from "./dashboardConfig";

export default function DashboardSidebar({ activeNav, setActiveNav }) {
  const { dispatch } = useBooking();

  return (
    <aside className="hidden md:block w-64 shrink-0">
      <div className="bg-[#F4F5F5] rounded-md border-[1px] border-[#EBECED] p-4 sticky top-24 dark:bg-zinc-900 dark:border-zinc-800">
        {/* Profile */}
        <div className="flex flex-col bg-white rounded-md items-center py-4 dark:border-zinc-800 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-[#F4F5F5] mb-3">
            <img
              src={ProfilePicture}
              alt="John Smith"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-semibold font-archivo text-zinc-900 dark:text-white text-sm">
            John Smith
          </p>
          <p className="text-xs font-archivo font-normal text-zinc-400 dark:text-zinc-500">
            Member Since Sep 2021
          </p>
        </div>

        {/* Nav */}
        <nav className="space-y-0.5">
          {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => {
                setActiveNav(id);
                if (id === "ai")
                  dispatch({ type: "SET_CHAT_OPEN", payload: true });
              }}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                activeNav === id
                  ? "text-pink-700 dark:text-pink-400 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white",
              )}
            >
              <Icon
                className={clsx(
                  "w-4 h-4 shrink-0",
                  activeNav === id
                    ? "text-pink-700 dark:text-pink-400"
                    : "text-zinc-400",
                )}
              />
              {label}
              {id === "settings" && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-zinc-400" />
              )}
            </button>
          ))}

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4 text-zinc-400" />
            Logout
          </button>
        </nav>
      </div>
    </aside>
  );
}
