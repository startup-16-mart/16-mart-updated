# SIXTEEN MART — Google Tag Manager & GA4 Tracking Plan

**GTM Container ID:** `GTM-NBMDWPS4`  
**Measurement Protocol:** Google Analytics 4 (GA4) via GTM DataLayer  
**Currency:** `LKR`  
**Site URL:** `https://16mart.store`  

---

## 1. Overview & Architecture

Tracking is implemented using vanilla JavaScript via `js/analytics.js` pushing standard ecommerce and engagement events into `window.dataLayer = window.dataLayer || [];`.
- **Zero Double Loading:** `js/analytics.js` does NOT load external GTM or gtag scripts; GTM is loaded exclusively by the verbatim `<head>` snippet.
- **Ecommerce Reset:** Prior to every ecommerce event, `{ ecommerce: null }` is pushed to reset previous state according to GA4 best practices.
- **Delegated Click Engine:** Interactive elements carry `data-track` attributes and semantic IDs.

---

## 2. Standard HTML ID Hierarchy

| Element | ID Pattern | Sample Element / Description |
|---|---|---|
| Product Card | `card-{productId}` | `card-16M-HG-001` |
| Card Quick View Button | `btn-quickview-{productId}` | `btn-quickview-16M-HG-001` |
| Card Add to Cart Button | `btn-addtocart-{productId}` | `btn-addtocart-16M-HG-001` |
| Card Direct WhatsApp Button | `btn-whatsapp-{productId}` | `btn-whatsapp-16M-HG-001` |
| Modal Add to Cart | `modal-addtocart-{productId}` | `modal-addtocart-16M-HG-001` |
| Modal WhatsApp Order | `modal-whatsapp-{productId}` | `modal-whatsapp-16M-HG-001` |
| Cart Item Remove Button | `cart-remove-{productId}` | `cart-remove-16M-HG-001` |
| Cart Item Quantity Minus | `cart-minus-{productId}` | `cart-minus-16M-HG-001` |
| Cart Item Quantity Plus | `cart-plus-{productId}` | `cart-plus-16M-HG-001` |
| Cart WhatsApp Checkout | `btn-cart-whatsapp-checkout` | Main checkout button on `cart.html` |
| Hero Slide Hotspot Link | `hero-slide-{n}` | `hero-slide-1` to `hero-slide-4` (full-slide clickable hotspot) |
| Hero Slider Controls | `hero-prev`, `hero-next`, `hero-dot-{n}` | Slider navigation arrows and dots |
| Desktop Nav Links | `nav-home`, `nav-about`, `nav-products`, `nav-contact`, `nav-faq` | Primary navigation links |
| Nav Category Links | `nav-cat-{categoryId}` | `nav-cat-home-gadgets`, etc. |
| Header Action Icons | `nav-cart`, `nav-signin`, `nav-search`, `nav-theme-toggle`, `nav-hamburger` | Desktop & mobile header tools |
| Mobile Bottom Tab Bar | `mobnav-home`, `mobnav-categories`, `mobnav-cart`, `mobnav-whatsapp` | Fixed bottom bar tabs (≤ 900px) |
| Mobile Category Strip | `home-catstrip-{categoryId}`, `home-catstrip-offers` | Icon strip on home page (≤ 768px) |
| Mobile Product "+" Button | `btn-addtocart-{productId}` | Round orange button (`data-location="mobile-card"`) |
| Category Cards (Home) | `home-cat-{categoryId}` | Desktop 4-column category grid cards |
| Special Offer Banner | `offer-banner`, `offer-banner-cta` | 30% OFF promotion card on home |
| Value Strip Pillars | `value-founders`, `value-affordable`, `value-functional`, `value-whatsapp` | 4 brand value cards |
| Floating WhatsApp Button | `float-whatsapp` | Desktop floating action button (hidden on mobile) |
| Footer Social Links | `footer-social-facebook`, `footer-social-instagram`, `footer-social-tiktok`, `footer-social-whatsapp` | Footer circular social buttons |

---

## 3. DataLayer Events & Parameters

### Ecommerce Events

