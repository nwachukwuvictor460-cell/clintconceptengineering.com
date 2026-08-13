/* ==========================================================================
   GadgetX — Product Data
   This is the single source of truth for all product info on the site.
   The search bar, product pages, and AI chatbot all read from this array.
   In Phase 2 this would be replaced by API calls to a real database.
   ========================================================================== */

const PRODUCTS = [
  // ---------------- PHONES ----------------
  {
    id: "phn-001",
    name: "Aurora X14 Pro",
    category: "phones",
    price: 780000,
    oldPrice: 850000,
    rating: 4.6,
    reviews: 128,
    stock: 14,
    images: ["https://images.unsplash.com/photo-1592286927505-1def25115481?w=600"],
    description: "Flagship smartphone with a 6.7\" AMOLED display and pro-grade triple camera system.",
    version: "2026 Model",
    specs: {
      Display: "6.7\" AMOLED, 120Hz",
      Storage: "256GB / 512GB",
      RAM: "8GB",
      Camera: "48MP Triple Camera",
      Battery: "5000mAh"
    },
    variants: { color: ["Midnight Black", "Champagne Gold"], storage: ["256GB", "512GB"] }
  },
  {
    id: "phn-002",
    name: "Nova S9",
    category: "phones",
    price: 420000,
    oldPrice: null,
    rating: 4.3,
    reviews: 76,
    stock: 22,
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"],
    description: "Mid-range smartphone built for everyday performance and all-day battery life.",
    version: "2025 Model",
    specs: {
      Display: "6.5\" IPS LCD, 90Hz",
      Storage: "128GB",
      RAM: "6GB",
      Camera: "32MP Dual Camera",
      Battery: "4500mAh"
    },
    variants: { color: ["Ocean Blue", "Graphite"], storage: ["128GB"] }
  },
  {
    id: "phn-003",
    name: "Zenith Fold 3",
    category: "phones",
    price: 1250000,
    oldPrice: null,
    rating: 4.8,
    reviews: 41,
    stock: 5,
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600"],
    description: "Foldable flagship with a full-size inner display for multitasking and media.",
    version: "2026 Model",
    specs: {
      Display: "7.6\" Foldable AMOLED",
      Storage: "512GB",
      RAM: "12GB",
      Camera: "50MP Triple Camera",
      Battery: "4800mAh"
    },
    variants: { color: ["Sapphire", "Cream"] }
  },

  // ---------------- TABLETS ----------------
  {
    id: "tab-001",
    name: "Slate 11 Air",
    category: "tablets",
    price: 390000,
    oldPrice: 430000,
    rating: 4.5,
    reviews: 63,
    stock: 18,
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600"],
    description: "Lightweight 11-inch tablet ideal for study, sketching, and streaming.",
    version: "2025 Model",
    specs: {
      Display: "11\" LCD, 60Hz",
      Storage: "128GB",
      RAM: "6GB",
      Battery: "8000mAh",
      Stylus: "Supported (sold separately)"
    },
    variants: { color: ["Silver", "Space Grey"], storage: ["128GB", "256GB"] }
  },
  {
    id: "tab-002",
    name: "Slate Pro 13",
    category: "tablets",
    price: 690000,
    oldPrice: null,
    rating: 4.7,
    reviews: 34,
    stock: 9,
    images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600"],
    description: "Pro-tier tablet with a high refresh display, built for design and productivity.",
    version: "2026 Model",
    specs: {
      Display: "13\" Mini-LED, 120Hz",
      Storage: "256GB",
      RAM: "8GB",
      Battery: "9700mAh",
      Stylus: "Included"
    },
    variants: { color: ["Space Grey"], storage: ["256GB", "512GB"] }
  },

  // ---------------- GAMING (PS5) ----------------
  {
    id: "gam-001",
    name: "PlayStation 5 Console (Disc Edition)",
    category: "gaming",
    price: 950000,
    oldPrice: null,
    rating: 4.9,
    reviews: 210,
    stock: 7,
    images: ["https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600"],
    description: "Next-gen gaming console with ultra-fast SSD and stunning 4K graphics.",
    version: "Standard Edition",
    specs: {
      Storage: "825GB SSD",
      Resolution: "Up to 4K / 120fps",
      Controller: "1x DualSense Wireless",
      Drive: "Ultra HD Blu-ray"
    },
    variants: {}
  },
  {
    id: "gam-002",
    name: "PlayStation 5 Console (Digital Edition)",
    category: "gaming",
    price: 820000,
    oldPrice: 880000,
    rating: 4.8,
    reviews: 156,
    stock: 0,
    images: ["https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600"],
    description: "All-digital version of the PS5 — slimmer, quieter, disc-free.",
    version: "Digital Edition",
    specs: {
      Storage: "825GB SSD",
      Resolution: "Up to 4K / 120fps",
      Controller: "1x DualSense Wireless",
      Drive: "No disc drive"
    },
    variants: {}
  },
  {
    id: "gam-003",
    name: "DualSense Wireless Controller",
    category: "gaming",
    price: 55000,
    oldPrice: null,
    rating: 4.6,
    reviews: 98,
    stock: 40,
    images: ["https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?w=600"],
    description: "Official PS5 controller with adaptive triggers and haptic feedback.",
    version: "2023 Revision",
    specs: {
      Connectivity: "Bluetooth / USB-C",
      Battery: "12+ hours",
      Feedback: "Haptic + Adaptive Triggers"
    },
    variants: { color: ["White", "Midnight Black", "Cosmic Red"] }
  },

  {
    id: "phn-001",
    name: "Aurora X14 Pro",
    category: "phones",
    price: 780000,
    oldPrice: 850000,
    rating: 4.6,
    reviews: 128,
    stock: 14,
    images: ["https://images.unsplash.com/photo-1592286927505-1def25115481?w=600"],
    description: "Flagship smartphone with a 6.7\" AMOLED display and pro-grade triple camera system.",
    version: "2026 Model",
    specs: {
      Display: "6.7\" AMOLED, 120Hz",
      Storage: "256GB / 512GB",
      RAM: "8GB",
      Camera: "48MP Triple Camera",
      Battery: "5000mAh"
    },
    variants: { color: ["Midnight Black", "Champagne Gold"], storage: ["256GB", "512GB"] }
  },
  {
    id: "phn-002",
    name: "Nova S9",
    category: "phones",
    price: 420000,
    oldPrice: null,
    rating: 4.3,
    reviews: 76,
    stock: 22,
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"],
    description: "Mid-range smartphone built for everyday performance and all-day battery life.",
    version: "2025 Model",
    specs: {
      Display: "6.5\" IPS LCD, 90Hz",
      Storage: "128GB",
      RAM: "6GB",
      Camera: "32MP Dual Camera",
      Battery: "4500mAh"
    },
    variants: { color: ["Ocean Blue", "Graphite"], storage: ["128GB"] }
  },
  {
    id: "phn-003",
    name: "Zenith Fold 3",
    category: "phones",
    price: 1250000,
    oldPrice: null,
    rating: 4.8,
    reviews: 41,
    stock: 5,
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600"],
    description: "Foldable flagship with a full-size inner display for multitasking and media.",
    version: "2026 Model",
    specs: {
      Display: "7.6\" Foldable AMOLED",
      Storage: "512GB",
      RAM: "12GB",
      Camera: "50MP Triple Camera",
      Battery: "4800mAh"
    },
    variants: { color: ["Sapphire", "Cream"] }
  },

  // ---------------- TABLETS ----------------
  {
    id: "tab-001",
    name: "Slate 11 Air",
    category: "tablets",
    price: 390000,
    oldPrice: 430000,
    rating: 4.5,
    reviews: 63,
    stock: 18,
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600"],
    description: "Lightweight 11-inch tablet ideal for study, sketching, and streaming.",
    version: "2025 Model",
    specs: {
      Display: "11\" LCD, 60Hz",
      Storage: "128GB",
      RAM: "6GB",
      Battery: "8000mAh",
      Stylus: "Supported (sold separately)"
    },
    variants: { color: ["Silver", "Space Grey"], storage: ["128GB", "256GB"] }
  },
  {
    id: "tab-002",
    name: "Slate Pro 13",
    category: "tablets",
    price: 690000,
    oldPrice: null,
    rating: 4.7,
    reviews: 34,
    stock: 9,
    images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600"],
    description: "Pro-tier tablet with a high refresh display, built for design and productivity.",
    version: "2026 Model",
    specs: {
      Display: "13\" Mini-LED, 120Hz",
      Storage: "256GB",
      RAM: "8GB",
      Battery: "9700mAh",
      Stylus: "Included"
    },
    variants: { color: ["Space Grey"], storage: ["256GB", "512GB"] }
  },

  // ---------------- GAMING (PS5) ----------------
  {
    id: "gam-001",
    name: "PlayStation 5 Console (Disc Edition)",
    category: "gaming",
    price: 950000,
    oldPrice: null,
    rating: 4.9,
    reviews: 210,
    stock: 7,
    images: ["https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600"],
    description: "Next-gen gaming console with ultra-fast SSD and stunning 4K graphics.",
    version: "Standard Edition",
    specs: {
      Storage: "825GB SSD",
      Resolution: "Up to 4K / 120fps",
      Controller: "1x DualSense Wireless",
      Drive: "Ultra HD Blu-ray"
    },
    variants: {}
  },
  {
    id: "gam-002",
    name: "PlayStation 5 Console (Digital Edition)",
    category: "gaming",
    price: 820000,
    oldPrice: 880000,
    rating: 4.8,
    reviews: 156,
    stock: 0,
    images: ["https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600"],
    description: "All-digital version of the PS5 — slimmer, quieter, disc-free.",
    version: "Digital Edition",
    specs: {
      Storage: "825GB SSD",
      Resolution: "Up to 4K / 120fps",
      Controller: "1x DualSense Wireless",
      Drive: "No disc drive"
    },
    variants: {}
  },
  {
    id: "gam-003",
    name: "DualSense Wireless Controller",
    category: "gaming",
    price: 55000,
    oldPrice: null,
    rating: 4.6,
    reviews: 98,
    stock: 40,
    images: ["https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?w=600"],
    description: "Official PS5 controller with adaptive triggers and haptic feedback.",
    version: "2023 Revision",
    specs: {
      Connectivity: "Bluetooth / USB-C",
      Battery: "12+ hours",
      Feedback: "Haptic + Adaptive Triggers"
    },
    variants: { color: ["White", "Midnight Black", "Cosmic Red"] }
  },

  // ---------------- EARBUDS ----------------
  {
    id: "ear-001",
    name: "Pulse Buds Pro",
    category: "earbuds",
    price: 68000,
    oldPrice: 85000,
    rating: 4.5,
    reviews: 302,
    stock: 55,
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600"],
    description: "Active noise-cancelling earbuds with rich bass and a 30-hour battery case.",
    version: "V2",
    specs: {
      Type: "In-ear, ANC",
      Battery: "8hrs (30hrs with case)",
      Connectivity: "Bluetooth 5.3",
      "Water Resistance": "IPX5"
    },
    variants: { color: ["White", "Black"] }
  },
  {
    id: "ear-002",
    name: "Pulse Buds Air",
    category: "earbuds",
    price: 32000,
    oldPrice: null,
    rating: 4.2,
    reviews: 145,
    stock: 60,
    images: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600"],
    description: "Budget-friendly true wireless earbuds with clear calls and punchy sound.",
    version: "V1",
    specs: {
      Type: "In-ear",
      Battery: "6hrs (24hrs with case)",
      Connectivity: "Bluetooth 5.1",
      "Water Resistance": "IPX4"
    },
    variants: { color: ["White", "Navy", "Pink"] }
  },

  // ---------------- SMART GLASSES ----------------
  {
    id: "gls-001",
    name: "Horizon Smart Glasses",
    category: "glasses",
    price: 175000,
    oldPrice: null,
    rating: 4.1,
    reviews: 29,
    stock: 12,
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"],
    description: "Audio smart glasses with built-in speakers, mic, and UV-protective lenses.",
    version: "2025 Model",
    specs: {
      Audio: "Open-ear speakers",
      Battery: "5hrs playback",
      Connectivity: "Bluetooth 5.2",
      Lenses: "UV400 Polarized"
    },
    variants: { color: ["Matte Black", "Tortoise"] }
  },

  // ---------------- MP3 PLAYERS ----------------
  {
    id: "mp3-001",
    name: "Echo Mini MP3 Player",
    category: "mp3",
    price: 28000,
    oldPrice: 35000,
    rating: 4.0,
    reviews: 54,
    stock: 30,
    images: ["https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=600"],
    description: "Compact MP3 player for distraction-free music on the go.",
    version: "2024 Model",
    specs: {
      Storage: "32GB (expandable)",
      Battery: "40hrs playback",
      Display: "1.8\" screen",
      Audio: "3.5mm jack + Bluetooth"
    },
    variants: { color: ["Black", "Red", "Blue"] }
  },

  // ---------------- CHARGERS & ACCESSORIES ----------------
  {
    id: "chg-001",
    name: "FastCharge 65W GaN Charger",
    category: "chargers",
    price: 18000,
    oldPrice: null,
    rating: 4.7,
    reviews: 187,
    stock: 80,
    images: ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600"],
    description: "Compact GaN fast charger, safe for phones, tablets, and laptops.",
    version: "V3",
    specs: {
      Output: "65W USB-C PD",
      Ports: "1x USB-C, 1x USB-A",
      Safety: "Over-current & over-heat protection"
    },
    variants: { color: ["White", "Black"] }
  },
  {
    id: "chg-002",
    name: "Braided USB-C Cable (2m)",
    category: "chargers",
    price: 6500,
    oldPrice: null,
    rating: 4.4,
    reviews: 240,
    stock: 150,
    images: ["https://images.unsplash.com/photo-1601524909162-ae8725290836?w=600"],
    description: "Durable braided charging cable rated for 10,000+ bend cycles.",
    version: "V2",
    specs: {
      Length: "2 metres",
      Connector: "USB-C to USB-C",
      "Data Speed": "480Mbps"
    },
    variants: { color: ["Black", "Gold"] }
  }
];

