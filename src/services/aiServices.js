/**
 * AI Assistant Service
 * Falls back to mock responses for common salon queries
 */

const SYSTEM_PROMPT = `You are a helpful AI assistant for "Hair Rap By YOYO", a salon booking platform.
You help users with:
- Booking haircuts, hair color, spa treatments, nails, and makeup appointments
- Answering questions about services, prices, and availability
- Guiding users through the booking flow
- Explaining how to cancel or reschedule bookings

Services available: Hair Cut (₹399–₹699, 45–60 min), Hair Color (₹299–₹569, 75–90 min), 
Hair Spa (₹569, 60 min), Makeup (₹749, 75 min), Nails (₹459, 50 min).

Be concise, friendly, and helpful. When suggesting a service, mention its price and duration.
If asked to book, guide the user to the Services page or provide step-by-step booking guidance.
Always respond in 2-4 sentences max unless listing options.`;

// Mock responses for fast, offline-capable replies
const MOCK_RESPONSES = [
  {
    patterns: [/cancel/i, /cancellation/i],
    response:
      "To cancel a booking, go to **My Bookings** in your dashboard and click the booking you want to cancel. You'll see a Cancel option there. Cancellations made 24+ hours before the appointment are fully refunded.",
  },
  {
    patterns: [/reschedule/i, /change.*time/i, /move.*appointment/i],
    response:
      "To reschedule, visit **My Bookings**, select your booking, and choose 'Reschedule'. You can pick a new date and time slot. Changes are free up to 12 hours before your appointment.",
  },
  {
    patterns: [/slot.*available|available.*slot|time.*available|what.*time/i],
    response:
      "Available slots today are: 9:00 AM, 10:00 AM, 10:30 AM, 12:00 PM, 3:00 PM, 3:30 PM, 5:00 PM, and 6:00 PM. Would you like to book one? Head to the **Services** page to choose a service first.",
  },
  {
    patterns: [/haircut|hair cut|men.*cut|women.*cut/i],
    response:
      "We offer **Men's Haircut** (₹399–₹699, 45 min) and **Women's Haircut** (₹399–₹699, 60 min) across our partner salons. Crown & Curl in Texas is highly rated at 4.9⭐. Would you like me to take you to the booking page?",
  },
  {
    patterns: [/hair color|colour|highlights|balayage/i],
    response:
      "Hair color services start from **₹299** and include balayage, highlights, full color, and color correction (duration: 75–90 min). Glow & Glam Studio (4.9⭐) and Élan Beauty Bar (4.6⭐) are top picks. Want to book?",
  },
  {
    patterns: [/spa|treatment|nourish/i],
    response:
      "Our **Hair Spa** service at The Velvet Touch is ₹569 (60 min, 4.7⭐). It includes deep conditioning and shine restoration. Shall I walk you to the booking page?",
  },
  {
    patterns: [/makeup|make.?up/i],
    response:
      "**Makeup** services at Opal Beauty Lounge are ₹749 (75 min, 4.8⭐) — perfect for events and photoshoots. It's our highest-rated makeup service. Want to book?",
  },
  {
    patterns: [/nails|manicure|pedicure/i],
    response:
      "**Nails** at The Glam Society are ₹459 (50 min, 4.2⭐). We offer gel, acrylic, and classic nail art with premium products. Ready to book?",
  },
  {
    patterns: [/price|cost|how much|cheapest|affordable/i],
    response:
      "Our most affordable services start at ₹299 (Hair Color – Urban Blend). Haircuts from ₹399, Nails ₹459, Hair Spa ₹569, and Makeup from ₹749. All prices include service + product. Which fits your budget?",
  },
  {
    patterns: [/book|appointment|schedule/i],
    response:
      "To book an appointment: 1) Browse **Services**, 2) Select a service you like, 3) Choose a date & time slot, 4) Fill in your details and confirm. It only takes about 2 minutes! Want me to help you choose a service?",
  },
  {
    patterns: [/recommend|suggest|best|popular|which service/i],
    response:
      "Our most popular picks are: **Crown & Curl Hair Cut** (4.9⭐, ₹699) and **Glow & Glam Hair Color** (4.9⭐, ₹499). For pampering, try the **Hair Spa** at The Velvet Touch. What's the occasion?",
  },
  {
    patterns: [/hello|hi|hey|good morning|good afternoon/i],
    response:
      "Hey there! 👋 I'm your salon assistant. I can help you book appointments, explore services, check availability, or answer any questions. What can I do for you today?",
  },
  {
    patterns: [/thank|thanks|thank you/i],
    response:
      "You're welcome! 😊 Feel free to ask if you need anything else. I'm always here to help with bookings and service info.",
  },
  {
    patterns: [/how.*cancel|steps.*cancel/i],
    response:
      "Cancellation is simple: Dashboard → My Bookings → Select booking → Cancel. Refunds are processed in 3–5 business days. Need help with anything else?",
  },
];

function getMockResponse(message) {
  const lower = message.toLowerCase();
  for (const rule of MOCK_RESPONSES) {
    if (rule.patterns.some((p) => p.test(lower))) {
      return rule.response;
    }
  }
  return "I'm not sure I have that information right now. For specific queries, you can visit our **Help Center** or browse the **Services** page. Is there something else I can help with?";
}

/**
 * Send a message to AI. Tries the Claude API first, falls back to mock.
 * @param {Array<{role: string, content: string}>} messages - Chat history
 * @returns {Promise<string>} - Assistant reply
 */
export async function sendMessage(messages) {
  // Try real API (works when API key is configured via Anthropic proxy)
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return (
        data.content?.[0]?.text ||
        getMockResponse(messages.at(-1)?.content || "")
      );
    }
  } catch {
    // API not available — use mock
  }

  // Simulate network delay for realism
  await new Promise((r) => setTimeout(r, 700 + Math.random() * 600));
  return getMockResponse(messages.at(-1)?.content || "");
}
