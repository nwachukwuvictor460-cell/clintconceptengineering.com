javascript// ===== Brand Carousels (sliding track) =====
document.querySelectorAll('.carousel-controls').forEach(controls => {
  const brand = controls.dataset.carousel;
  const track = document.getElementById(`track-${brand}`);
  const prevBtn = controls.querySelector('.prev');
  const nextBtn = controls.querySelector('.next');

  let position = 0;
  const cardWidth = 260; // card width (240px) + gap (20px)
  const visibleCards = 4; // how many cards show at once on desktop

  function updateTrack() {
    track.style.transform = `translateX(-${position * cardWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    const maxPosition = Math.max(track.children.length - visibleCards, 0);
    if (position < maxPosition) {
      position++;
      updateTrack();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (position > 0) {
      position--;
      updateTrack();
    }
  });
});

// ===== Newsletter Signup =====
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    document.getElementById('newsletter-msg').textContent =
      `Thanks! We'll send new drops and deals to ${email}.`;
    newsletterForm.reset();
  });
}And here's js/ai-assistant.js — type this in:javascript// =========================================
// GADGET KNOWLEDGE BASE
// This is what the assistant "knows" about. Add more
// gadgets here and the assistant automatically knows them.
// =========================================
const GADGET_KB = [
  {
    name: "iPhone 15", aliases: ["iphone 15", "iphone"],
    price: "\u20A6850,000", stock: "In Stock",
    specs: { Display: "6.1\" OLED", Storage: "128GB", Camera: "48MP", Battery: "3349mAh, up to 20hr video" }
  },
  {
    name: "Galaxy S24 Ultra", aliases: ["galaxy s24", "s24 ultra", "samsung s24"],
    price: "\u20A6980,000", stock: "Low Stock \u2014 only 3 left",
    specs: { Display: "6.8\" AMOLED", Storage: "256GB", Camera: "200MP", Battery: "5000mAh" }
  },
  {
    name: "Camon 30 Pro", aliases: ["camon 30", "tecno camon"],
    price: "\u20A6450,000", stock: "In Stock",
    specs: { Display: "6.78\" AMOLED", Storage: "256GB", Camera: "200MP", Battery: "5000mAh" }
  },
  {
    name: "Infinix Note 40 Pro", aliases: ["note 40", "infinix note"],
    price: "\u20A6320,000", stock: "In Stock",
    specs: { Display: "6.78\" AMOLED", Storage: "256GB", Camera: "108MP", Battery: "5000mAh" }
  },
  {
    name: "Redmi Note 13 Pro", aliases: ["redmi note 13", "redmi"],
    price: "\u20A6280,000", stock: "In Stock",
    specs: { Display: "6.67\" AMOLED", Storage: "256GB", Camera: "200MP", Battery: "5000mAh" }
  },
  {
    name: "Apple Watch Series 9", aliases: ["apple watch", "watch series 9"],
    price: "\u20A6380,000", stock: "In Stock",
    specs: { Display: "45mm OLED", Battery: "18hr", Sensors: "ECG, SpO2", "Water Resist": "50m" }
  },
  {
    name: "Itel Smartwatch 2", aliases: ["itel watch", "itel smartwatch"],
    price: "\u20A625,000", stock: "In Stock",
    specs: { Display: "1.8\" IPS", Battery: "7 days", Sensors: "Heart Rate", "Water Resist": "IP68" }
  },
  {
    name: "Meta Ray-Ban Smart Glasses", aliases: ["meta glasses", "smart glasses", "ray-ban"],
    price: "\u20A6310,000", stock: "Low Stock \u2014 only 4 left",
    specs: { Camera: "12MP", Battery: "4hr + charging case", Audio: "Open-ear speakers", Connectivity: "Bluetooth 5.0" }
  },
  {
    name: "AirPods Pro 2", aliases: ["airpods", "airpods pro"],
    price: "\u20A6220,000", stock: "In Stock",
    specs: { ANC: "Yes", Battery: "6hr (30hr with case)", Connector: "USB-C", Fit: "In-ear" }
  },
  {
    name: "Oraimo FreePods 4", aliases: ["oraimo freepods", "oraimo earbuds"],
    price: "\u20A628,000", stock: "In Stock",
    specs: { ANC: "Yes", Battery: "5hr (24hr with case)", Connector: "USB-C", Fit: "In-ear" }
  },
  {
    name: "Zealot S51 Pro", aliases: ["zealot", "zealot speaker", "zealot s51"],
    price: "\u20A632,000", stock: "In Stock",
    specs: { Output: "10W", Battery: "12hr", Connectivity: "Bluetooth 5.0", Waterproof: "IPX6" }
  }
];

