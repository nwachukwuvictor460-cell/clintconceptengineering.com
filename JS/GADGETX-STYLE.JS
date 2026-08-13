/* ==========================================================================
   GadgetX — Product Data
   This is the single source of truth for all product info on the site.
   Search, shop filters, the nav mega-menu, and the AI chatbot all read
   from this array. In Phase 2 this would be replaced by real API calls.

   Fields:
   - category: one of phones, tablets, gaming, earbuds, glasses, watches, mp3, accessories
   - brand: the brand/sub-section this product belongs to (drives nav + filters)
   - subcategory: optional, used inside "gaming" to split Consoles vs Controllers
   ========================================================================== */

const PRODUCTS = [
  // ================= PHONES =================
  {
    id: "phn-iphone-01",
    name: "iPhone 15 Pro Max",
    brand: "iPhone",
    category: "phones",
    price: 1450000,
    oldPrice: 1580000,
    rating: 4.8,
    reviews: 214,
    stock: 9,
    images: ["https://images.unsplash.com/photo-1592286927505-1def25115481?w=600"],
    description: "Apple's flagship with a titanium frame, A17 Pro chip, and pro-grade camera system.",
    version: "2023 Model",
    specs: { Display: "6.7\" Super Retina XDR", Storage: "256GB / 512GB", Chip: "A17 Pro", Camera: "48MP Triple Camera", Battery: "4422mAh" },
    variants: { color: ["Natural Titanium", "Blue Titanium"], storage: ["256GB", "512GB"] }
  },
  {
    id: "phn-samsung-01",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "phones",
    price: 1250000,
    oldPrice: null,
    rating: 4.7,
    reviews: 189,
    stock: 12,
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600"],
    description: "Samsung's top-tier flagship with S Pen support and a 200MP main camera.",
    version: "2024 Model",
    specs: { Display: "6.8\" Dynamic AMOLED 2X, 120Hz", Storage: "256GB / 512GB", RAM: "12GB", Camera: "200MP Quad Camera", Battery: "5000mAh" },
    variants: { color: ["Titanium Black", "Titanium Grey"], storage: ["256GB", "512GB"] }
  },
  {
    id: "phn-pixel-01",
    name: "Google Pixel 9 Pro",
    brand: "Google Pixel",
    category: "phones",
    price: 980000,
    oldPrice: null,
    rating: 4.6,
    reviews: 87,
    stock: 10,
    images: ["https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=600"],
    description: "Google's flagship with the Tensor G4 chip and best-in-class computational photography.",
    version: "2024 Model",
    specs: { Display: "6.3\" LTPO OLED, 120Hz", Storage: "128GB / 256GB", Chip: "Tensor G4", Camera: "50MP Triple Camera", Battery: "4700mAh" },
    variants: { color: ["Obsidian", "Porcelain"], storage: ["128GB", "256GB"] }
  },
  {
    id: "phn-tecno-01",
    name: "Tecno Camon 30 Pro",
    brand: "Tecno",
    category: "phones",
    price: 320000,
    oldPrice: 360000,
    rating: 4.3,
    reviews: 96,
    stock: 25,
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"],
    description: "Feature-packed mid-range phone with a large AMOLED display and fast charging.",
    version: "2024 Model",
    specs: { Display: "6.78\" AMOLED, 120Hz", Storage: "256GB", RAM: "8GB", Camera: "50MP Dual Camera", Battery: "5000mAh" },
    variants: { color: ["Serene Blue", "Dark Green"], storage: ["256GB"] }
  },
  {
    id: "phn-infinix-01",
    name: "Infinix Note 40 Pro",
    brand: "Infinix",
    category: "phones",
    price: 265000,
    oldPrice: null,
    rating: 4.2,
    reviews: 71,
    stock: 30,
    images: ["https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600"],
    description: "Budget-friendly performance phone with a big battery and smooth 120Hz display.",
    version: "2024 Model",
    specs: { Display: "6.78\" AMOLED, 120Hz", Storage: "256GB", RAM: "8GB", Camera: "108MP Main Camera", Battery: "5000mAh" },
    variants: { color: ["Vintage Black", "Titan Gold"], storage: ["256GB"] }
  },
  {
    id: "phn-huawei-01",
    name: "Huawei P60 Pro",
    brand: "Huawei",
    category: "phones",
    price: 890000,
    oldPrice: null,
    rating: 4.5,
    reviews: 48,
    stock: 6,
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600"],
    description: "Premium photography-focused flagship with a variable aperture camera system.",
    version: "2023 Model",
    specs: { Display: "6.67\" LTPO OLED, 120Hz", Storage: "256GB", RAM: "8GB", Camera: "48MP Variable Aperture", Battery: "4815mAh" },
    variants: { color: ["Rococo Pearl", "Black"], storage: ["256GB"] }
  },
  {
    id: "phn-oppo-01",
    name: "Oppo Reno 11",
    brand: "Oppo",
    category: "phones",
    price: 410000,
    oldPrice: 450000,
    rating: 4.4,
    reviews: 62,
    stock: 18,
    images: ["https://images.unsplash.com/photo-1533228100845-08145b01de14?w=600"],
    description: "Stylish mid-range phone with portrait-focused cameras and fast charging.",
    version: "2024 Model",
    specs: { Display: "6.7\" AMOLED, 120Hz", Storage: "256GB", RAM: "8GB", Camera: "50MP Portrait Camera", Battery: "4600mAh" },
    variants: { color: ["Rock Grey", "Pearl Pink"], storage: ["256GB"] }
  },

  // ================= TABLETS =================
  {
    id: "tab-001",
    name: "Slate 11 Air",
    brand: "Slate",
    category: "tablets",
    price: 390000,
    oldPrice: 430000,
    rating: 4.5,
    reviews: 63,
    stock: 18,
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600"],
    description: "Lightweight 11-inch tablet ideal for study, sketching, and streaming.",
    version: "2025 Model",
    specs: { Display: "11\" LCD, 60Hz", Storage: "128GB", RAM: "6GB", Battery: "8000mAh", Stylus: "Supported (sold separately)" },
    variants: { color: ["Silver", "Space Grey"], storage: ["128GB", "256GB"] }
  },
  {
    id: "tab-002",
    name: "Slate Pro 13",
    brand: "Slate",
    category: "tablets",
    price: 690000,
    oldPrice: null,
    rating: 4.7,
    reviews: 34,
    stock: 9,
    images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600"],
    description: "Pro-tier tablet with a high refresh display, built for design and productivity.",
    version: "2026 Model",
    specs: { Display: "13\" Mini-LED, 120Hz", Storage: "256GB", RAM: "8GB", Battery: "9700mAh", Stylus: "Included" },
    variants: { color: ["Space Grey"], storage: ["256GB", "512GB"] }
  },

  // ================= GAMING / PS5 =================
  {
    id: "gam-001",
    name: "PlayStation 5 Console (Disc Edition)",
    brand: "PlayStation",
    category: "gaming",
    subcategory: "PS5 Consoles",
    price: 950000,
    oldPrice: null,
    rating: 4.9,
    reviews: 210,
    stock: 7,
    images: ["https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600"],
    description: "Next-gen gaming console with ultra-fast SSD and stunning 4K graphics.",
    version: "Standard Edition",
    specs: { Storage: "825GB SSD", Resolution: "Up to 4K / 120fps", Controller: "1x DualSense Wireless", Drive: "Ultra HD Blu-ray" },
    variants: {}
  },
  {
    id: "gam-002",
    name: "PlayStation 5 Console (Digital Edition)",
    brand: "PlayStation",
    category: "gaming",
    subcategory: "PS5 Consoles",
    price: 820000,
    oldPrice: 880000,
    rating: 4.8,
    reviews: 156,
    stock: 0,
    images: ["https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600"],
    description: "All-digital version of the PS5 — slimmer, quieter, disc-free.",
    version: "Digital Edition",
    specs: { Storage: "825GB SSD", Resolution: "Up to 4K / 120fps", Controller: "1x DualSense Wireless", Drive: "No disc drive" },
    variants: {}
  },
  {
    id: "gam-003",
    name: "DualSense Wireless Controller",
    brand: "PlayStation",
    category: "gaming",
    subcategory: "PS5 Controllers & Accessories",
    price: 55000,
    oldPrice: null,
    rating: 4.6,
    reviews: 98,
    stock: 40,
    images: ["https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?w=600"],
    description: "Official PS5 controller with adaptive triggers and haptic feedback.",
    version: "2023 Revision",
    specs: { Connectivity: "Bluetooth / USB-C", Battery: "12+ hours", Feedback: "Haptic + Adaptive Triggers" },
    variants: { color: ["White", "Midnight Black", "Cosmic Red"] }
  },
  {
    id: "gam-004",
    name: "PS5 Pulse 3D Headset",
    brand: "PlayStation",
    category: "gaming",
    subcategory: "PS5 Controllers & Accessories",
    price: 72000,
    oldPrice: null,
    rating: 4.4,
    reviews: 37,
    stock: 20,
    images: ["https://images.unsplash.com/photo-1599669454699-248893623440?w=600"],
    description: "Wireless 3D audio gaming headset built for the PS5.",
    version: "2021 Model",
    specs: { Connectivity: "2.4GHz Wireless", Battery: "12 hours", Audio: "3D Audio (Tempest Engine)" },
    variants: { color: ["White"] }
  },

  // ================= EARBUDS =================
  {
    id: "ear-001",
    name: "Pulse Buds Pro",
    brand: "Pulse",
    category: "earbuds",
    price: 68000,
    oldPrice: 85000,
    rating: 4.5,
    reviews: 302,
    stock: 55,
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600"],
    description: "Active noise-cancelling earbuds with rich bass and a 30-hour battery case.",
    version: "V2",
    specs: { Type: "In-ear, ANC", Battery: "8hrs (30hrs with case)", Connectivity: "Bluetooth 5.3", "Water Resistance": "IPX5" },
    variants: { color: ["White", "Black"] }
  },
  {
    id: "ear-002",
    name: "Pulse Buds Air",
    brand: "Pulse",
    category: "earbuds",
    price: 32000,
    oldPrice: null,
    rating: 4.2,
    reviews: 145,
    stock: 60,
    images: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600"],
    description: "Budget-friendly true wireless earbuds with clear calls and punchy sound.",
    version: "V1",
    specs: { Type: "In-ear", Battery: "6hrs (24hrs with case)", Connectivity: "Bluetooth 5.1", "Water Resistance": "IPX4" },
    variants: { color: ["White", "Navy", "Pink"] }
  },

  // ================= SMART GLASSES =================
  {
    id: "gls-001",
    name: "Horizon Smart Glasses",
    brand: "Horizon",
    category: "glasses",
    price: 175000,
    oldPrice: null,
    rating: 4.1,
    reviews: 29,
    stock: 12,
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"],
    description: "Audio smart glasses with built-in speakers, mic, and UV-protective lenses.",
    version: "2025 Model",
    specs: { Audio: "Open-ear speakers", Battery: "5hrs playback", Connectivity: "Bluetooth 5.2", Lenses: "UV400 Polarized" },
    variants: { color: ["Matte Black", "Tortoise"] }
  },

  // ================= SMART WATCHES (new) =================
  {
    id: "wch-apple-01",
    name: "Apple Watch Series 9",
    brand: "Apple Watch",
    category: "watches",
    price: 480000,
    oldPrice: null,
    rating: 4.8,
    reviews: 156,
    stock: 14,
    images: ["https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600"],
    description: "Apple's flagship smartwatch with an always-on Retina display and advanced health sensors.",
    version: "2023 Model",
    specs: { Display: "45mm Always-On Retina LTPO OLED", Battery: "18 hours", Health: "ECG, Blood Oxygen, Heart Rate", Connectivity: "GPS + Bluetooth" },
    variants: { color: ["Midnight", "Starlight", "Red"], size: ["41mm", "45mm"] }
  },
  {
    id: "wch-samsung-01",
    name: "Samsung Galaxy Watch 6",
    brand: "Samsung Galaxy Watch",
    category: "watches",
    price: 340000,
    oldPrice: 380000,
    rating: 4.6,
    reviews: 91,
    stock: 20,
    images: ["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600"],
    description: "Sleek Android smartwatch with detailed sleep coaching and fitness tracking.",
    version: "2023 Model",
    specs: { Display: "44mm Super AMOLED", Battery: "40 hours", Health: "Body Composition, Sleep Coaching", Connectivity: "Bluetooth / LTE option" },
    variants: { color: ["Graphite", "Silver"], size: ["40mm", "44mm"] }
  },
  {
    id: "wch-fit-01",
    name: "PulseFit Active Watch",
    brand: "Fitness Brands",
    category: "watches",
    price: 45000,
    oldPrice: null,
    rating: 4.0,
    reviews: 118,
    stock: 60,
    images: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600"],
    description: "Affordable fitness tracker watch with heart-rate monitoring and a 10-day battery.",
    version: "2024 Model",
    specs: { Display: "1.69\" Color LCD", Battery: "10 days", Health: "Heart Rate, Step Tracking, SpO2", "Water Resistance": "IP68" },
    variants: { color: ["Black", "Blue", "Pink"] }
  },

  // ================= MP3 PLAYERS =================
  {
    id: "mp3-001",
    name: "Echo Mini MP3 Player",
    brand: "Echo",
    category: "mp3",
    price: 28000,
    oldPrice: 35000,
    rating: 4.0,
    reviews: 54,
    stock: 30,
    images: ["https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=600"],
    description: "Compact MP3 player for distraction-free music on the go.",
    version: "2024 Model",
    specs: { Storage: "32GB (expandable)", Battery: "40hrs playback", Display: "1.8\" screen", Audio: "3.5mm jack + Bluetooth" },
    variants: { color: ["Black", "Red", "Blue"] }
  },

  // ================= PHONE ACCESSORIES =================
  {
    id: "acc-001",
    name: "FastCharge 65W GaN Charger",
    brand: "GadgetX Essentials",
    category: "accessories",
    price: 18000,
    oldPrice: null,
    rating: 4.7,
    reviews: 187,
    stock: 80,
    images: ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600"],
    description: "Compact GaN fast charger, safe for phones, tablets, and laptops.",
    version: "V3",
    specs: { Output: "65W USB-C PD", Ports: "1x USB-C, 1x USB-A", Safety: "Over-current & over-heat protection" },
    variants: { color: ["White", "Black"] }
  },
  {
    id: "acc-002",
    name: "Braided USB-C Cable (2m)",
    brand: "GadgetX Essentials",
    category: "accessories",
    price: 6500,
    oldPrice: null,
    rating: 4.4,
    reviews: 240,
    stock: 150,
    images: ["https://images.unsplash.com/photo-1601524909162-ae8725290836?w=600"],
    description: "Durable braided charging cable rated for 10,000+ bend cycles.",
    version: "V2",
    specs: { Length: "2 metres", Connector: "USB-C to USB-C", "Data Speed": "480Mbps" },
    variants: { color: ["Black", "Gold"] }
  },
  {
    id: "acc-003",
    name: "20,000mAh Power Bank",
    brand: "GadgetX Essentials",
    category: "accessories",
    price: 24000,
    oldPrice: 29000,
    rating: 4.5,
    reviews: 132,
    stock: 45,
    images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600"],
    description: "High-capacity power bank with dual fast-charge output for phones and tablets.",
    version: "V2",
    specs: { Capacity: "20,000mAh", Output: "22.5W Fast Charge", Ports: "2x USB-A, 1x USB-C" },
    variants: { color: ["Black", "White"] }
  },
  {
    id: "acc-004",
    name: "Clear Armor Phone Case",
    brand: "GadgetX Essentials",
    category: "accessories",
    price: 8500,
    oldPrice: null,
    rating: 4.3,
    reviews: 98,
    stock: 100,
    images: ["https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=600"],
    description: "Shockproof clear case with reinforced corners for drop protection.",
    version: "Universal Fit",
    specs: { Material: "TPU + Polycarbonate", Protection: "Military-grade drop tested", Compatibility: "Most phone models" },
    variants: { color: ["Clear"] }
  },
  {
    id: "acc-005",
    name: "Tempered Glass Screen Protector (2-pack)",
    brand: "GadgetX Essentials",
    category: "accessories",
    price: 4000,
    oldPrice: null,
    rating: 4.2,
    reviews: 210,
    stock: 200,
    images: ["https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600"],
    description: "9H hardness tempered glass with an easy bubble-free install kit.",
    version: "Universal Fit",
    specs: { Hardness: "9H", Pack: "2 units", Compatibility: "Most phone models" },
    variants: {}
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

function getProductsByBrand(category, brand) {
  return PRODUCTS.filter(p => p.category === category && p.brand === brand);
}

function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}