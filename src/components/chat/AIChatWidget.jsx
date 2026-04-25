// src/components/chat/AIChatWidget.jsx

import { useState, useRef, useEffect } from "react";
import {
  X,
  Plus,
  Settings,
  Mic,
  BarChart2,
  Send,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import { sendMessage } from "../../services/aiServices";
import clsx from "clsx";
import { LogoIcon, ProfilePicture } from "../../assets";
import { QUICK_TOPICS, CHAT_HISTORY } from "./chatConstants";
import TypingIndicator from "./TypingIndicator";
import MessageBubble from "./MessageBubble";

export default function AIChatWidget() {
  const { state, dispatch } = useBooking();
  // Sidebar hidden by default on mobile, visible on desktop
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const todayItems = CHAT_HISTORY.filter((h) => h.group === "Today");
  const yesterdayItems = CHAT_HISTORY.filter((h) => h.group === "Yesterday");

  return (
    <>
      {/* Backdrop on mobile */}
      <div
        className="fixed inset-0 bg-black/40 z-40 sm:hidden"
        onClick={() => dispatch({ type: "SET_CHAT_OPEN", payload: false })}
      />

      {/* Widget container */}
      <div
        className={clsx(
          "fixed z-50 flex overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800 animate-slide-up",
          // Mobile: full screen
          "inset-0 rounded-none",
          // sm+: floating panel bottom-right
          "sm:inset-auto sm:bottom-4 sm:right-4 sm:rounded-2xl",
          // Width: responsive
          sidebarOpen
            ? "sm:w-[720px] lg:w-[860px]"
            : "sm:w-[440px] lg:w-[520px]",
          "sm:h-[600px]",
          "transition-all duration-300",
        )}
      >
        {/* History Sidebar */}
        <div
          className={clsx(
            "bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 flex flex-col transition-all duration-300 overflow-hidden",
            sidebarOpen ? "w-64 shrink-0" : "w-0",
          )}
        >
          {/* Logo */}
          <div className="flex mt-4 mx-4">
            <img
              src={LogoIcon}
              alt="Hair Rap By YOYO"
              className="h-8 w-auto object-contain mb-5"
            />
          </div>

          <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
            <button
              onClick={startNewChat}
              className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4 shrink-0" />
              New Chat
            </button>
          </div>

          {/* History list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1 min-w-0">
            {[
              { label: "Today", items: todayItems },
              { label: "Yesterday", items: yesterdayItems },
            ].map(({ label, items }) => (
              <div key={label}>
                <p className="px-2 py-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wide whitespace-nowrap">
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
                        "text-sm font-medium leading-snug truncate",
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
        <div className="flex-1 flex flex-col bg-white dark:bg-zinc-950 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn-ghost p-1.5 shrink-0"
              title={sidebarOpen ? "Hide history" : "Show history"}
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeftOpen className="w-4 h-4" />
              )}
            </button>

            <span className="flex-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
              AI Assistant
            </span>

            <button className="btn-ghost p-1.5 shrink-0">
              <Settings className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
              <img
                src={ProfilePicture}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() =>
                dispatch({ type: "SET_CHAT_OPEN", payload: false })
              }
              className="btn-ghost p-1.5 text-zinc-400 hover:text-zinc-700 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages or welcome */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in px-2">
                <h2 className="font-inter text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-6 sm:mb-8">
                  Hey! How can I assist you today?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 w-full max-w-lg">
                  {QUICK_TOPICS.map(({ icon: Icon, label, sub, prompt }) => (
                    <button
                      key={label}
                      onClick={() => handleQuickTopic(prompt)}
                      className="card p-3 sm:p-3.5 text-left hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-pink-700 mb-1.5 sm:mb-2" />
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
                        {label}
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 leading-snug hidden sm:block">
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
          <div className="px-3 sm:px-4 pb-3 sm:pb-4 shrink-0">
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 px-3 sm:px-4 py-2.5">
              <button className="text-zinc-400 hover:text-pink-700 transition-colors shrink-0">
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
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 outline-none min-w-0"
              />

              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button className="text-zinc-400 hover:text-pink-700 transition-colors hidden sm:block">
                  <Mic className="w-4 h-4" />
                </button>
                <button className="text-zinc-400 hover:text-pink-700 transition-colors hidden sm:block">
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
    </>
  );
}
