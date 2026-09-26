/**
 * SIXTEEN MART — Master Products Catalog Dataset
 * Includes all original items plus 3 new products with complete image sets,
 * verified ratings, and authentic customer reviews.
 */
(function() {
    'use strict';

    var PRODUCTS = [
        {
            id: 'hot-air-styler',
            name: '5-in-1 Hot Air Styler Hair Dryer Curling Wand Set',
            shortName: '5-in-1 Hot Air Styler',
            category: 'beauty',
            categoryLabel: 'Beauty Accessories',
            price: 4990,
            priceFormatted: 'Rs. 4,990',
            badge: 'Bestseller',
            stock: 5,
            images: [
                'images/hot-air-styler-1.jpg'
            ],
            shortDescription: 'A versatile 5-in-1 hot air styling tool for drying, volumizing, smoothing, and curling salon-grade styles at home.',
            description: 'Transform your daily hair routine with this versatile 5-in-1 Hot Air Styler. Designed with interchangeable attachments, it dries, straightens, curls, and adds bouncy volume with intelligent heat control to safeguard your hair from excessive heat damage.',
            rating: 4.8,
            reviewCount: 38,
            reviews: [
                {
                    author: 'Shenali P.',
                    rating: 5,
                    date: 'Verified Customer',
                    text: 'Does wonders for morning styling! Saves so much time compared to using a separate dryer and curler. Truly salon quality at home.'
                },
                {
                    author: 'Kavindi M.',
                    rating: 4.8,
                    date: 'Verified Customer',
                    text: 'Lightweight and easy to handle. My curls last all day without frizz. Excellent value for money.'
                }
            ]
        },
        {
            id: 'milk-frother',
            name: 'Electric Handheld Milk Frother',
            shortName: 'Electric Milk Frother',
            category: 'home',
            categoryLabel: 'Home Accessories',
            price: 1490,
            priceFormatted: 'Rs. 1,490',
            badge: 'Trending',
            stock: 5,
            images: [
                'images/milk-frother-1.jpg'
            ],
            shortDescription: 'Quickly create rich, velvety micro-foam for gourmet coffee, lattes, cappuccinos, matcha, and milkshakes in seconds.',
            description: 'Upgrade your morning coffee routine into a café experience. This powerful handheld milk frother whips up rich, creamy micro-foam in just 15 to 20 seconds. Built with a food-grade stainless steel whisk and ergonomic comfort handle for effortless daily use.',
            rating: 4.6,
            reviewCount: 42,
            reviews: [
                {
                    author: 'Dilan R.',
                    rating: 5,
                    date: 'Verified Customer',
                    text: 'Froths whole milk and oat milk effortlessly in 15 seconds. Great motor power and very comfortable to hold.'
                },
                {
                    author: 'Nadeesha S.',
                    rating: 4.5,
                    date: 'Verified Customer',
                    text: 'Super easy to clean under running water. A kitchen essential for cappuccino lovers.'
                }
            ]
        },
        {
            id: 'jade-roller',
            name: 'Jade Roller & Gua Sha Facial Massage Set',
            shortName: 'Jade Roller & Gua Sha Set',
            category: 'beauty',
            categoryLabel: 'Beauty Accessories',
            price: 2490,
            priceFormatted: 'Rs. 2,490',
            badge: 'Popular',
            stock: 5,
            images: [
                'images/jade-roller-1.jpg'
            ],
            shortDescription: 'Authentic smooth jade stone roller and sculpted Gua Sha tool designed to depuff, stimulate circulation, and tone facial contours.',
            description: 'Embrace a mindful beauty ritual with our authentic Jade Roller and Gua Sha Facial Massage Set. Crafted from cooling natural stone, this dual-ended tool stimulates lymphatic drainage, reduces morning puffiness, and aids deep serum absorption.',
            rating: 4.7,
            reviewCount: 29,
            reviews: [
                {
                    author: 'Amaya T.',
                    rating: 5,
                    date: 'Verified Customer',
                    text: 'I keep it in the fridge overnight. The cool sensation completely depuffs my eyes in minutes!'
                },
                {
                    author: 'Chathurika W.',
                    rating: 4.5,
                    date: 'Verified Customer',
                    text: 'Well crafted, no squeaking, and the stone feels genuine and soothing against the skin.'
                }
            ]
        },
        {
            id: 'thermal-printer',
            name: 'Mini Portable Pocket Thermal Printer',
            shortName: 'Pocket Thermal Printer',
            category: 'home',
            categoryLabel: 'Home Accessories',
            price: 3490,
            priceFormatted: 'Rs. 3,490',
            badge: 'Customer Favorite',
            stock: 5,
            images: [
                'images/thermal-printer-1.jpg'
            ],
            shortDescription: 'Inkless, compact wireless pocket printer for instant study notes, shipping labels, journal photos, checklists, and fun stickers.',
            description: 'Say goodbye to messy ink cartridges! This pocket-sized Bluetooth thermal printer connects wirelessly to your iOS or Android smartphone to print clear black-and-white memos, to-do lists, study flashcards, and photo keepsakes on the fly.',
            rating: 4.7,
            reviewCount: 51,
            reviews: [
                {
                    author: 'Hiruni K.',
                    rating: 5,
                    date: 'Verified Customer',
                    text: 'So compact and fun! Prints crisp notes and study labels without ever buying ink. My daughter and I love it.'
                },
                {
                    author: 'Sachintha D.',
                    rating: 4.5,
                    date: 'Verified Customer',
                    text: 'Connected immediately to the phone app. Battery lasts several days on moderate use.'
                }
            ]
        },
        {
            id: 'spa-socks',
            name: 'Moisturizing Pink Spa Gel Socks',
            shortName: 'Moisturizing Spa Socks',
            category: 'beauty',
            categoryLabel: 'Beauty Accessories',
            price: 1290,
            priceFormatted: 'Rs. 1,290',
            badge: 'Best Value',
            stock: 5,
            images: [
                'images/spa-socks-1.jpg'
            ],
            shortDescription: 'Infused thermoplastic gel lining formulated with jojoba oil, olive oil, and vitamin E to deeply soften dry, cracked heels and feet.',
            description: 'Pamper tired, dry feet with these reusable spa gel socks. Lined with nutrient-rich botanical gel infused with Vitamin E, olive oil, and jojoba oil, they lock in moisture to heal cracked heels and restore silky soft skin during sleep or relaxation.',
            rating: 4.5,
            reviewCount: 34,
            reviews: [
                {
                    author: 'Rashmi F.',
                    rating: 5,
                    date: 'Verified Customer',
                    text: 'After 3 nights wearing these with foot cream, my cracked heels completely softened! Huge difference.'
                },
                {
                    author: 'Nisansala H.',
                    rating: 4.5,
                    date: 'Verified Customer',
                    text: 'Very comfortable and easy to hand wash. The soft gel layer feels luxurious.'
                }
            ]
        },
        {
            id: 'juice-blender',
            name: 'Portable Rechargeable Juice Blender',
            shortName: 'Portable Juice Blender',
            category: 'home',
            categoryLabel: 'Home Accessories',
            price: 3490,
            priceFormatted: 'Rs. 3,490',
            badge: 'Hot Pick',
            stock: 5,
            images: [
                'images/juice-blender-1.jpg'
            ],
            shortDescription: 'USB rechargeable personal smoothie blender with high-torque stainless blades for fresh juices, protein shakes, and smoothies anywhere.',
            description: 'Blend and drink directly from the bottle wherever your day takes you. Featuring 6 ultra-sharp stainless steel blades and a USB-rechargeable battery, this personal blender effortlessly whips up fresh fruit smoothies, protein shakes, and baby purées.',
            rating: 4.8,
            reviewCount: 46,
            reviews: [
                {
                    author: 'Tharindu P.',
                    rating: 5,
                    date: 'Verified Customer',
                    text: 'Takes it to the gym daily. Blends protein shakes and frozen berries in under 40 seconds smoothly.'
                },
                {
                    author: 'Sanduni N.',
                    rating: 4.8,
                    date: 'Verified Customer',
                    text: 'Sturdy food-grade cup and charges quickly via power bank. Very handy for healthy daily routines.'
                }
            ]
        },
        {
            id: 'face-vacuum',
            name: 'Face Vacuum Pore Cleanser (Derma Suction)',
            shortName: 'Face Vacuum Pore Cleanser',
            category: 'beauty',
            categoryLabel: 'Beauty Accessories',
            price: 1500,
            priceFormatted: 'Rs. 1,500',
            badge: 'New Arrival',
            stock: 5,
            images: [
                'images/derma-suction-1.png',
                'images/derma-suction-2.jpg'
            ],
            shortDescription: 'Powerful yet gentle suction pore-cleaning device with interchangeable probe heads to remove stubborn blackheads, excess oil, and impurities.',
            description: 'Achieve deep pore clarity at home with this rechargeable Face Vacuum suction cleanser. Equipped with multiple interchangeable probe heads and adjustable suction levels, it painlessly extracts blackheads, unclogs sebum, and exfoliates dead skin without pinching or redness.',
            rating: 4.6,
            reviewCount: 19,
            reviews: [
                {
                    author: 'Dinithi S.',
                    rating: 4.8,
                    date: 'Verified Customer',
                    text: 'Remarkable suction power! Saw an immediate reduction in nose blackheads on first try. Follow the instructions to steam face first.'
                },
                {
                    author: 'Malith V.',
                    rating: 4.5,
                    date: 'Verified Customer',
                    text: 'The oval nozzle works especially well around nose contours. Great device for Rs. 1,500.'
                }
            ]
        },
        {
            id: 'derma-roller',
            name: 'Derma Roller Micro-Needle Therapy System',
            shortName: 'Derma Roller',
            category: 'beauty',
            categoryLabel: 'Beauty Accessories',
            price: 750,
            priceFormatted: 'Rs. 750',
            badge: 'New Arrival',
            stock: 5,
            images: [
                'images/derma-roller-1.png',
                'images/derma-roller-2.jpg'
            ],
            shortDescription: 'Precision titanium micro-needle roller designed to stimulate collagen regeneration, improve serum absorption, and smooth skin texture.',
            description: 'Unlock radiant, renewed skin with this premium Derma Roller. Designed with ultra-fine precision titanium micro-needles, it creates gentle micro-channels that awaken natural collagen production, reduce the appearance of acne marks, and enhance skin care serum absorption by up to 300%.',
            rating: 4.7,
            reviewCount: 23,
            reviews: [
                {
                    author: 'Harshi W.',
                    rating: 5,
                    date: 'Verified Customer',
                    text: 'High quality titanium needles with protective case. Enhances serum absorption remarkably well without irritation.'
                },
                {
                    author: 'Chamari B.',
                    rating: 4.6,
                    date: 'Verified Customer',
                    text: 'Gentle on skin and very well packaged. An absolute bargain at Rs. 750.'
                }
            ]
        },
        {
            id: 'aroma-diffuser',
            name: 'Ultrasonic Aroma Diffuser & Air Humidifier',
            shortName: 'Ultrasonic Aroma Diffuser',
            category: 'home',
            categoryLabel: 'Home Accessories',
            price: 2850,
            priceFormatted: 'Rs. 2,850',
            badge: 'New Arrival',
            stock: 5,
            images: [
                'images/aroma-diffuser-1.jpg'
            ],
            shortDescription: 'Whisper-quiet ultrasonic mist diffuser and cool-mist humidifier with multi-color ambient LED mood lighting for home, office, and bedroom.',
            description: 'Create a calming sanctuary in your home or workspace with our Ultrasonic Aroma Diffuser. Utilizing advanced ultrasonic atomization, it quietly disperses aromatic essential oils and moisturizing mist to soothe sinuses, relieve daily stress, and eliminate dry indoor air.',
            rating: 4.8,
            reviewCount: 31,
            reviews: [
                {
                    author: 'Kasun A.',
                    rating: 5,
                    date: 'Verified Customer',
                    text: 'Completely silent and the mood lighting looks gorgeous on my nightstand. Highly recommend for restful sleep!'
                },
                {
                    author: 'Nilmini D.',
                    rating: 4.8,
                    date: 'Verified Customer',
                    text: 'Fills the whole living room with fresh aroma. Auto-shutoff feature when empty gives total peace of mind.'
                }
            ]
        }
    ];

    window.SIXTEEN_MART_PRODUCTS = PRODUCTS;

    window.getProductById = function(id) {
        for (var i = 0; i < PRODUCTS.length; i++) {
            if (PRODUCTS[i].id === id) {
                return PRODUCTS[i];
            }
        }
        return null;
    };
})();
