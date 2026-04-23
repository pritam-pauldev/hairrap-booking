const SOCIAL_LINKS = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/hairrapbyyoyo/",
    bgColor: "bg-blue-600",
    icon: (
      <svg
        className="w-3.5 h-3.5 text-white"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M9.5 3H11V1h-1.5A3.5 3.5 0 006 4.5V6H4.5v2H6v7h2V8h1.5l.5-2H8V4.5A1.5 1.5 0 019.5 3z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/hairrapbyyoyo",
    bgColor: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400",
    icon: (
      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 16 16">
        <rect
          x="2"
          y="2"
          width="12"
          height="12"
          rx="3.5"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="11.5" cy="4.5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "x",
    label: "X (Twitter)",
    href: "https://x.com/hairrapbyyoyo",
    bgColor: "bg-zinc-900",
    icon: (
      <svg
        className="w-3.5 h-3.5 text-white"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M12.6 2h2.2L9.9 7.3 15.5 14h-4l-3.5-4.6L4.1 14H1.9l5.2-5.7L1.5 2h4.1l3.2 4.2L12.6 2zm-.8 10.8h1.2L4.3 3.2H3l8.8 9.6z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/",
    bgColor: "bg-emerald-500",
    icon: (
      <svg
        className="w-3.5 h-3.5 text-white"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M8 1a7 7 0 00-6.1 10.4L1 15l3.7-.9A7 7 0 108 1zm0 12.5a5.5 5.5 0 01-2.8-.8l-.2-.1-2.2.6.6-2.1-.1-.2A5.5 5.5 0 118 13.5zm3-3.9c-.2-.1-.9-.4-1-.5-.2-.1-.3-.1-.4.1l-.6.7c-.1.1-.2.1-.4 0a5 5 0 01-1.4-.9 5.3 5.3 0 01-1-1.4c-.1-.2 0-.3.1-.4l.3-.3.2-.3v-.3L6.3 5.8c-.1-.2-.3-.2-.4-.2h-.4a.8.8 0 00-.6.3A2.4 2.4 0 004.5 7.5a4.2 4.2 0 00.9 2.2 9.6 9.6 0 003.7 3.2c.5.2.9.3 1.2.4a3 3 0 001.3.1 2.2 2.2 0 001.4-1 1.7 1.7 0 00.1-1c-.1-.1-.2-.2-.4-.3z" />
      </svg>
    ),
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/",
    bgColor: "bg-sky-500",
    icon: (
      <svg
        className="w-3.5 h-3.5 text-white"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M13.9 2.3L1.6 7c-.8.3-.8.8-.1 1l3.1 1 1.2 3.6c.2.5.4.6.7.6.2 0 .4-.1.6-.3l1.7-1.6 3.3 2.4c.6.3 1 .2 1.2-.6l2.1-9.9c.3-.9-.2-1.3-.9-1z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/hairrapbyyoyo/",
    bgColor: "bg-blue-700",
    icon: (
      <svg
        className="w-3.5 h-3.5 text-white"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M3.7 2a1.3 1.3 0 100 2.6A1.3 1.3 0 003.7 2zM2.5 5.5h2.4V13H2.5V5.5zm3.8 0H8.6v1a2.8 2.8 0 012.4-1.1c2.1 0 2.5 1.4 2.5 3.2V13h-2.4V9c0-.8 0-1.9-1.2-1.9S8.7 8.2 8.7 9v4H6.3V5.5z" />
      </svg>
    ),
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-1.5">
      {SOCIAL_LINKS.map(({ id, label, href, bgColor, icon }) => (
        
         <a key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`w-[24px] h-[24px] rounded-full ${bgColor} flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all duration-150`}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}