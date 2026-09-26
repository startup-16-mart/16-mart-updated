# SIXTEEN MART (16 Mart) — Official E-Commerce Website

A modern, fast, responsive e-commerce storefront for **SIXTEEN MART**, built with clean semantic HTML5, modern CSS3 (with Daylight default theme & Dark mode support), and modular vanilla JavaScript. Optimized for direct social-commerce ordering via WhatsApp and prepared for zero-configuration hosting on **GitHub Pages**.

> **Official Tagline:** Always More Value.  
> **Official WhatsApp Order Hotline:** [+94 76 805 6036](https://wa.me/94768056036)

---

## 🚀 Live Demo & GitHub Pages Hosting

This repository is structured for immediate deployment with GitHub Pages:

1. Push this repository to GitHub (e.g. `https://github.com/<username>/sixteen-mart`).
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Branch**, select `main` (or `master`) and directory `/ (root)`.
4. Click **Save**. Your site will be live within 1–2 minutes!

---

## 📁 Repository Structure

```text
├── index.html              # Home page (5-slide full-bleed hero slider, Categories, Products Grid)
├── about.html              # About Us (English copy: 16 members concept, Vision, Mission, Core Values)
├── products.html           # Full catalog page (Category filters, Real-time search, Sorting)
├── contact.html            # Contact Us page (Social links, WhatsApp hotline, Message generator)
├── faq.html                # FAQs (Accessible accordions for orders, shipping, payment)
├── 16Mart_Brand_Guideline_Updated.pdf # Official brand guidelines & assets
├── README.md               # GitHub Pages deployment & documentation
├── css/
│   └── styles.css          # Unified stylesheet preserving original Coral/Warm Ivory palette
├── js/
│   ├── theme.js            # Daylight default theme + Dark mode toggle with localStorage
│   ├── products-data.js    # Master catalog data (prices, stock, ratings, reviews, galleries)
│   ├── modal.js            # Quick-View modal (image gallery, quantity stepper, WhatsApp CTA)
│   ├── catalog.js          # Catalog filtering, live search & sorting logic for products.html
│   └── main.js             # Hero 5-slide slider with swipe/arrows/dots, mobile drawer, search
└── images/                 # All assets with clean, kebab-case naming (no spaces)
    ├── logo.jpeg           # Brand logo (58px height with mix-blend-mode: multiply)
    ├── web-banner-1.jpg    # Slide 1: Catalog banner (Shop all products)
    ├── web-banner-2.jpg    # Slide 2: Electric Handheld Milk Frother banner
    ├── web-banner-3.jpg    # Slide 3: Jade Roller & Gua Sha Set banner
    ├── web-banner-4.jpg    # Slide 4: Derma Roller Micro-Needle banner
    ├── web-banner-5.jpg    # Slide 5: Home & Beauty Accessories category banner
    ├── home-accessories.jpg
    ├── beauty-accessories.jpg
    ├── hot-air-styler-1.jpg
    ├── milk-frother-1.jpg
    ├── jade-roller-1.jpg
    ├── thermal-printer-1.jpg
    ├── spa-socks-1.jpg
    ├── juice-blender-1.jpg
    ├── derma-suction-1.png  # Face vacuum main image
    ├── derma-suction-2.jpg  # Face vacuum nozzles gallery image
    ├── derma-roller-1.png   # Derma roller main image
    ├── derma-roller-2.jpg   # Derma roller close-up gallery image
    └── aroma-diffuser-1.jpg # Ultrasonic aroma diffuser
```

---

## 🛍️ Key Features & Updates

### 1. Logo & Compact Navigation
- Prominent logo at **58px** height on desktop with `mix-blend-mode: multiply` for seamless header blending on light mode.
- Sticky navigation bar with compact header height (`72px` desktop / `64px` mobile) and smooth scroll shadow.

### 2. 5-Slide Full-Bleed Hero Slider (Reference Pattern)
- Follows the reference design pattern: full-bleed slider with **no overlaid marketing headline copy** so the artwork itself communicates the message.
- Full clickable **invisible shop hotspot** (`.hero-shop-hotspot`) covering each slide, linking directly to the product or catalog.
- **5 Slides:**
  1. Slide 1 (Catalog): *Shop all products* — `web-banner-1.jpg` → `products.html`
  2. Slide 2 (Product): *Milk Frother* — `web-banner-2.jpg` → `products.html?search=Milk+Frother`
  3. Slide 3 (Product): *Jade Roller* — `web-banner-3.jpg` → `products.html?search=Jade+Roller`
  4. Slide 4 (Product): *Derma Roller* — `web-banner-4.jpg` → `products.html?search=Derma+Roller`
  5. Slide 5 (Category): *Home & Beauty Accessories* — `web-banner-5.jpg` → `products.html`
- Touch/mouse drag & swipe support with kinetic flick detection, arrow navigation, and dot indicators.

### 3. Official Tagline
- Footer below the logo exclusively displays the official slogan: **Always More Value.**

### 4. Daylight Theme by Default
- The site strictly defaults to the **Daylight (Light) Theme**.
- Dark mode remains accessible via the header toggle switch and is saved in `localStorage`.

### 5. Brand Guidelines Integration (About Us Page — English Only)
- Features the **16 Products & 16 Members Concept**.
- Official **Vision** and **Mission** statements verbatim from the brand guide.
- The 4 official **Core Values**:
  1. **Affordability** — Value-for-money in every product
  2. **Simplicity** — Easy, uncomplicated shopping
  3. **Trust** — Honest products and honest communication
  4. **Community** — Built by and for young Sri Lankans
- All Sinhala text removed; 100% English copy.

### 6. Official WhatsApp Ordering
- Linked directly to official phone number **+94 76 805 6036** (`94768056036`).
- Quick-View modal generates pre-formatted WhatsApp orders with product name, selected quantity (stepper 1–5), unit price, and total amount.

### 7. Brand Color Palette Preserved
- **Coral (Primary):** `#FF6F59`
- **Soft Coral:** `#FFE2DB`
- **Warm Ivory (Base):** `#FFF8F0`
- **Dark Brown / Charcoal:** `#2D211C`
- **Text:** `#4A3A33`
- **Muted:** `#806F67`
- **Footer Background:** `#FF6F59`
