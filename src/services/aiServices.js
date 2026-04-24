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
  // ── Greetings ──────────────────────────────────────────────────────────────
  {
    patterns: [
      /^(hello|hi|hey|sup|yo|hola|good morning|good afternoon|good evening|good night|howdy|what'?s up|wassup)\b/i,
    ],
    response:
      "Hey there! 👋 I'm your Hair Rap By YOYO assistant. I can help you **book appointments**, explore services, check prices, or answer any salon questions. What can I do for you today?",
  },
  {
    patterns: [/how are you|how r u|how do you do|you okay/i],
    response:
      "I'm doing great, thanks for asking! 😊 Ready to help you look and feel amazing. What brings you here today — booking, services, or something else?",
  },
  {
    patterns: [
      /who are you|what are you|tell me about yourself|introduce yourself/i,
    ],
    response:
      "I'm the **Hair Rap By YOYO** AI assistant 🤖✂️ — your personal guide to all things salon. I can help you book appointments, pick the right service, check pricing, and manage your bookings. Ask me anything!",
  },
  {
    patterns: [
      /what can you do|how can you help|help me|what do you know|capabilities/i,
    ],
    response:
      "I can help you with: **Booking appointments** 📅, **Exploring services & prices** 💇, **Checking available slots** 🕐, **Managing your bookings** (reschedule/cancel), and **Salon product info** 🛍️. Just ask away!",
  },

  // ── Booking Flow ────────────────────────────────────────────────────────────
  {
    patterns: [/book|appointment|schedule|reserve|want.*service|get.*service/i],
    response:
      "To book an appointment: 1) Go to **Services** page, 2) Pick a service you like, 3) Choose a **date & time slot**, 4) Enter your details and confirm. Done in under 2 minutes! Want help choosing a service?",
  },
  {
    patterns: [
      /how.*book|steps.*book|process.*book|booking.*process|how do i book/i,
    ],
    response:
      "Booking is easy! Head to the **Services** page → Select a service → Pick your preferred date & time → Confirm your details. You'll get an instant confirmation. Need help picking a service?",
  },
  {
    patterns: [/book.*today|appointment.*today|today.*appointment|same day/i],
    response:
      "We have same-day slots available today! 🎉 Available times: **9:00 AM, 10:30 AM, 12:00 PM, 3:00 PM, 5:00 PM**. Head to the Services page and pick a slot before they fill up!",
  },
  {
    patterns: [/book.*tomorrow|appointment.*tomorrow|tomorrow.*slot/i],
    response:
      "Tomorrow looks wide open! 📅 You can choose from morning (9 AM – 12 PM) or afternoon (2 PM – 7 PM) slots. Go to **Services**, pick your service, and select tomorrow's date to see all available times.",
  },
  {
    patterns: [/book.*weekend|saturday|sunday|weekend.*slot/i],
    response:
      "Weekend slots are popular — book early! 🗓️ Saturday & Sunday slots from **10 AM to 6 PM** are available. Head to the **Services** page and select your preferred weekend date. We recommend booking at least a day in advance.",
  },

  // ── Cancellation & Rescheduling ─────────────────────────────────────────────
  {
    patterns: [/cancel|cancellation|cancel.*booking|cancel.*appointment/i],
    response:
      "To cancel a booking: Go to **My Bookings** → Select the booking → Tap **Cancel**. Cancellations made **24+ hours** before the appointment are fully refunded. Need help finding your booking?",
  },
  {
    patterns: [
      /reschedule|change.*time|move.*appointment|shift.*appointment|change.*date/i,
    ],
    response:
      "To reschedule: **My Bookings** → Select your booking → Tap **Reschedule** → Pick a new date & time. Changes are free up to **12 hours** before your appointment. Easy peasy!",
  },
  {
    patterns: [/refund|money back|get.*refund|when.*refund|refund.*policy/i],
    response:
      "Refunds are processed within **3–5 business days** to your original payment method. Full refund if cancelled 24+ hours before. Cancellations within 24 hours may incur a 20% fee. Anything else I can help with?",
  },
  {
    patterns: [/late|running late|delay|will be late|can't make it on time/i],
    response:
      "No worries! We allow up to **15 minutes** grace time. If you'll be more than 15 minutes late, please reschedule through **My Bookings** to avoid a missed appointment fee. Need help rescheduling?",
  },

  // ── Availability & Slots ────────────────────────────────────────────────────
  {
    patterns: [
      /slot.*available|available.*slot|time.*available|what.*time|open.*slot|free.*slot/i,
    ],
    response:
      "Today's available slots are: **9:00 AM, 10:00 AM, 10:30 AM, 12:00 PM, 3:00 PM, 3:30 PM, 5:00 PM, 6:00 PM**. Head to the **Services** page to pick your service and lock in a time!",
  },
  {
    patterns: [
      /is.*open|are you open|opening.*hour|working.*hour|timing|when.*open|salon.*hour/i,
    ],
    response:
      "Our partner salons are open **Monday–Saturday: 9:00 AM – 8:00 PM** and **Sunday: 10:00 AM – 6:00 PM**. Exact hours may vary per salon. Check the specific salon page for their schedule.",
  },
  {
    patterns: [/busy|crowded|peak.*hour|best.*time.*visit|when.*less crowded/i],
    response:
      "Weekday mornings (**9 AM – 12 PM**) are usually the least crowded — great for a relaxed experience! 😌 Weekends and after 5 PM tend to be busiest. Early slots go fast, so book ahead!",
  },
  {
    patterns: [/wait.*time|how long.*wait|queue/i],
    response:
      "With a confirmed booking there's **no waiting** — you walk in at your scheduled time! 🙌 Walk-ins are welcome but may wait 20–40 minutes depending on availability. Booking ahead is always recommended.",
  },

  // ── Services Overview ────────────────────────────────────────────────────────
  {
    patterns: [
      /service|what.*offer|what.*provide|all service|list.*service|show.*service/i,
    ],
    response:
      "We offer: ✂️ **Hair Cut** (₹399–₹699, 45–60 min), 🎨 **Hair Color** (₹299–₹569, 75–90 min), 💆 **Hair Spa** (₹569, 60 min), 💄 **Makeup** (₹749, 75 min), 💅 **Nails** (₹459, 50 min). Which interests you?",
  },
  {
    patterns: [
      /popular|trending|best.*service|top.*service|most.*booked|recommended/i,
    ],
    response:
      "Our most popular services right now: 🏆 **Crown & Curl Hair Cut** (4.9⭐, ₹699), 🎨 **Glow & Glam Hair Color** (4.9⭐, ₹499), 💄 **Opal Makeup** (4.8⭐, ₹749). Want to book one?",
  },

  // ── Haircut ──────────────────────────────────────────────────────────────────
  {
    patterns: [/haircut|hair cut|men.*cut|women.*cut|trim|hair.*trim/i],
    response:
      "We offer **Men's Haircut** (₹399–₹699, 45 min) and **Women's Haircut** (₹399–₹699, 60 min). **Crown & Curl** is our top-rated salon at 4.9⭐. Includes wash, cut & blow-dry. Want to book?",
  },
  {
    patterns: [/fade|taper|undercut|buzz cut|crew cut/i],
    response:
      "Yes! Our men's salons offer **fades, tapers, undercuts, buzz cuts & crew cuts** starting at ₹399 (45 min). **Crown & Curl** (4.9⭐) and **The Barber's Den** are top picks for precision cuts. Want to book?",
  },
  {
    patterns: [/blunt.*cut|layered.*cut|bob|pixie|bangs|fringe/i],
    response:
      "Our stylists excel at **blunt cuts, layered cuts, bobs, pixie cuts & bangs** 💇‍♀️. Women's haircuts start at ₹399 (60 min, includes wash & style). **Style Studio** (4.8⭐) is highly recommended. Shall I guide you to booking?",
  },

  // ── Hair Color ───────────────────────────────────────────────────────────────
  {
    patterns: [/hair color|colour|highlights|balayage|ombre|dye|tint|bleach/i],
    response:
      "Hair color services start from **₹299** and include balayage, highlights, ombre, full color & color correction (75–90 min). **Glow & Glam Studio** (4.9⭐) and **Élan Beauty Bar** (4.6⭐) are top picks. Want to book?",
  },
  {
    patterns: [/color.*damage|safe.*color|ammonia.*free|organic.*color/i],
    response:
      "We use **ammonia-free, organic-grade** color products that minimize damage and keep your hair healthy! 🌿 Our colorists are trained in protective coloring techniques. **Glow & Glam** (4.9⭐) specializes in safe color treatments.",
  },
  {
    patterns: [/how long.*color.*last|color.*fade|maintain.*color/i],
    response:
      "Professional color typically lasts **4–8 weeks** depending on hair type and maintenance. We recommend a **color-safe shampoo** and avoiding excessive heat. Ask your stylist about our **color-protect aftercare** products!",
  },

  // ── Hair Spa & Treatments ────────────────────────────────────────────────────
  {
    patterns: [
      /spa|hair.*spa|deep condition|treatment|nourish|damage.*repair|frizz/i,
    ],
    response:
      "Our **Hair Spa** at The Velvet Touch is ₹569 (60 min, 4.7⭐) — includes deep conditioning, scalp massage, and shine restoration. Perfect for damaged or frizzy hair! Want to book a session?",
  },
  {
    patterns: [/keratin|smoothing|straighten|rebonding|brazilian.*blowout/i],
    response:
      "We offer **Keratin Treatments & Rebonding** for smooth, frizz-free hair that lasts 3–6 months! 💆‍♀️ Prices start at ₹1,499 depending on hair length. **Silk & Shine Salon** (4.8⭐) is our top pick for this. Interested?",
  },
  {
    patterns: [
      /scalp|dandruff|itchy.*scalp|scalp.*treatment|oily.*scalp|dry.*scalp/i,
    ],
    response:
      "We have specialized **scalp treatments** for dandruff, oily scalp, dry scalp & hair fall (₹499–₹799, 45–60 min). Our hair spa also includes a relaxing scalp massage. **The Velvet Touch** (4.7⭐) is our best option for scalp care!",
  },
  {
    patterns: [/hair.*fall|hair.*loss|thinning|hair.*growth|regrowth/i],
    response:
      "Our **anti-hair fall treatment** (₹699, 60 min) includes a nourishing scalp massage + growth serum application. For severe concerns, we recommend consulting with our **hair experts** at The Velvet Touch. Want to book a consultation?",
  },

  // ── Makeup ───────────────────────────────────────────────────────────────────
  {
    patterns: [/makeup|make.?up|bridal.*makeup|party.*makeup|event.*makeup/i],
    response:
      "**Makeup** at Opal Beauty Lounge is ₹749 (75 min, 4.8⭐) — perfect for events, parties & photoshoots. For **bridal makeup**, we have premium packages starting at ₹2,999. Want to book?",
  },
  {
    patterns: [/bridal|wedding|bride|mehndi|engagement/i],
    response:
      "Congratulations! 💍 Our **Bridal Packages** include full makeup, hairstyling & prep, starting from ₹2,999. We recommend booking **at least 1–2 weeks in advance** for wedding dates. Want me to show you available bridal packages?",
  },
  {
    patterns: [/airbrush|hd.*makeup|natural.*look|no.*makeup.*look|dewy/i],
    response:
      "Yes! We offer **airbrush, HD, natural & dewy makeup** looks 💄. Our artists at Opal Beauty Lounge are trained in all styles (₹749–₹1,499). Share your inspo pic at the salon for the best results!",
  },

  // ── Nails ─────────────────────────────────────────────────────────────────────
  {
    patterns: [/nails|manicure|pedicure|nail.*art|gel.*nail|acrylic/i],
    response:
      "**Nails** at The Glam Society are ₹459 (50 min, 4.2⭐). We offer **gel, acrylic, classic mani-pedi & nail art** with premium products. Want a single service or a mani-pedi combo?",
  },
  {
    patterns: [/nail.*design|nail.*extension|french.*tip|ombre.*nail/i],
    response:
      "Our nail artists do **extensions, French tips, ombre, 3D art & custom designs** 💅. Nail extensions start at ₹699 (60 min). **The Glam Society** (4.2⭐) has the best nail art selection. Want to book?",
  },

  // ── Pricing ──────────────────────────────────────────────────────────────────
  {
    patterns: [
      /price|cost|how much|cheapest|affordable|rate|fee|charge|expensive/i,
    ],
    response:
      "Here's our price range: ✂️ Haircut **₹399–₹699**, 🎨 Hair Color **₹299–₹569**, 💆 Hair Spa **₹569**, 💄 Makeup **₹749**, 💅 Nails **₹459**. All prices include service + products. Which fits your budget?",
  },
  {
    patterns: [/discount|offer|deal|promo|coupon|cashback|free|off/i],
    response:
      "🎉 Current offers: **10% off** on first booking, **Combo deals** (Hair Cut + Color at ₹999), and **Loyalty points** on every visit. Check the **Offers** section in the app for the latest deals!",
  },
  {
    patterns: [/membership|subscription|loyalty|points|reward/i],
    response:
      "Our **Loyalty Program** gives you **1 point per ₹10** spent. Redeem points for free services or discounts! 🏅 **Monthly memberships** (₹999/month) include unlimited cuts + 20% off all services. Interested?",
  },
  {
    patterns: [/payment|pay|upi|card|cash|gpay|phonepe|paytm|online.*pay/i],
    response:
      "We accept **UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking & Cash** 💳. Payments can be made at the salon or pre-paid online at booking. All transactions are 100% secure!",
  },

  // ── Salon Info ───────────────────────────────────────────────────────────────
  {
    patterns: [
      /location|address|where.*salon|find.*salon|nearest.*salon|salon.*near/i,
    ],
    response:
      "We have partner salons across multiple locations! 📍 Use the **Explore** or **Map** section in the app to find the nearest salon with available slots. Filter by service, rating & distance!",
  },
  {
    patterns: [/salon.*rating|best.*salon|top.*salon|highly.*rated/i],
    response:
      "Our top-rated salons: ⭐ **Crown & Curl** (4.9 — Haircut), ⭐ **Glow & Glam** (4.9 — Hair Color), ⭐ **Opal Beauty Lounge** (4.8 — Makeup), ⭐ **Silk & Shine** (4.8 — Treatments). All verified & trusted!",
  },
  {
    patterns: [/staff|stylist|professional|expert|trained|experience/i],
    response:
      "All our stylists are **certified professionals** with 3+ years of experience 💪. They undergo regular training on the latest techniques & trends. You're in great hands every time!",
  },
  {
    patterns: [/hygiene|clean|sanitize|covid|safety|safe/i],
    response:
      "Your safety is our priority! 🧼 All partner salons follow **strict hygiene protocols** — sterilized tools, fresh towels per client & sanitized stations. We are fully compliant with health & safety standards.",
  },
  {
    patterns: [/parking|park.*car|bike.*parking/i],
    response:
      "Most of our partner salons have **free parking** available nearby 🚗. Check the specific salon's page in the app for parking info and directions.",
  },

  // ── Products ─────────────────────────────────────────────────────────────────
  {
    patterns: [
      /product|shampoo|conditioner|serum|oil|hair.*care.*product|buy.*product/i,
    ],
    response:
      "We carry **premium hair care products** including shampoos, conditioners, serums, hair oils & styling products 🛍️. Browse the **Products** section in the app. All products are sourced from trusted professional brands!",
  },
  {
    patterns: [
      /which.*shampoo|best.*shampoo|recommend.*shampoo|shampoo.*type/i,
    ],
    response:
      "Shampoo recommendation by hair type: **Dry hair** → Moisture-rich formula | **Oily hair** → Clarifying shampoo | **Damaged hair** → Repair & nourish | **Color-treated** → Color-safe shampoo. Want specific product suggestions?",
  },
  {
    patterns: [/home.*care|aftercare|maintain.*hair|tips.*hair|hair.*tip/i],
    response:
      "Top home care tips: 🌿 Use a **sulfate-free shampoo**, 💧 Deep condition **once a week**, 🔥 Limit **heat styling**, ✂️ Trim every **6–8 weeks**, and 🛌 Use a **silk pillowcase**. Want product recommendations too?",
  },

  // ── My Bookings / Account ────────────────────────────────────────────────────
  {
    patterns: [
      /my.*booking|view.*booking|see.*booking|booking.*history|past.*booking/i,
    ],
    response:
      "Go to **My Bookings** in your dashboard to view all upcoming and past appointments 📋. You can see details, reschedule, cancel, or rebook from there. Need help finding a specific booking?",
  },
  {
    patterns: [
      /my.*account|profile|update.*profile|edit.*profile|account.*setting/i,
    ],
    response:
      "You can update your **profile, contact info & preferences** in the **Account Settings** section 👤. Go to the top-right menu → Settings → Edit Profile. Any issues accessing your account?",
  },
  {
    patterns: [/login|sign in|log in|forgot.*password|reset.*password/i],
    response:
      "To **log in**, use your registered email or phone number. Forgot your password? Tap **'Forgot Password'** on the login screen and we'll send a reset link to your email 📧. Need more help?",
  },
  {
    patterns: [/sign up|register|create.*account|new.*account|new.*user/i],
    response:
      "Signing up is free and takes just **30 seconds** 🎉! Tap **Sign Up** on the home screen → Enter your name, email & phone → Verify OTP → Done! You'll also get **10% off** your first booking.",
  },
  {
    patterns: [/notification|reminder|alert|sms|email.*reminder/i],
    response:
      "We send **SMS & email reminders** 24 hours and 1 hour before your appointment 🔔. You can manage notification preferences in **Account Settings → Notifications**. Make sure your phone number is updated!",
  },

  // ── Consultation ─────────────────────────────────────────────────────────────
  {
    patterns: [
      /consult|consultation|expert.*advice|hair.*expert|skin.*expert|which.*service.*good/i,
    ],
    response:
      "Not sure what service to pick? Our **hair & beauty experts** are happy to guide you! 💬 Use the **Talk to Expert** option or describe your hair concern here — I'll help you find the right service.",
  },
  {
    patterns: [
      /hair.*type|know.*hair.*type|my.*hair|curly.*hair|straight.*hair|wavy.*hair/i,
    ],
    response:
      "Understanding your hair type helps pick the right service! **Straight** → Smoothing/keratin works great | **Wavy** → Hydration & diffusing | **Curly** → Moisture-rich spa & curl-defining treatments. Want a personalized recommendation?",
  },
  {
    patterns: [/skin.*type|dry.*skin|oily.*skin|sensitive.*skin|skin.*care/i],
    response:
      "For skin-related services like makeup & facial: **Dry skin** → Hydrating prep products | **Oily skin** → Matte-finish, oil-control products | **Sensitive** → Hypoallergenic, fragrance-free products. Our experts always customize!",
  },

  // ── Feedback & Support ───────────────────────────────────────────────────────
  {
    patterns: [
      /complaint|problem|issue|bad.*experience|unhappy|not satisfied|wrong/i,
    ],
    response:
      "I'm sorry to hear that! 😔 Please report your concern through **Help Center → Raise a Complaint** and our support team will respond within **24 hours**. Your experience matters to us and we'll make it right!",
  },
  {
    patterns: [/feedback|review|rate.*service|give.*rating|how.*rate/i],
    response:
      "We'd love your feedback! ⭐ After your appointment, you'll receive a **rating prompt** via SMS/email. You can also rate from **My Bookings → Select appointment → Leave Review**. Your feedback helps us improve!",
  },
  {
    patterns: [
      /contact|reach.*support|support.*team|customer.*care|helpline|help.*center/i,
    ],
    response:
      "You can reach our support team via: 📧 **Email**: support@hairrapbyyoyo.com | 📞 **Phone**: +91-XXXXX-XXXXX (Mon–Sat, 9 AM–6 PM) | 💬 **In-app chat**: Help Center → Chat with Us. We typically respond in under 2 hours!",
  },
  {
    patterns: [/app.*not.*work|bug|crash|error|glitch|slow.*app|app.*issue/i],
    response:
      "Sorry for the trouble! 🛠️ Try: 1) **Refresh** the page, 2) **Clear cache** & reload, 3) Check your internet connection. Still broken? Report it at **Help Center → Report a Bug** and our tech team will fix it ASAP!",
  },

  // ── Miscellaneous ─────────────────────────────────────────────────────────────
  {
    patterns: [/gift|gift card|gift.*voucher|present.*someone/i],
    response:
      "🎁 Gift a salon experience! Our **Gift Cards** are available in denominations of ₹499, ₹999, ₹1,499 & ₹2,999. Purchase from the **Gift Cards** section in the app. Perfect for birthdays, anniversaries & festivals!",
  },
  {
    patterns: [
      /group.*booking|family.*booking|multiple.*people|bulk.*booking/i,
    ],
    response:
      "Yes! We support **group bookings** for family & friends 👨‍👩‍👧‍👦. Book multiple services for different people in one go from the **Services** page. Groups of 3+ get **5% off** automatically!",
  },
  {
    patterns: [/kids|children|child.*haircut|baby.*haircut|boy.*haircut/i],
    response:
      "We offer **kids' haircuts** (under 12) starting at ₹249 (30 min) 🧒✂️. Our stylists are trained to make kids feel comfortable and happy. Perfect for a fun salon visit with the family!",
  },
  {
    patterns: [/beard|shave|facial.*hair|moustache|goatee/i],
    response:
      "Our men's salons offer **beard trims, shaping, hot towel shaves & grooming** starting at ₹199 (20–30 min) 🧔. **Crown & Curl** (4.9⭐) is our top pick for men's grooming. Want to book?",
  },
  {
    patterns: [
      /eyebrow|brow|threading|waxing|upper.*lip|facial.*hair.*removal/i,
    ],
    response:
      "We offer **eyebrow threading, shaping, tinting & waxing** starting at ₹99 🪡. Full face threading/waxing packages are also available. Check the **Services** page for full pricing!",
  },
  {
    patterns: [
      /facial|face.*treatment|cleanup|bleach.*face|de-tan|glow.*face/i,
    ],
    response:
      "Our **facial & skin treatments** include cleanup (₹399), de-tan (₹299), brightening facial (₹699) & glow packages. 🌟 **Opal Beauty Lounge** (4.8⭐) is top-rated for skin treatments. Want to book?",
  },

  // ── Thanks / Goodbye ──────────────────────────────────────────────────────────
  {
    patterns: [/thank|thanks|thank you|ty|thx|great.*help|so helpful/i],
    response:
      "You're welcome! 😊 Happy to help anytime. Enjoy your salon experience — you're going to look amazing! ✨ Is there anything else I can assist you with?",
  },
  {
    patterns: [/bye|goodbye|see you|take care|later|cya|good night.*bye/i],
    response:
      "Goodbye! 👋 See you soon at the salon. Don't forget to book your next appointment — your hair will thank you! 💇✨",
  },
  {
    patterns: [
      /ok|okay|got it|understood|alright|sure|sounds good|perfect|nice/i,
    ],
    response:
      "Great! 😊 Let me know if you need anything else — I'm always here to help with bookings, services, or any salon questions!",
  },
];

function getMockResponse(message) {
  const lower = message.toLowerCase().trim();
  for (const rule of MOCK_RESPONSES) {
    if (rule.patterns.some((p) => p.test(lower))) {
      return rule.response;
    }
  }
  return "I'm not sure about that one, but I'm here to help! 🤔 You can ask me about **booking appointments, services, prices, offers, or managing your bookings**. Or visit our **Help Center** for more support.";
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