| Event | Trigger | Payload Parameters |
|---|---|---|
| `view_item_list` | When a product grid renders | `item_list_name`, `items: [{ item_id, item_name, item_category, price, quantity: 1 }]` |
| `select_item` | Clicking a card image, title, or Quick View | `item_list_name`, `items: [{ item_id, item_name, item_category, price }]` |
| `view_item` | When Quick View modal opens | `items: [{ item_id, item_name, item_category, price, quantity }]` |
| `add_to_cart` | Clicking any Add to Cart or "+" button | `value`, `location`, `items: [{ item_id, item_name, item_category, price, quantity }]` |
| `remove_from_cart` | Removing an item or setting qty to 0 | `items: [{ item_id, item_name, item_category, price, quantity }]` |
| `view_cart` | When `cart.html` loads | `value`, `items: [...]` |
| `begin_checkout` | Clicking "Order via WhatsApp" in Cart | `value`, `items: [...]` |
| `whatsapp_order_click`| Direct WhatsApp order or inquiry click | `product_id`, `location`, `value` |

### Promotion Events

| Event | Trigger | Payload Parameters |
|---|---|---|
| `view_promotion` | Active hero slide displayed | `promotion_id`, `creative_name`, `creative_slot` |
| `select_promotion` | Hero slide or "Shop Now" clicked | `promotion_id`, `creative_name`, `creative_slot` |

**Promotion IDs:**
- Slide 1: `promo-brand-intro` ("16 Mart — Always More Value")
- Slide 2: `promo-home-gadgets` ("Home & Gadgets at 16 Mart")
- Slide 3: `promo-beauty-tools` ("Skin care and hair care tools at 16 Mart")
- Slide 4: `promo-30off-home-gadgets` ("30% off Home & Gadgets at 16 Mart")

### Engagement Events

| Event | Trigger | Payload Parameters |
|---|---|---|
| `nav_click` | Header, mobile drawer, or footer link click | `link_id`, `link_text` |
| `category_click` | Category card, chip, strip item, or dropdown | `category_id` |
| `search` | Search query submitted | `search_term` |
| `theme_toggle` | Dark / daylight theme toggle clicked | `theme: "dark" \| "light"` |
| `social_click` | Social icon clicked | `network: "facebook" \| "instagram" \| "tiktok" \| "whatsapp"` |

---

## 4. Permanent Product IDs & Metadata

| Product ID | Product Name | Category | Base Price (LKR) | 30% Promo Price |
|---|---|---|---|---|
| `16M-HG-001` | Electric Handheld Milk Frother | `home-gadgets` | Rs. 1,490 | Rs. 1,043 |
| `16M-HG-002` | Mini Portable Pocket Thermal Printer | `home-gadgets` | Rs. 3,490 | Rs. 2,443 |
| `16M-HG-003` | Portable Rechargeable Juice Blender | `home-gadgets` | Rs. 3,490 | Rs. 2,443 |
| `16M-HG-004` | Ultrasonic Aroma Diffuser & Humidifier | `home-gadgets` | Rs. 2,850 | Rs. 1,995 |
| `16M-SC-001` | Jade Roller & Gua Sha Set | `skin-care-tools` | Rs. 2,490 | Regular |
| `16M-SC-002` | Face Vacuum Pore Cleanser (Derma Suction) | `skin-care-tools` | Rs. 1,500 | Regular |
| `16M-SC-003` | Derma Roller Micro-Needle System | `skin-care-tools` | Rs. 750 | Regular |
| `16M-HC-001` | 5-in-1 Hot Air Styler Hair Dryer Curling Wand Set | `hair-care-tools` | Rs. 4,990 | Regular |
| `16M-HC-002` | Electric Hair & Beard Precision Trimmer | `hair-care-tools` | Rs. 799 | Regular |
| `16M-SW-001` | Moisturizing Pink Spa Gel Socks | `self-care-wellness` | Rs. 1,290 | Regular |
| `16M-SC-004` | Electric Facial Massager & Skin Sculptor | `skin-care-tools` | Rs. 890 | Regular |
