/**
 * SIXTEEN MART — Global Configuration & Promotion Engine
 */
const SITE_CONFIG = {
  brandName: "SIXTEEN MART",
  whatsappNumber: "94768056036",
  currency: "LKR",
  currencyLabel: "Rs.",
  slideIntervalMs: 5000,        // hero auto-slide interval (easy to change)
  defaultMaxQty: 5,             // limited-stock cap in quantity selectors
  cartStorageKey: "sixteenmart_cart_v1",
  themeStorageKey: "sixteenmart_theme",
  offer: {                      // 30% OFF promotion shown on hero slide 4
    enabled: true,              // set to false to switch the offer off everywhere
    categoryId: "home-gadgets",
    percent: 30,
    label: "30% OFF",
    endsOn: null                // optional "YYYY-MM-DD"; if set and passed, offer turns off automatically
  }
};

/**
 * Check if the special offer is currently active
 */
function isOfferActive() {
  if (!SITE_CONFIG.offer || !SITE_CONFIG.offer.enabled) return false;
  if (SITE_CONFIG.offer.endsOn) {
    const ends = new Date(SITE_CONFIG.offer.endsOn);
    if (!isNaN(ends.getTime()) && Date.now() > ends.getTime()) {
      return false;
    }
  }
  return true;
}

/**
 * Single source of truth for pricing: calculates effective price (with discount if applicable)
 * @param {Object} product
 * @returns {number}
 */
function getEffectivePrice(product) {
  if (!product) return 0;
  if (isOfferActive() && product.categoryId === SITE_CONFIG.offer.categoryId) {
    const discount = (product.price * SITE_CONFIG.offer.percent) / 100;
    return Math.round(product.price - discount);
  }
  return product.price;
}

/**
 * Format currency with Rs. label
 * @param {number} amount
 * @returns {string}
 */
function formatPrice(amount) {
  const num = Math.round(amount || 0);
  return `${SITE_CONFIG.currencyLabel} ${num.toLocaleString()}`;
}

window.SITE_CONFIG = SITE_CONFIG;
window.isOfferActive = isOfferActive;
window.getEffectivePrice = getEffectivePrice;
window.formatPrice = formatPrice;
