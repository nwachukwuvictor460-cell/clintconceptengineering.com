/* ==========================================================================
   GadgetX product catalog (seed data).
   Kept as a plain array so both the storefront and admin can read/mutate it.
   In Phase 1 the admin persists product edits to localStorage under
   `gx_products_override`. If that key exists, we use it; otherwise the seed.
   ========================================================================== */

const SEED_PRODUCTS = [
  // ---------- Phones ----------
  {
    id: "phn-001", category: "phones", name: "iPhone 15 Pro Max",
    price: 1650000, oldPrice: 1850000, rating: 4.9, reviews: 128, stock: 12,
    icon: "fa-mobile-screen", brand: "Apple", version: "A2849 (2023)",
    images: ["fa-mobile-screen", "fa-camera", "fa-battery-full", "fa-microchip"],
    variants: { color: ["Natural Titanium", "Blue Titanium", "Black Titanium"], storage: ["256GB", "512GB", "1TB"] },
    description: "The most advanced iPhone ever, with titanium design, A17 Pro chip, and a pro camera system.",
    specs: { Display: "6.7\" Super Retina XDR OLED", Chip: "A17 Pro", Camera: "48MP main + 12MP ultra-wide + 12MP tele (5x)", Battery: "4,422 mAh", OS: "iOS 17" },
  },
  {
    id: "phn-002", category: "phones", name: "Samsung Galaxy S24 Ultra",
    price: 1450000, oldPrice: 1600000, rating: 4.8, reviews: 96, stock: 8,
    icon: "fa-mobile-screen", brand: "Samsung", version: "SM-S928 (2024)",
    images: ["fa-mobile-screen", "fa-pen", "fa-camera", "fa-microchip"],
    variants: { color: ["Titanium Grey", "Titanium Black", "Titanium Violet"], storage: ["256GB", "512GB", "1TB"] },
    description: "Galaxy AI is here. Titanium-built, S-Pen included, 200MP camera.",
    specs: { Display: "6.8\" Dynamic AMOLED 2X", Chip: "Snapdragon 8 Gen 3", Camera: "200MP main + 12MP + 50MP + 10MP", Battery: "5,000 mAh", OS: "Android 14 (One UI 6.1)" },
  },
  {
    id: "phn-003", category: "phones", name: "Google Pixel 8 Pro",
    price: 950000, rating: 4.7, reviews: 54, stock: 15,
    icon: "fa-mobile-screen", brand: "Google", version: "GC3VE (2023)",
    images: ["fa-mobile-screen", "fa-camera", "fa-microchip"],
    variants: { color: ["Obsidian", "Porcelain", "Bay"], storage: ["128GB", "256GB", "512GB"] },
    description: "Google's smartest phone yet with the Tensor G3 chip and best-in-class computational photography.",
    specs: { Display: "6.7\" LTPO OLED", Chip: "Google Tensor G3", Camera: "50MP main + 48MP ultra + 48MP tele", Battery: "5,050 mAh", OS: "Android 14" },
  },
  {
    id: "phn-004", category: "phones", name: "Tecno Phantom V Fold",
    price: 780000, oldPrice: 900000, rating: 4.5, reviews: 32, stock: 6,
    icon: "fa-mobile-screen", brand: "Tecno", version: "AD11 (2023)",
    images: ["fa-mobile-screen", "fa-camera"],
    variants: { color: ["Rippling Black"], storage: ["256GB", "512GB"] },
    description: "Tecno's flagship foldable — a wide inner display and dual outer screens.",
    specs: { Display: "7.85\" LTPO AMOLED (inner)", Chip: "MediaTek Dimensity 9000+", Camera: "50MP main + 50MP tele + 13MP ultra", Battery: "5,000 mAh", OS: "Android 13 (HiOS 13)" },
  },

  // ---------- Tablets ----------
  {
    id: "tab-001", category: "tablets", name: "iPad Pro 12.9\" M2",
    price: 1350000, rating: 4.9, reviews: 88, stock: 10,
    icon: "fa-tablet-screen-button", brand: "Apple", version: "A2436 (2022)",
    images: ["fa-tablet-screen-button", "fa-microchip", "fa-pen"],
    variants: { color: ["Space Gray", "Silver"], storage: ["128GB", "256GB", "512GB", "1TB"] },
    description: "Supercharged by the Apple M2 chip. Liquid Retina XDR display.",
    specs: { Display: "12.9\" Liquid Retina XDR", Chip: "Apple M2", Camera: "12MP + 10MP ultra-wide", Battery: "10,758 mAh", OS: "iPadOS 17" },
  },
  {
    id: "tab-002", category: "tablets", name: "Samsung Galaxy Tab S9+",
    price: 950000, oldPrice: 1050000, rating: 4.7, reviews: 45, stock: 9,
    icon: "fa-tablet-screen-button", brand: "Samsung", version: "SM-X816 (2023)",
    images: ["fa-tablet-screen-button", "fa-pen"],
    variants: { color: ["Graphite", "Beige"], storage: ["256GB", "512GB"] },
    description: "12.4\" Super AMOLED with S-Pen included, IP68 rated.",
    specs: { Display: "12.4\" Super AMOLED", Chip: "Snapdragon 8 Gen 2", Camera: "13MP + 8MP", Battery: "10,090 mAh", OS: "Android 13" },
  },
  {
    id: "tab-003", category: "tablets", name: "Lenovo Tab P12",
    price: 380000, rating: 4.4, reviews: 22, stock: 20,
    icon: "fa-tablet-screen-button", brand: "Lenovo", version: "TB-370 (2023)",
    images: ["fa-tablet-screen-button"],
    variants: { color: ["Storm Grey"], storage: ["128GB", "256GB"] },
    description: "Big 12.7\" 3K screen — great for reading, streaming and split-screen productivity.",
    specs: { Display: "12.7\" IPS LCD 3K", Chip: "MediaTek Dimensity 7050", Camera: "13MP", Battery: "10,200 mAh", OS: "Android 13" },
  },

  // ---------- Gaming (PS5) ----------
  {
    id: "ps5-001", category: "gaming", name: "Sony PlayStation 5 Slim (Disc)",
    price: 850000, oldPrice: 920000, rating: 4.9, reviews: 210, stock: 14,
    icon: "fa-gamepad", brand: "Sony", version: "CFI-2000 A01 (2023)",
    images: ["fa-gamepad", "fa-compact-disc", "fa-microchip"],
    variants: { edition: ["Disc Edition", "Digital Edition"] },
    description: "The slim redesign of the PS5, with a 1TB SSD and detachable disc drive.",
    specs: { CPU: "Custom AMD Zen 2, 8 cores @ 3.5GHz", GPU: "Custom AMD RDNA 2, 10.28 TFLOPs", RAM: "16GB GDDR6", Storage: "1TB SSD", Output: "Up to 4K 120Hz / 8K" },
  },
  {
    id: "ps5-002", category: "gaming", name: "DualSense Wireless Controller",
    price: 95000, rating: 4.8, reviews: 156, stock: 30,
    icon: "fa-gamepad", brand: "Sony", version: "CFI-ZCT1",
    images: ["fa-gamepad"],
    variants: { color: ["White", "Midnight Black", "Cosmic Red", "Starlight Blue"] },
    description: "Haptic feedback and adaptive triggers bring games to life.",
    specs: { Connectivity: "Bluetooth 5.1, USB-C", Battery: "1,560 mAh (Li-ion)", Features: "Haptic feedback, adaptive triggers, built-in mic" },
  },
  {
    id: "ps5-003", category: "gaming", name: "PULSE 3D Wireless Headset",
    price: 145000, oldPrice: 165000, rating: 4.6, reviews: 78, stock: 18,
    icon: "fa-headphones", brand: "Sony", version: "CFI-ZWH1",
    images: ["fa-headphones"],
    variants: { color: ["White", "Midnight Black"] },
    description: "Tempest 3D AudioTech tuned for PS5. 12-hour battery.",
    specs: { Connectivity: "Wireless (USB dongle) + 3.5mm", Battery: "12 hours", Drivers: "40mm" },
  },
  {
    id: "ps5-004", category: "gaming", name: "PS5 Charging Station",
    price: 42000, rating: 4.5, reviews: 65, stock: 25,
    icon: "fa-plug", brand: "Sony", version: "CFI-ZDS1",
    images: ["fa-plug", "fa-gamepad"],
    variants: {},
    description: "Charge two DualSense controllers simultaneously without turning on the console.",
    specs: { Compatibility: "DualSense controllers only", Charge: "~3 hours full charge" },
  },

  // ---------- Earbuds ----------
  {
    id: "eb-001", category: "earbuds", name: "Apple AirPods Pro (2nd Gen)",
    price: 240000, oldPrice: 275000, rating: 4.8, reviews: 189, stock: 22,
    icon: "fa-headphones-simple", brand: "Apple", version: "MTJV3 USB-C (2023)",
    images: ["fa-headphones-simple", "fa-volume-high"],
    variants: { color: ["White"] },
    description: "Active Noise Cancellation, Adaptive Audio, and USB-C charging case.",
    specs: { Chip: "H2", ANC: "Yes (Adaptive)", Battery: "6h (30h with case)", Case: "MagSafe / USB-C" },
  },
  {
    id: "eb-002", category: "earbuds", name: "Samsung Galaxy Buds3 Pro",
    price: 195000, rating: 4.6, reviews: 74, stock: 18,
    icon: "fa-headphones-simple", brand: "Samsung", version: "SM-R630 (2024)",
    images: ["fa-headphones-simple"],
    variants: { color: ["White", "Silver"] },
    description: "24-bit Hi-Fi sound with real-time interpretation via Galaxy AI.",
    specs: { ANC: "Yes", Battery: "6h (26h with case)", Water: "IP57" },
  },
  {
    id: "eb-003", category: "earbuds", name: "Sony WF-1000XM5",
    price: 220000, oldPrice: 260000, rating: 4.8, reviews: 132, stock: 12,
    icon: "fa-headphones-simple", brand: "Sony", version: "WF-1000XM5 (2023)",
    images: ["fa-headphones-simple"],
    variants: { color: ["Black", "Silver"] },
    description: "Industry-leading noise cancellation and best-in-class sound.",
    specs: { ANC: "Yes (Dual processors)", Battery: "8h (24h with case)", Codec: "LDAC, AAC, SBC" },
  },
  {
    id: "eb-004", category: "earbuds", name: "Oraimo FreePods 4",
    price: 28000, rating: 4.3, reviews: 210, stock: 60,
    icon: "fa-headphones-simple", brand: "Oraimo", version: "OEB-E102D (2023)",
    images: ["fa-headphones-simple"],
    variants: { color: ["Black", "White"] },
    description: "Affordable ANC earbuds, popular pick in Nigeria.",
    specs: { ANC: "Yes (up to 32dB)", Battery: "6h (24h with case)", Bluetooth: "5.3" },
  },

  // ---------- Smart Glasses ----------
  {
    id: "sg-001", category: "smart-glasses", name: "Ray-Ban Meta Wayfarer",
    price: 380000, rating: 4.5, reviews: 62, stock: 8,
    icon: "fa-glasses", brand: "Ray-Ban", version: "Gen 2 (2023)",
    images: ["fa-glasses", "fa-camera"],
    variants: { color: ["Shiny Black", "Matte Black", "Caramel"] },
    description: "Capture, listen, livestream and call — all from your glasses.",
    specs: { Camera: "12MP ultra-wide", Audio: "Open-ear speakers", Assistant: "Meta AI", Battery: "~4h use" },
  },
  {
    id: "sg-002", category: "smart-glasses", name: "Xreal Air 2 Pro",
    price: 340000, oldPrice: 390000, rating: 4.6, reviews: 44, stock: 10,
    icon: "fa-glasses", brand: "Xreal", version: "NR-7100RGL (2023)",
    images: ["fa-glasses"],
    variants: { color: ["Titanium Grey"] },
    description: "AR glasses that project a 330\" virtual screen. Perfect for gaming and movies.",
    specs: { Display: "1080p Sony Micro-OLED per eye", FOV: "46°", Weight: "75g", Connector: "USB-C DisplayPort" },
  },
  {
    id: "sg-003", category: "smart-glasses", name: "Huawei Eyewear 2",
    price: 195000, rating: 4.3, reviews: 28, stock: 12,
    icon: "fa-glasses", brand: "Huawei", version: "Eyewear 2 (2023)",
    images: ["fa-glasses"],
    variants: { color: ["Black", "Titanium"] },
    description: "Stylish audio glasses with directional open-ear speakers.",
    specs: { Audio: "Open-ear speakers", Battery: "11h music", Water: "IP54" },
  },

  // ---------- MP3 Players ----------
  {
    id: "mp3-001", category: "mp3", name: "Sony NW-A306 Walkman",
    price: 285000, rating: 4.7, reviews: 34, stock: 7,
    icon: "fa-music", brand: "Sony", version: "NW-A306 (2023)",
    images: ["fa-music"],
    variants: { color: ["Black", "Blue"] },
    description: "Android-powered Walkman with high-resolution audio.",
    specs: { Storage: "32GB + microSD", Battery: "36h music", Screen: "3.6\" touchscreen", OS: "Android 12" },
  },
  {
    id: "mp3-002", category: "mp3", name: "FiiO M11S Hi-Res Player",
    price: 320000, oldPrice: 360000, rating: 4.8, reviews: 22, stock: 5,
    icon: "fa-music", brand: "FiiO", version: "M11S (2022)",
    images: ["fa-music"],
    variants: { color: ["Black"] },
    description: "Dual ES9038Q2M DAC, Android 10, streaming-ready.",
    specs: { DAC: "Dual ES9038Q2M", Screen: "5\"", Battery: "14h", OS: "Android 10" },
  },
  {
    id: "mp3-003", category: "mp3", name: "SanDisk Clip Sport Plus",
    price: 42000, rating: 4.4, reviews: 88, stock: 30,
    icon: "fa-music", brand: "SanDisk", version: "SDMX28 (2022)",
    images: ["fa-music"],
    variants: { color: ["Black", "Red", "Blue"] },
    description: "Rugged clip-on player perfect for the gym and running.",
    specs: { Storage: "32GB (+ microSD)", Battery: "20h", Bluetooth: "Yes", Water: "IPX5" },
  },

  // ---------- Chargers & Accessories ----------
  {
    id: "chg-001", category: "chargers", name: "Anker 65W GaN Charger",
    price: 45000, oldPrice: 55000, rating: 4.8, reviews: 210, stock: 40,
    icon: "fa-plug", brand: "Anker", version: "A2668 Nano II (2023)",
    images: ["fa-plug"],
    variants: { color: ["White", "Black"] },
    description: "Compact 65W GaN charger — powers phones, tablets and most laptops.",
    specs: { Output: "65W PD (USB-C)", Ports: "1x USB-C", Weight: "112g" },
  },
  {
    id: "chg-002", category: "chargers", name: "USB-C to Lightning Cable (2m)",
    price: 15000, rating: 4.6, reviews: 145, stock: 80,
    icon: "fa-plug", brand: "Anker", version: "A8663 PowerLine III (2022)",
    images: ["fa-plug"],
    variants: { color: ["White", "Black"], length: ["1m", "2m"] },
    description: "MFi-certified braided cable rated for 25,000 bends.",
    specs: { Length: "2m", Connector: "USB-C ↔ Lightning", Certified: "Apple MFi" },
  },
  {
    id: "chg-003", category: "chargers", name: "Baseus 20000mAh Power Bank",
    price: 55000, oldPrice: 65000, rating: 4.7, reviews: 90, stock: 24,
    icon: "fa-battery-full", brand: "Baseus", version: "PPBD050 (2023)",
    images: ["fa-battery-full"],
    variants: { color: ["Black"] },
    description: "22.5W fast charging, digital display, dual USB-C.",
    specs: { Capacity: "20,000 mAh", Output: "22.5W", Ports: "2x USB-C, 1x USB-A" },
  },
  {
    id: "chg-004", category: "chargers", name: "Wireless MagSafe Charging Pad",
    price: 38000, rating: 4.5, reviews: 56, stock: 30,
    icon: "fa-plug", brand: "Anker", version: "A2565 MagGo (2023)",
    images: ["fa-plug"],
    variants: { color: ["White"] },
    description: "15W MagSafe-compatible pad for iPhone 12 and newer.",
    specs: { Output: "15W (MagSafe)", Compatibility: "iPhone 12+ / Qi devices" },
  },
];

