/**
 * SIXTEEN MART — Master Products Catalog Dataset
 * Single source of truth for all products across the website.
 * Permanent IDs assigned per Section 3 specifications.
 */
const PRODUCTS = [
  {
    id: "16M-HG-001",
    name: "Electric Handheld Milk Frother",
    categoryId: "home-gadgets",
    price: 1490,
    image: "images/milk-frother-1.jpg",
    gallery: ["images/milk-frother-1.jpg"],
    shortDescription: "Quickly create rich, velvety micro-foam for gourmet coffee, lattes, cappuccinos, matcha, and milkshakes in seconds.",
    description: "Upgrade your morning coffee routine into a café experience. This powerful handheld milk frother whips up rich, creamy micro-foam in just 15 to 20 seconds. Built with a food-grade stainless steel whisk and ergonomic comfort handle for effortless daily use.",
    badge: "Trending",
    maxQty: 5
  },
  {
    id: "16M-HG-002",
    name: "Mini Portable Pocket Thermal Printer",
    categoryId: "home-gadgets",
    price: 3490,
    image: "images/thermal-printer-1.jpg",
    gallery: ["images/thermal-printer-1.jpg"],
    shortDescription: "Inkless, compact wireless pocket printer for instant study notes, shipping labels, journal photos, checklists, and fun stickers.",
    description: "Say goodbye to messy ink cartridges! This pocket-sized Bluetooth thermal printer connects wirelessly to your iOS or Android smartphone to print clear black-and-white memos, to-do lists, study flashcards, and photo keepsakes on the fly.",
    badge: "Customer Favorite",
    maxQty: 5
  },
  {
    id: "16M-HG-003",
    name: "Portable Rechargeable Juice Blender",
    categoryId: "home-gadgets",
    price: 3490,
    image: "images/juice-blender-1.jpg",
    gallery: ["images/juice-blender-1.jpg"],
    shortDescription: "USB rechargeable personal smoothie blender with high-torque stainless blades for fresh juices, protein shakes, and smoothies anywhere.",
    description: "Blend and drink directly from the bottle wherever your day takes you. Featuring 6 ultra-sharp stainless steel blades and a USB-rechargeable battery, this personal blender effortlessly whips up fresh fruit smoothies, protein shakes, and baby purées.",
    badge: "Hot Pick",
    maxQty: 5
  },
  {
    id: "16M-HG-004",
    name: "Ultrasonic Aroma Diffuser & Humidifier",
    categoryId: "home-gadgets",
    price: 2850,
    image: "images/aroma-diffuser-1.jpg",
    gallery: ["images/aroma-diffuser-1.jpg"],
    shortDescription: "Whisper-quiet ultrasonic mist diffuser and cool-mist humidifier with multi-color ambient LED mood lighting for home, office, and bedroom.",
    description: "Create a calming sanctuary in your home or workspace with our Ultrasonic Aroma Diffuser. Utilizing advanced ultrasonic atomization, it quietly disperses aromatic essential oils and moisturizing mist to soothe sinuses, relieve daily stress, and eliminate dry indoor air.",
    badge: "New Arrival",
    maxQty: 5
  },
  {
    id: "16M-SC-001",
    name: "Jade Roller & Gua Sha Set",
    categoryId: "skin-care-tools",
    price: 2490,
    image: "images/jade-roller-1.jpg",
    gallery: ["images/jade-roller-1.jpg"],
    shortDescription: "Authentic smooth jade stone roller and sculpted Gua Sha tool designed to depuff, stimulate circulation, and tone facial contours.",
    description: "Embrace a mindful beauty ritual with our authentic Jade Roller and Gua Sha Facial Massage Set. Crafted from cooling natural stone, this dual-ended tool stimulates lymphatic drainage, reduces morning puffiness, and aids deep serum absorption.",
    badge: "Popular",
    maxQty: 5
  },
  {
    id: "16M-SC-002",
    name: "Face Vacuum Pore Cleanser (Derma Suction)",
    categoryId: "skin-care-tools",
    price: 1500,
    image: "images/derma-suction-1.png",
    gallery: ["images/derma-suction-1.png", "images/derma-suction-2.jpg"],
    shortDescription: "Powerful yet gentle suction pore-cleaning device with interchangeable probe heads to remove stubborn blackheads, excess oil, and impurities.",
    description: "Achieve deep pore clarity at home with this rechargeable Face Vacuum suction cleanser. Equipped with multiple interchangeable probe heads and adjustable suction levels, it painlessly extracts blackheads, unclogs sebum, and exfoliates dead skin without pinching or redness.",
    badge: "New Arrival",
    maxQty: 5
  },
  {
    id: "16M-SC-003",
    name: "Derma Roller Micro-Needle System",
    categoryId: "skin-care-tools",
    price: 750,
    image: "images/derma-roller-1.png",
    gallery: ["images/derma-roller-1.png", "images/derma-roller-2.jpg"],
    shortDescription: "Precision titanium micro-needle roller designed to stimulate collagen regeneration, improve serum absorption, and smooth skin texture.",
    description: "Unlock radiant, renewed skin with this premium Derma Roller. Designed with ultra-fine precision titanium micro-needles, it creates gentle micro-channels that awaken natural collagen production, reduce the appearance of acne marks, and enhance skin care serum absorption by up to 300%.",
    badge: "New Arrival",
    maxQty: 5
  },
  {
    id: "16M-HC-001",
    name: "5-in-1 Hot Air Styler Hair Dryer Curling Wand Set",
    categoryId: "hair-care-tools",
    price: 4990,
    image: "images/hot-air-styler-1.jpg",
    gallery: ["images/hot-air-styler-1.jpg"],
    shortDescription: "A versatile 5-in-1 hot air styling tool for drying, volumizing, smoothing, and curling salon-grade styles at home.",
    description: "Transform your daily hair routine with this versatile 5-in-1 Hot Air Styler. Designed with interchangeable attachments, it dries, straightens, curls, and adds bouncy volume with intelligent heat control to safeguard your hair from excessive heat damage.",
    badge: "Bestseller",
    maxQty: 5
  },
  {
    id: "16M-SW-001",
    name: "Moisturizing Pink Spa Gel Socks",
    categoryId: "self-care-wellness",
    price: 1290,
    image: "images/spa-socks-1.jpg",
    gallery: ["images/spa-socks-1.jpg"],
    shortDescription: "Infused thermoplastic gel lining formulated with jojoba oil, olive oil, and vitamin E to deeply soften dry, cracked heels and feet.",
    description: "Pamper tired, dry feet with these reusable spa gel socks. Lined with nutrient-rich botanical gel infused with Vitamin E, olive oil, and jojoba oil, they lock in moisture to heal cracked heels and restore silky soft skin during sleep or relaxation.",
    badge: "Best Value",
    maxQty: 5
  }
];

window.PRODUCTS = PRODUCTS;

/**
 * Find product by permanent product ID
 * @param {string} id
 * @returns {Object|null}
 */
function getProductById(id) {
  if (!id) return null;
  return PRODUCTS.find(function(p) { return p.id === id; }) || null;
}
window.getProductById = getProductById;

/**
 * Filter products by category ID
 * @param {string} categoryId
 * @returns {Array}
 */
function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return PRODUCTS;
  return PRODUCTS.filter(function(p) { return p.categoryId === categoryId; });
}
window.getProductsByCategory = getProductsByCategory;
