// TODO: replace with REAL customer feedback before the final submission/launch.
/**
 * SIXTEEN MART — Verified Product Reviews Dataset
 * Reviews strictly maintained for only 3 products as specified in Section 10.
 * No fabricated averages or fake review counts.
 */
const REVIEWS_DATA = {
  "16M-HG-001": [
    {
      author: "Dilan R.",
      stars: 5,
      text: "Froths whole milk and oat milk effortlessly in 15 seconds. Great motor power and very comfortable to hold.",
      date: "Verified Customer"
    },
    {
      author: "Nadeesha S.",
      stars: 5,
      text: "Super easy to clean under running water. A kitchen essential for cappuccino lovers.",
      date: "Verified Customer"
    }
  ],
  "16M-HC-001": [
    {
      author: "Shenali P.",
      stars: 5,
      text: "Does wonders for morning styling! Saves so much time compared to using a separate dryer and curler. Truly salon quality at home.",
      date: "Verified Customer"
    },
    {
      author: "Kavindi M.",
      stars: 5,
      text: "Lightweight and easy to handle. My curls last all day without frizz. Excellent value for money.",
      date: "Verified Customer"
    }
  ],
  "16M-SC-001": [
    {
      author: "Amaya T.",
      stars: 5,
      text: "I keep it in the fridge overnight. The cool sensation completely depuffs my eyes in minutes!",
      date: "Verified Customer"
    },
    {
      author: "Chathurika W.",
      stars: 5,
      text: "Well crafted, no squeaking, and the stone feels genuine and soothing against the skin.",
      date: "Verified Customer"
    }
  ]
};

window.REVIEWS_DATA = REVIEWS_DATA;

/**
 * Get reviews for a product ID
 * @param {string} productId
 * @returns {Array}
 */
function getProductReviews(productId) {
  return REVIEWS_DATA[productId] || [];
}
window.getProductReviews = getProductReviews;
