import { useState, useRef, useEffect } from "react";
import {
  X,
  Plus,
  Settings,
  User,
  Mic,
  BarChart2,
  Send,
  Scissors,
  Sparkles,
  Calendar,
  ShoppingBag,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import { sendMessage } from "../../services/aiServices";
import clsx from "clsx";
import { LogoIcon } from "../../assets";
import { ProfilePicture } from "../../assets";

const QUICK_TOPICS = [
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

const CHAT_HISTORY = [
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

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot w-2 h-2 rounded-full bg-pink-400"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={clsx("flex mb-4", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-pink-700 flex items-center justify-center mr-2.5 mt-0.5 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div
        className={clsx(
          "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
          isUser
            ? "bg-pink-700 text-white rounded-tr-sm"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-sm",
        )}
      >
        {/* Simple markdown: bold */}
        <span
          dangerouslySetInnerHTML={{
            __html: msg.content
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\n/g, "<br/>"),
          }}
        />
      </div>
    </div>
  );
}

export default function AIChatWidget() {
  const { state, dispatch } = useBooking();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeHistory, setActiveHistory] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (state.chatOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [state.chatOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(text) {
    const content = (text || input).trim();
    if (!content || loading) return;

    const userMsg = { role: "user", content };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(nextMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I ran into an issue. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleQuickTopic(prompt) {
    handleSend(prompt);
  }

  function startNewChat() {
    setMessages([]);
    setActiveHistory(null);
  }

  if (!state.chatOpen) return null;

  // Group history
  const todayItems = CHAT_HISTORY.filter((h) => h.group === "Today");
  const yesterdayItems = CHAT_HISTORY.filter((h) => h.group === "Yesterday");

  return (
    <div className="fixed inset-0 z-50 dark:border-1 dark:border-x-zinc-500 flex items-stretch justify-end sm:inset-auto sm:bottom-4 sm:right-4 sm:w-[860px] sm:h-[600px] sm:rounded-2xl overflow-hidden shadow-2xl animate-slide-up border border-zinc-100 dark:border-zinc-800">
      {/* Sidebar */}
      <div
        className={clsx(
          "w-72 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 flex flex-col transition-all duration-300",
          sidebarOpen ? "flex" : "hidden",
        )}
      >
        {/* Sidebar header */}
        <div className="flex mt-4 mx-4">
          <div className="flex items-center gap-2 flex-1">
            <img
              src={LogoIcon}
              alt="Hair Rap By YOYO"
              className="h-8 w-auto object-contain mb-5"
            />
          </div>
        </div>
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
          <button
            onClick={startNewChat}
            className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {[
            { label: "Today", items: todayItems },
            { label: "Yesterday", items: yesterdayItems },
          ].map(({ label, items }) => (
            <div key={label}>
              <p className="px-2 py-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wide">
                {label}
              </p>
              {items.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActiveHistory(h.id)}
                  className={clsx(
                    "w-full text-left px-3 py-2.5 rounded-xl transition-colors",
                    activeHistory === h.id
                      ? "bg-pink-50 dark:bg-pink-950/40"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800",
                  )}
                >
                  <p
                    className={clsx(
                      "text-sm font-medium leading-snug",
                      activeHistory === h.id
                        ? "text-pink-800 dark:text-pink-300"
                        : "text-zinc-800 dark:text-zinc-200",
                    )}
                  >
                    {h.title}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 line-clamp-1">
                    {h.sub}
                  </p>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-zinc-950">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn-ghost p-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <rect
                  x="1"
                  y="3"
                  width="14"
                  height="1.5"
                  rx=".75"
                  fill="currentColor"
                />
                <rect
                  x="1"
                  y="7"
                  width="14"
                  height="1.5"
                  rx=".75"
                  fill="currentColor"
                />
                <rect
                  x="1"
                  y="11"
                  width="14"
                  height="1.5"
                  rx=".75"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1" />

          <button className="btn-ghost p-1.5">
            <Settings className="w-4 h-4" />
          </button>
          <div className="w-7 h-7 rounded-full overflow-hidden">
            <img
              src= {ProfilePicture}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => dispatch({ type: "SET_CHAT_OPEN", payload: false })}
            className="btn-ghost p-1.5 text-zinc-400 hover:text-zinc-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages or welcome */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
              <h2 className="font-inter text-2xl font-bold text-zinc-900 dark:text-white mb-8">
                Hey! How can I assist you today?
              </h2>

              {/* Quick topics */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
                {QUICK_TOPICS.map(({ icon: Icon, label, sub, prompt }) => (
                  <button
                    key={label}
                    onClick={() => handleQuickTopic(prompt)}
                    className={clsx(
                      "card p-3.5 text-left hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200",
                      label === "Salon Products" ? "col-span-1" : "",
                    )}
                  >
                    <Icon className="w-5 h-5 text-pink-700 mb-2" />
                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
                      {label}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 leading-snug">
                      {sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} />
              ))}
              {loading && (
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-full bg-pink-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-sm">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 px-4 py-2.5">
            <button className="text-zinc-400 hover:text-pink-700 transition-colors">
              <Plus className="w-4 h-4" />
            </button>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSend()
              }
              placeholder="Browse help topics"
              className="flex-1 bg-transparent text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 outline-none"
            />

            <div className="flex items-center gap-1.5">
              <button className="text-zinc-400 hover:text-pink-700 transition-colors">
                <Mic className="w-4 h-4" />
              </button>
              <button className="text-zinc-400 hover:text-pink-700 transition-colors">
                <BarChart2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="w-7 h-7 rounded-full bg-pink-700 flex items-center justify-center hover:bg-pink-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors ml-1"
              >
                <Send className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