/* ---------------- Helper functions used across the site ---------------- */

function formatNaira(amount) {
  return "₦" + Number(amount).toLocaleString("en-NG");
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

const CATEGORIES = [
  { id: "phones", name: "Phones", icon: "fa-mobile-screen" },
  { id: "tablets", name: "Tablets", icon: "fa-tablet-screen-button" },
  { id: "gaming", name: "Gaming / PS5", icon: "fa-gamepad" },
  { id: "earbuds", name: "Earbuds", icon: "fa-headphones" },
  { id: "glasses", name: "Smart Glasses", icon: "fa-glasses" },
  { id: "mp3", name: "MP3 Players", icon: "fa-music" },
  { id: "chargers", name: "Chargers & Accessories", icon: "fa-plug" },
];

const SEED_REVIEWS = {};

function loadProducts() {
  return PRODUCTS.slice();
}

function saveProducts(list) {
  try {
    localStorage.setItem("gx_products_override", JSON.stringify(list));
  } catch (err) {
    console.warn("Could not save products:", err);
  }
}

function getProduct(id) {
  return getProductById(id);
}

window.GX_PRODUCTS = {
  loadProducts,
  saveProducts,
  getProduct,
  getProductsByCategory,
  formatNaira,
  CATEGORIES,
  SEED_REVIEWS,
};