const CATEGORIES = [
  { id: "phones", name: "Phones", icon: "fa-mobile-screen" },
  { id: "tablets", name: "Tablets", icon: "fa-tablet-screen-button" },
  { id: "gaming", name: "Gaming / PS5", icon: "fa-gamepad" },
  { id: "earbuds", name: "Earbuds", icon: "fa-headphones-simple" },
  { id: "smart-glasses", name: "Smart Glasses", icon: "fa-glasses" },
  { id: "mp3", name: "MP3 Players", icon: "fa-music" },
  { id: "chargers", name: "Chargers & Accessories", icon: "fa-plug" },
];

// Seed reviews so PDP shows social proof from day 1.
const SEED_REVIEWS = {
  "phn-001": [
    { author: "Chinedu O.", rating: 5, date: "2026-06-12", text: "Fastest phone I've ever owned. Battery lasts a full day of heavy use." },
    { author: "Aisha B.", rating: 5, date: "2026-05-28", text: "Camera is unreal, and titanium feels premium." },
    { author: "Tunde A.", rating: 4, date: "2026-05-10", text: "Great phone but the price stings. Delivery from GadgetX was fast though." },
  ],
  "ps5-001": [
    { author: "Emeka N.", rating: 5, date: "2026-07-01", text: "Console arrived sealed with a 1-year warranty card. Legit seller." },
    { author: "Fola I.", rating: 5, date: "2026-06-15", text: "Slim design fits my TV stand perfectly. Games load instantly." },
  ],
  "eb-001": [
    { author: "Bola A.", rating: 5, date: "2026-06-20", text: "ANC on these is a game changer for the Lagos traffic." },
  ],
};

// Load products from override (admin edits) if present, else seed.
function loadProducts() {
  try {
    const override = JSON.parse(localStorage.getItem("gx_products_override"));
    if (Array.isArray(override) && override.length) return override;
  } catch (_) { /* ignore */ }
  return SEED_PRODUCTS.slice();
}
function saveProducts(list) { localStorage.setItem("gx_products_override", JSON.stringify(list)); }

function getProduct(id) { return loadProducts().find((p) => p.id === id); }
function formatNaira(n) { return "₦" + Number(n).toLocaleString("en-NG"); }

window.GX_PRODUCTS = { loadProducts, saveProducts, getProduct, formatNaira, CATEGORIES, SEED_REVIEWS };