// =========================================
// MATCHING LOGIC
// Finds every gadget mentioned by name/alias in the user's message
// =========================================
function findMentionedGadgets(message) {
  const lower = message.toLowerCase();
  return GADGET_KB.filter(gadget =>
    gadget.aliases.some(alias => lower.includes(alias))
  );
}

function formatSpecs(gadget) {
  return Object.entries(gadget.specs)
    .map(([key, value]) => `\u2022 ${key}: ${value}`)
    .join("\n");
}

function buildGadgetAnswer(gadget) {
  return `${gadget.name}\nPrice: ${gadget.price}\nStock: ${gadget.stock}\n\n${formatSpecs(gadget)}`;
}

// =========================================
// RESPONSE GENERATOR
// Simple rule-based logic: detect comparison requests,
// single-gadget lookups, or fall back to a helpful default.
// =========================================
function generateResponse(userMessage) {
  const matches = findMentionedGadgets(userMessage);
  const lower = userMessage.toLowerCase();
  const isComparison = lower.includes("compare") || lower.includes(" vs ") || lower.includes("versus");

  if (matches.length === 0) {
    return "I couldn't find that gadget in our catalog yet. Try asking about a specific product, like \"What's the price of the Camon 30 Pro?\" or \"Tell me about AirPods Pro.\"";
  }

  if (isComparison && matches.length >= 2) {
    return matches.map(buildGadgetAnswer).join("\n\n---\n\n");
  }

  // Single gadget - check if they asked about something specific (price, battery, camera, etc.)
  const gadget = matches[0];
  const specKeys = Object.keys(gadget.specs);
  const askedSpec = specKeys.find(key => lower.includes(key.toLowerCase()));

  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
    return `${gadget.name} is priced at ${gadget.price}. Current status: ${gadget.stock}.`;
  }

  if (lower.includes("stock") || lower.includes("available")) {
    return `${gadget.name} \u2014 ${gadget.stock}.`;
  }

  if (askedSpec) {
    return `${gadget.name} \u2014 ${askedSpec}: ${gadget.specs[askedSpec]}`;
  }

  // Default: give the full rundown
  return buildGadgetAnswer(gadget);
}

// =========================================
// CHAT UI WIRING
// =========================================
const aiOverlay = document.getElementById("ai-overlay");
const aiMessages = document.getElementById("ai-messages");
const aiForm = document.getElementById("ai-form");
const aiInput = document.getElementById("ai-input");
const openAiLink = document.getElementById("open-ai-assistant");
const closeAiBtn = document.getElementById("ai-close-btn");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `ai-msg ai-msg-${sender}`;
  msg.style.whiteSpace = "pre-line";
  msg.textContent = text;
  aiMessages.appendChild(msg);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

if (openAiLink) {
  openAiLink.addEventListener("click", (e) => {
    e.preventDefault();
    aiOverlay.hidden = false;
    aiInput.focus();
  });
}

if (closeAiBtn) {
  closeAiBtn.addEventListener("click", () => {
    aiOverlay.hidden = true;
  });
}

if (aiForm) {
  aiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = aiInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    aiInput.value = "";

    // Small delay makes the reply feel less instant/robotic
    setTimeout(() => {
      const reply = generateResponse(message);
      addMessage(reply, "bot");
    }, 400);
  });
}