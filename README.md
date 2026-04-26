# 💇 Hair Rap By YOYO — Salon Booking Platform

A modern, AI-powered salon appointment booking application built with React and Vite. Users can browse salon services, book appointments, manage their bookings, and interact with an intelligent AI assistant(mockData) for personalized guidance.

---

## 📸 App Preview

> _Screenshots or a short demo video can be added here._
https://drive.google.com/drive/folders/1Z4shXqytniFYPJwouI2GK7mRNYzfp-GO

---

## 🚀 Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher (comes with Node.js)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hairrap-booking.git
cd hairrap-booking
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** (Vite default port).

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

---

## 🗂️ Project Structure

```
hairrap-booking/
├── public/
├── src/
│   ├── assets/
│   │   ├── icons/          # SVG icons (logo, chat, arrows)
│   │   └── images/         # Hero banners and avatars
│   ├── components/
│   │   ├── booking/        # Salon info card
│   │   ├── chat/           # AI chat widget, message bubbles, typing indicator
│   │   ├── layout/         # Navbar and Footer
│   │   ├── services/       # Service cards and filters
│   │   └── ui/             # Shared UI components (social links, etc.)
│   ├── context/
│   │   └── BookingContext.jsx   # Global state via React Context + useReducer
│   ├── pages/
│   │   ├── booking/        # BookingPage, BookingSuccess, validation
│   │   ├── dashboard/      # DashboardPage, booking cards, cancel modal
│   │   └── services/       # ServicesPage, toolbar, pagination
│   ├── services/
│   │   ├── aiServices.js   # AI assistant logic (API + mock fallback)
│   │   ├── api.js          # Axios instance for backend API
│   │   └── mockData.js     # Static mock data for services and bookings
│   ├── App.jsx             # Root component with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🧭 App Flow Explanation

### 1. Services Page (`/services`)
The landing page for browsing all available salon services. Users can:
- View service cards showing name, price, rating, salon name, and stylist
- Filter by category (Hair Cut, Hair Color, Hair Spa, Makeup, Nails)
- Search services by keyword
- Filter by price range
- Navigate through paginated results

### 2. Booking Page (`/services/:id`)
When a user selects a service, they are taken to a detailed booking view where they can:
- See full service details including description, stylist, and salon info
- Pick a booking date using a calendar interface
- Choose from available time slots (pre-booked slots are disabled)
- Confirm the booking with real-time validation
- Receive a success confirmation screen upon booking

### 3. My Bookings / Dashboard (`/dashboard`)
A personalized dashboard displaying the user's booking history:
- View upcoming, completed, and cancelled appointments
- See booking reference numbers, dates, times, and amounts paid
- Filter bookings by status tab (All / Upcoming / Completed / Cancelled)
- Cancel a pending booking through a confirmation modal
- Booking state is updated instantly via global context

### 4. AI Chat Assistant (Floating Widget — all pages) - (mockData)
A chat icon is available on navbar. Clicking it opens a chat panel where users can ask natural language questions and receive instant, context-aware responses.

### 5. Global State
All booking data, dark mode preference, and chat state are managed centrally via `BookingContext` using React's `useReducer`. This ensures consistent state across all pages without prop drilling.

---

## 🤖 AI Integration Approach

### Overview

The AI assistant is a floating chat widget (`AIChatWidget.jsx`) accessible from navbar of the app. It maintains a **session-based message history** and provides intelligent responses to salon-related queries.

### Architecture

```
User Input
    ↓
sendMessage() in aiServices.js
    ↓
[Try] Anthropic Claude API (claude-sonnet-4-20250514)
    ↓ (if API unavailable or unauthenticated)
[Fallback] Pattern-matching Mock Response Engine
    ↓
Response rendered in chat UI with typing indicator
```

### Implementation Details

#### 1. Mock Response Fallback (Primary Mode — No API Key Required)
Since the API requires a paid key, the application is built to be **fully functional without one**. The assistant seamlessly falls back to a local **pattern-matching engine**.

The mock engine contains **50+ curated intent patterns** grouped into categories:

| Category | Example Queries |
|---|---|
| Greetings | "Hi", "Hello", "How are you?" |
| Booking Flow | "How do I book?", "Book today", "Weekend slots" |
| Cancellation | "Cancel my booking", "Refund policy" |
| Availability | "What slots are open?", "When are you open?" |
| Services | "What do you offer?", "Popular services" |
| Haircut | "Fade", "Bob cut", "Women's haircut" |
| Hair Color | "Balayage", "Highlights", "Ombre" |
| Hair Spa | "Deep conditioning", "Scalp treatment" |
| Makeup | "Bridal makeup", "Airbrush" |
| Nails | "Gel nails", "Nail art", "Extensions" |
| Pricing | "How much?", "Discounts", "Membership" |
| Payments | "UPI", "Card", "GPay" |
| Salon Info | "Opening hours", "Nearest salon" |
| My Bookings | "View bookings", "Past appointments" |
| Products | "Shampoo recommendation", "Aftercare tips" |
| Feedback | "Complaint", "Rate service" |
| Support | "Contact support", "App not working" |

If no pattern matches, a helpful fallback message guides the user to relevant topics.

#### 2. Simulated Typing Delay
A realistic typing delay (700–1300 ms) is added for mock responses to maintain a natural conversational feel and render the typing indicator animation.

#### 3. Chat Message History
The full conversation history is maintained in local React state within the chat widget.

### Why Mock Instead of Live API?

> The Anthropic API requires a paid API key. To keep the application functional and demonstrable without incurring costs, all AI capabilities are delivered through a local mock engine by default.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool and dev server |
| React Router v7 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling |
| Axios | HTTP client for API calls |
| date-fns | Date formatting and manipulation |
| lucide-react | Icon library |
| React Context + useReducer | Global state management |
| AI assistant (with mock fallback) |

---

## ✨ Features

- Browse and filter salon services by category, price, and duration
- Full booking flow with date selection, time slot picker, and confirmation
- Personal dashboard to view and manage all bookings
- Cancel bookings with a confirmation modal
- AI-powered floating chat assistant available on all pages
- Session-based chat history for contextual conversations
- 50+ curated AI response patterns covering all common salon queries
- Graceful fallback when AI API is unavailable
- Dark mode support (toggle via context)
- Fully responsive layout

---

## 🔮 Bonus Features Implemented

- **Context-aware AI** — system prompt scopes AI knowledge to the salon domain
- **Mock AI with real intent patterns** — covers 15+ topic categories with rich responses
- **Typing indicator animation** — realistic chat UX during AI response delay
- **Dark mode toggle** — persisted across navigation via global context
- **Smooth booking flow** — with validation, success screen, and error feedback

---