// src/components/chat/chatConstants.js

import {
  Calendar,
  Scissors,
  ShoppingBag,
  BookOpen,
  MessageCircle,
} from "lucide-react";

export const QUICK_TOPICS = [
  {
    icon: Calendar,
    label: "Book an Appointment",
    sub: "Haircut, styling, spa & more",
    prompt: "I want to book an appointment",
  },
  {
    icon: Scissors,
    label: "Explore Services",
    sub: "Prices, duration & details",
    prompt: "Show me available services",
  },
  {
    icon: ShoppingBag,
    label: "Salon Products",
    sub: "Hair care & styling products",
    prompt: "Tell me about salon products",
  },
  {
    icon: BookOpen,
    label: "My Bookings",
    sub: "View, reschedule or cancel",
    prompt: "How do I view my bookings?",
  },
  {
    icon: MessageCircle,
    label: "Talk to Expert",
    sub: "Hair & skin consultation",
    prompt: "I need a hair consultation",
  },
];

export const CHAT_HISTORY = [
  {
    id: "h1",
    title: "Wellness Coach",
    sub: "Hair & scalp care tips for today",
    group: "Today",
  },
  {
    id: "h2",
    title: "Explore Services",
    sub: "Prices, duration & service details",
    group: "Today",
  },
  {
    id: "h3",
    title: "Salon Products",
    sub: "Hair care, beard care & styling",
    group: "Today",
  },
  {
    id: "h4",
    title: "Offers & Memberships",
    sub: "Current deals, packages & loyalty",
    group: "Today",
  },
  {
    id: "h5",
    title: "My Appointments",
    sub: "View, reschedule or cancel",
    group: "Yesterday",
  },
  {
    id: "h6",
    title: "Order Tracker",
    sub: "Your product order is on the way 🚚",
    group: "Yesterday",
  },
  {
    id: "h7",
    title: "Hair Consultation",
    sub: "Personalized style & care advice",
    group: "Yesterday",
  },
];
