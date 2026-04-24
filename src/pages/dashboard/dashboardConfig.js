import {
  LayoutDashboard,
  Calendar,
  Heart,
  Wallet,
  Star,
  MessageCircle,
  Settings,
} from "lucide-react";

export const TABS = ["All", "Pending", "Canceled", "Completed"];

export const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Calendar, label: "Bookings", id: "bookings" },
  { icon: Heart, label: "Favorites", id: "favorites" },
  { icon: Wallet, label: "Wallet", id: "wallet" },
  { icon: Star, label: "Reviews", id: "reviews" },
  { icon: MessageCircle, label: "Help – AI Assistant", id: "ai" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export function getCounts(bookings) {
  return {
    All: bookings.length,
    Pending: bookings.filter((b) => b.status === "pending").length,
    Canceled: bookings.filter((b) => b.status === "canceled").length,
    Completed: bookings.filter((b) => b.status === "completed").length,
  };
}
