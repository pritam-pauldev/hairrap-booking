// src/components/chat/MessageBubble.jsx

import { Sparkles } from "lucide-react";
import clsx from "clsx";

export default function MessageBubble({ msg }) {
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
