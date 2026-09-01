export const SRI_LANKAN_DISTRICTS = [
  { district: 'Colombo', fee: 350 },
  { district: 'Gampaha', fee: 400 },
  { district: 'Kalutara', fee: 450 },
  { district: 'Kandy', fee: 500 },
  { district: 'Matale', fee: 550 },
  { district: 'Nuwara Eliya', fee: 600 },
  { district: 'Galle', fee: 500 },
  { district: 'Matara', fee: 550 },
  { district: 'Hambantota', fee: 600 },
  { district: 'Jaffna', fee: 700 },
  { district: 'Kilinochchi', fee: 700 },
  { district: 'Mannar', fee: 700 },
  { district: 'Vavuniya', fee: 650 },
  { district: 'Mullaitivu', fee: 700 },
  { district: 'Batticaloa', fee: 650 },
  { district: 'Ampara', fee: 650 },
  { district: 'Trincomalee', fee: 650 },
  { district: 'Kurunegala', fee: 500 },
  { district: 'Puttalam', fee: 550 },
  { district: 'Anuradhapura', fee: 600 },
  { district: 'Polonnaruwa', fee: 600 },
  { district: 'Badulla', fee: 600 },
  { district: 'Moneragala', fee: 650 },
  { district: 'Ratnapura', fee: 550 },
  { district: 'Kegalle', fee: 500 }
];

export const INITIAL_CATEGORIES = [
  {
    name: 'Baby Care',
    slug: 'baby-care',
    description: 'Gentle, dermatologist-approved skincare and hygiene essentials for your little one’s delicate skin.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    active: true,
    order: 1
  },
  {
    name: 'Mom Care',
    slug: 'mom-care',
    description: 'Nourishing, restorative self-care and postpartum wellness products crafted specifically for mothers.',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    active: true,
    order: 2
  },
  {
    name: 'Feeding & Nursing',
    slug: 'feeding-nursing',
    description: 'BPA-free bottles, organic nursing cushions, and ergonomic accessories for stress-free bonding moments.',
    image: 'https://images.unsplash.com/photo-1594824813689-53b6923c6f09?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    active: true,
    order: 3
  },
  {
    name: 'Sleep & Snuggle',
    slug: 'sleep-snuggle',
    description: 'Ultra-soft organic muslin swaddles, breathable sleep sacks, and soothing lullaby blankets.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    active: true,
    order: 4
  },
  {
    name: 'Bath & Care',
    slug: 'bath-care',
    description: 'Tear-free shampoos, organic bamboo hooded towels, and gentle bath-time comfort essentials.',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    active: true,
    order: 5
  },
  {
    name: 'Clothing',
    slug: 'clothing',
    description: 'GOTS-certified 100% organic cotton rompers, footies, and matching mom & mini loungewear.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    active: true,
    order: 6
  },
  {
    name: 'Toys & Gifts',
    slug: 'toys-gifts',
    description: 'Non-toxic beechwood teethers, heirloom soft plushies, and beautifully packaged newborn gift sets.',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    active: true,
    order: 7
  },
  {
    name: 'Baby Essentials',
    slug: 'baby-essentials',
    description: 'Everyday must-haves, diapering accessories, thermal bags, and safety essentials for modern parents.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    active: true,
    order: 8
  }
];

export const INITIAL_PRODUCTS = [
  // 1. Baby Care
  {
    name: 'Organic Chamomile & Calendula Baby Wash',
    slug: 'organic-chamomile-calendula-baby-wash',
    shortDescription: 'Ultra-gentle tear-free formula enriched with organic calendula flower extract.',
    description: 'Crafted with the purest organic chamomile and soothing calendula extract, this tear-free baby wash gently cleanses delicate skin and hair without stripping natural moisture. Certified organic, hypoallergenic, and formulated without sulfates, parabens, or synthetic perfumes.',
    price: 3200,
    discountPrice: 2850,
    categorySlug: 'baby-care',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228852-80b6e5eeff06?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 24,
    sku: 'BC-BW-001',
    brand: 'Butterfly Care Pure',
    ageGroup: '0-36 months',
    sizes: ['250ml', '500ml'],
    colors: ['Natural'],
    materials: 'Certified Organic Calendula & Chamomile, Aloe Vera Base',
    careInstructions: 'Store in a cool dry place away from direct sunlight.',
    rating: 4.9,
    reviewCount: 38,
    featured: true,
    bestSeller: true,
    newArrival: false,
    active: true
  },
  {
    name: 'Soothing Oat & Shea Butter Baby Lotion',
    slug: 'soothing-oat-shea-butter-baby-lotion',
    shortDescription: '24-hour hydration with colloidal oat and wild-harvested raw shea butter.',
    description: 'Formulated to protect and soften sensitive newborn skin. Colloidal oatmeal relieves dryness and irritation while unrefined shea butter seals in vital hydration.',
    price: 3600,
    discountPrice: 3100,
    categorySlug: 'baby-care',
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597359-0097c0f1b2b8?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 18,
    sku: 'BC-BL-002',
    brand: 'Butterfly Care Pure',
    ageGroup: '0+ months',
    sizes: ['200ml', '400ml'],
    colors: ['Cream'],
    materials: 'Colloidal Oat Flour, Raw Shea Butter, Sweet Almond Oil',
    careInstructions: 'Apply liberally over body after bath time.',
    rating: 4.8,
    reviewCount: 29,
    featured: true,
    bestSeller: false,
    newArrival: true,
    active: true
  },
  {
    name: 'Gentle Zinc Oxide Barrier Nappy Cream',
    slug: 'gentle-zinc-oxide-barrier-nappy-cream',
    shortDescription: 'Fast-acting barrier protection against nappy rash and skin chafing.',
    description: 'Creates a breathable protective barrier that calms existing redness and prevents diaper rash. Made with pharmaceutical-grade non-nano zinc oxide and soothing beeswax.',
    price: 2450,
    discountPrice: 1990,
    categorySlug: 'baby-care',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 35,
    sku: 'BC-NC-003',
    brand: 'Butterfly Care Pure',
    ageGroup: '0-24 months',
    sizes: ['100g'],
    colors: ['Soft White'],
    materials: 'Non-nano Zinc Oxide (15%), Organic Coconut Oil, Beeswax',
    careInstructions: 'Apply a thin layer at every diaper change.',
    rating: 5.0,
    reviewCount: 42,
    featured: false,
    bestSeller: true,
    newArrival: false,
    active: true
  },
  {
    name: 'Cold-Pressed Sweet Almond Baby Massage Oil',
    slug: 'cold-pressed-sweet-almond-baby-massage-oil',
    shortDescription: '100% pure cold-pressed almond oil for daily bonding and bedtime massages.',
    description: 'Promote deep sleep and muscle relaxation with this lightweight, nourishing botanical oil. Absorbs seamlessly without greasy residue.',
    price: 2890,
    discountPrice: 2490,
    categorySlug: 'baby-care',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 14,
    sku: 'BC-BO-004',
    brand: 'Butterfly Care Pure',
    ageGroup: '0+ months',
    sizes: ['150ml'],
    colors: ['Amber'],
    materials: '100% Virgin Sweet Almond Oil & Jojoba',
    careInstructions: 'Warm a few drops between palms and gently massage baby.',
    rating: 4.9,
    reviewCount: 19,
    featured: false,
    bestSeller: false,
    newArrival: true,
    active: true
  },

  // 2. Mom Care
  {
    name: 'Nourishing Motherhood Belly & Stretchmark Oil',
    slug: 'nourishing-motherhood-belly-stretchmark-oil',
    shortDescription: 'Rich botanical blend of Rosehip, Marula, and Vitamin E for pregnancy elasticity.',
    description: 'Formulated with utmost love for expecting and new mamas. Packed with essential fatty acids and natural antioxidants that encourage dermal elasticity, relieve itchy stretching skin, and visibly diminish pregnancy stretch marks.',
    price: 4950,
    discountPrice: 4250,
    categorySlug: 'mom-care',
    images: [
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228722-d0b5de70d774?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 20,
    sku: 'BC-MO-101',
    brand: 'Butterfly Care Mama',
    ageGroup: 'Expecting & New Moms',
    sizes: ['100ml', '200ml'],
    colors: ['Golden Rose'],
    materials: 'Cold-pressed Rosehip Seed Oil, Marula Oil, Tocopherol (Vitamin E)',
    careInstructions: 'Massage in circular motions over belly, hips, and breasts twice daily.',
    rating: 5.0,
    reviewCount: 54,
    featured: true,
    bestSeller: true,
    newArrival: false,
    active: true
  },
  {
    name: '100% Organic Lanolin-Free Nipple Butter',
    slug: 'organic-lanolin-free-nipple-butter',
    shortDescription: 'Plant-based soothing balm, 100% safe for nursing babies without washing off.',
    description: 'Instantly soothes dry, cracked, and tender nursing nipples. Made purely from food-grade botanical butters and oils that are completely safe for baby ingestion.',
    price: 2600,
    discountPrice: 2200,
    categorySlug: 'mom-care',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 28,
    sku: 'BC-NB-102',
    brand: 'Butterfly Care Mama',
    ageGroup: 'Nursing Moms',
    sizes: ['50g'],
    colors: ['Golden Cream'],
    materials: 'Organic Cocoa Butter, Calendula Infused Olive Oil, Mango Seed Butter',
    careInstructions: 'Apply a pea-sized amount after each feeding session.',
    rating: 4.9,
    reviewCount: 31,
    featured: true,
    bestSeller: false,
    newArrival: false,
    active: true
  },
  {
    name: 'Postpartum Herbal Sitz Bath Soak',
    slug: 'postpartum-herbal-sitz-bath-soak',
    shortDescription: 'Organic herbal recovery blend with Witch Hazel, Epsom salt, and Lavender.',
    description: 'A comforting, rejuvenating traditional sitz bath blend designed to accelerate perineal healing, soothe soreness, and provide profound relaxation following childbirth.',
    price: 3400,
    discountPrice: 2950,
    categorySlug: 'mom-care',
    images: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 15,
    sku: 'BC-PS-103',
    brand: 'Butterfly Care Mama',
    ageGroup: 'Postpartum Moms',
    sizes: ['300g (6 Soaks)'],
    colors: ['Herbal Blend'],
    materials: 'Dead Sea Salt, Organic Lavender Buds, Yarrow, Witch Hazel Leaf, Comfrey',
    careInstructions: 'Steep like tea in hot water and pour into warm sitz bath or tub.',
    rating: 4.9,
    reviewCount: 22,
    featured: false,
    bestSeller: false,
    newArrival: true,
    active: true
  },
  {
    name: 'Silky Bamboo Motherhood Loungewear Robe',
    slug: 'silky-bamboo-motherhood-loungewear-robe',
    shortDescription: 'Luxuriously soft, breathable bamboo robe with easy nursing access and deep pockets.',
    description: 'Designed to wrap new mothers in pure cloud-like softness. Features an adjustable waistband, kimono sleeve cut, and ultra-gentle breathable bamboo viscose fabric.',
    price: 7800,
    discountPrice: 6900,
    categorySlug: 'mom-care',
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 12,
    sku: 'BC-LR-104',
    brand: 'Butterfly Care Mama',
    ageGroup: 'Adult',
    sizes: ['S/M', 'L/XL', '2XL'],
    colors: ['Rose Dust', 'Warm Oat', 'Misty Sage'],
    materials: '95% Bamboo Rayon, 5% Elastane',
    careInstructions: 'Machine wash delicate cold in laundry bag. Line dry in shade.',
    rating: 5.0,
    reviewCount: 27,
    featured: true,
    bestSeller: true,
    newArrival: true,
    active: true
  },

  // 3. Feeding & Nursing
  {
    name: 'Ergonomic Memory Foam Nursing Pillow',
    slug: 'ergonomic-memory-foam-nursing-pillow',
    shortDescription: 'Contoured lumbar support with removable washable organic cotton cover.',
    description: 'Engineered in collaboration with lactation specialists to eliminate strain on mom’s neck, shoulders, and arms. Delivers optimal elevation for baby during breastfeeding and bottle-feeding.',
    price: 6850,
    discountPrice: 5900,
    categorySlug: 'feeding-nursing',
    images: [
      'https://images.unsplash.com/photo-1594824813689-53b6923c6f09?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 16,
    sku: 'BC-NP-201',
    brand: 'Butterfly Care Cozy',
    ageGroup: '0-12 months',
    sizes: ['Standard'],
    colors: ['Dusty Blush', 'Soft Sand', 'Warm Taupe'],
    materials: 'Hypoallergenic Memory Foam, 100% GOTS Cotton Slipcover',
    careInstructions: 'Slipcover is machine washable at 40°C.',
    rating: 4.9,
    reviewCount: 35,
    featured: true,
    bestSeller: true,
    newArrival: false,
    active: true
  },
  {
    name: 'Anti-Colic Borosilicate Glass Feeding Bottle (Set of 2)',
    slug: 'anti-colic-borosilicate-glass-feeding-bottle-set',
    shortDescription: 'Thermal shock resistant glass with breast-like silicone slow-flow teats.',
    description: 'Made from pure pharmaceutical-grade borosilicate glass that resists temperature shocks and will never absorb odors or stains. Advanced 360-degree anti-colic ventilation system minimizes gas and fussiness.',
    price: 5200,
    discountPrice: 4600,
    categorySlug: 'feeding-nursing',
    images: [
      'https://images.unsplash.com/photo-1594824813689-53b6923c6f09?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 22,
    sku: 'BC-FB-202',
    brand: 'Butterfly Care Pure',
    ageGroup: '0-6 months',
    sizes: ['150ml (Pair)', '240ml (Pair)'],
    colors: ['Clear / Blush Ring', 'Clear / Oat Ring'],
    materials: 'High Borosilicate Glass & Food Grade Liquid Silicone Teats',
    careInstructions: 'Sterilize in boiling water or electric steam sterilizer.',
    rating: 4.8,
    reviewCount: 18,
    featured: false,
    bestSeller: true,
    newArrival: false,
    active: true
  },
  {
    name: 'Food-Grade Silicone Suction Weaning Bowl & Spoon Set',
    slug: 'silicone-suction-weaning-bowl-spoon-set',
    shortDescription: 'Powerful suction base prevents spills; includes soft wooden handle silicone spoon.',
    description: 'Make starting solids fun and mess-free. Features an extra-strong suction base that secures firmly onto highchair trays, curved spill-proof rims, and gentle soft spoon tips.',
    price: 3200,
    discountPrice: 2750,
    categorySlug: 'feeding-nursing',
    images: [
      'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 30,
    sku: 'BC-SB-203',
    brand: 'Butterfly Care Little',
    ageGroup: '4-36 months',
    sizes: ['Standard 350ml'],
    colors: ['Blush Rose', 'Warm Honey', 'Muted Olive'],
    materials: '100% Food-Grade Platinum Cured Silicone, Natural Beechwood',
    careInstructions: 'Dishwasher and microwave safe (except wooden spoon handle).',
    rating: 4.9,
    reviewCount: 46,
    featured: false,
    bestSeller: false,
    newArrival: true,
    active: true
  },
  {
    name: 'Organic Muslin 3-in-1 Nursing Cover & Stroller Canopy',
    slug: 'organic-muslin-nursing-cover-stroller-canopy',
    shortDescription: 'Breathable full-coverage nursing shawl with open neckline arch to see baby.',
    description: 'Offers 360-degree privacy and airflow while nursing in public. The rigid open neckline allows direct eye contact with your baby while keeping air circulating freely.',
    price: 3450,
    discountPrice: 2990,
    categorySlug: 'feeding-nursing',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 19,
    sku: 'BC-NC-204',
    brand: 'Butterfly Care Cozy',
    ageGroup: 'All Nursing Moms',
    sizes: ['One Size (Universal)'],
    colors: ['Petal Floral', 'Oatmeal Stripe', 'Solid Rose Dust'],
    materials: '100% Pre-washed Organic Muslin Cotton',
    careInstructions: 'Machine wash cold with like colors.',
    rating: 4.7,
    reviewCount: 14,
    featured: false,
    bestSeller: false,
    newArrival: false,
    active: true
  },

  // 4. Sleep & Snuggle
  {
    name: '4-Layer Organic Muslin Dream Swaddle Blanket (Pack of 3)',
    slug: '4-layer-organic-muslin-dream-swaddle-blanket-pack',
    shortDescription: 'Silky pre-washed 120x120cm muslin swaddles that get softer with every wash.',
    description: 'Wrap your newborn in pure cloud-like security. Perfectly sized for traditional swaddling, nursing privacy, tummy time, or a cozy stroller cover. Generous 120cm x 120cm size.',
    price: 5400,
    discountPrice: 4700,
    categorySlug: 'sleep-snuggle',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 25,
    sku: 'BC-SW-301',
    brand: 'Butterfly Care Cozy',
    ageGroup: '0-12 months',
    sizes: ['120cm x 120cm'],
    colors: ['Pastel Butterfly Trio', 'Earthy Neutrals', 'Warm Rose & Cream'],
    materials: '100% GOTS Certified Organic Muslin Cotton',
    careInstructions: 'Machine wash delicate. Tumble dry low or air dry.',
    rating: 5.0,
    reviewCount: 62,
    featured: true,
    bestSeller: true,
    newArrival: false,
    active: true
  },
  {
    name: 'Breathable 1.0 TOG Organic Cotton Baby Sleep Bag',
    slug: 'breathable-1-tog-organic-cotton-baby-sleep-bag',
    shortDescription: 'Safe sleep wearable blanket with two-way zipper for effortless midnight changes.',
    description: 'Eliminates loose crib blankets to promote certified safe infant sleep. Features a bell-shaped bottom for healthy hip development and a two-way safety zipper.',
    price: 4900,
    discountPrice: 4300,
    categorySlug: 'sleep-snuggle',
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 17,
    sku: 'BC-SB-302',
    brand: 'Butterfly Care Cozy',
    ageGroup: '0-6m, 6-18m, 18-36m',
    sizes: ['0-6 Months', '6-18 Months', '18-36 Months'],
    colors: ['Rose Dust', 'Butter Cream', 'Misty Taupe'],
    materials: '100% Organic Jersey Cotton Outer & Lining',
    careInstructions: 'Zip closed before washing. Machine wash cold.',
    rating: 4.9,
    reviewCount: 28,
    featured: true,
    bestSeller: false,
    newArrival: true,
    active: true
  },
  {
    name: 'Heirloom Woven Cotton Cable-Knit Baby Blanket',
    slug: 'heirloom-woven-cotton-cable-knit-baby-blanket',
    shortDescription: 'Timeless vintage knit blanket, impeccably soft and weight-balanced for crib & stroller.',
    description: 'A luxurious heirloom keepsake made from ultra-fine combed cotton yarn. Heavy enough to provide comforting security yet delightfully breathable and skin-safe.',
    price: 6200,
    discountPrice: 5400,
    categorySlug: 'sleep-snuggle',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 14,
    sku: 'BC-KB-303',
    brand: 'Butterfly Care Cozy',
    ageGroup: '0+ months',
    sizes: ['100cm x 80cm'],
    colors: ['Vintage Cream', 'Blush Petal', 'Warm Sandstone'],
    materials: '100% Premium Combed Cotton',
    careInstructions: 'Hand wash or gentle wool cycle. Dry flat.',
    rating: 5.0,
    reviewCount: 33,
    featured: false,
    bestSeller: true,
    newArrival: false,
    active: true
  },

  // 5. Bath & Care
  {
    name: 'Organic Bamboo Hooded Baby Bath Towel & Washcloth Set',
    slug: 'organic-bamboo-hooded-baby-bath-towel-washcloth-set',
    shortDescription: '500 GSM ultra-absorbent silky bamboo terry with charming bear-ear hood.',
    description: 'Three times more absorbent than standard cotton! Keeps baby warm, snug, and instantly dry straight from the bath. Includes a matching gentle face washcloth.',
    price: 4400,
    discountPrice: 3800,
    categorySlug: 'bath-care',
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 21,
    sku: 'BC-HT-401',
    brand: 'Butterfly Care Pure',
    ageGroup: '0-36 months',
    sizes: ['90cm x 90cm'],
    colors: ['Oatmeal Cream', 'Soft Rose', 'Pure White'],
    materials: '70% Organic Bamboo Rayon, 30% Natural Cotton (500 GSM)',
    careInstructions: 'Machine wash warm with like colors. Do not use bleach.',
    rating: 4.9,
    reviewCount: 47,
    featured: true,
    bestSeller: true,
    newArrival: false,
    active: true
  },
  {
    name: 'Natural Konjac Baby Bath Sponge & Soft Bristle Goat Brush',
    slug: 'natural-konjac-baby-sponge-goat-brush-set',
    shortDescription: '100% natural root sponge and ultra-soft goat hair wooden brush for cradle cap.',
    description: 'The gentlest bath and grooming combo for newborns. The 100% pure konjac sponge softens in water to pamper delicate folds, while the natural goat hair brush gently distributes scalp oils.',
    price: 2600,
    discountPrice: 2150,
    categorySlug: 'bath-care',
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 32,
    sku: 'BC-GB-402',
    brand: 'Butterfly Care Pure',
    ageGroup: '0+ months',
    sizes: ['Set of 2'],
    colors: ['Natural Beechwood / Ivory'],
    materials: 'Natural Goat Hair, FSC Beechwood, Pure Konjac Root Fiber',
    careInstructions: 'Rinse sponge after use and hang to dry.',
    rating: 4.8,
    reviewCount: 16,
    featured: false,
    bestSeller: false,
    newArrival: true,
    active: true
  },
  {
    name: 'Floating Water Thermometer & Rinse Cup Kit',
    slug: 'floating-water-thermometer-rinse-cup-kit',
    shortDescription: 'Digital color-changing accurate bath thermometer with tear-free water pourer.',
    description: 'Ensure bath water is always at the safe ideal temperature (37°C / 98.6°F) with instant digital readout and visual color alerts. Accompanied by a soft rubber-edged rinse cup.',
    price: 3100,
    discountPrice: 2650,
    categorySlug: 'bath-care',
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 18,
    sku: 'BC-TH-403',
    brand: 'Butterfly Care Little',
    ageGroup: '0+ months',
    sizes: ['Standard'],
    colors: ['Pastel Sage', 'Dusty Rose'],
    materials: 'BPA-Free Safe ABS & Silicone',
    careInstructions: 'Wipe dry after each bath session.',
    rating: 4.7,
    reviewCount: 12,
    featured: false,
    bestSeller: false,
    newArrival: false,
    active: true
  },

  // 6. Clothing
  {
    name: 'Organic Ribbed Cotton Zip Footie Romper',
    slug: 'organic-ribbed-cotton-zip-footie-romper',
    shortDescription: 'Buttery-soft ribbed knit with fold-over scratch mitts and two-way zipper.',
    description: 'The quintessential everyday essential. Made from stretchy, ultra-soft GOTS certified ribbed organic cotton that moves gracefully with your baby. Includes fold-over mitts for newborn sizes.',
    price: 3600,
    discountPrice: 3150,
    categorySlug: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 26,
    sku: 'BC-FR-501',
    brand: 'Butterfly Care Little',
    ageGroup: '0-3m, 3-6m, 6-12m, 12-18m',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M'],
    colors: ['Blush Rose', 'Warm Oat', 'Misty Taupe', 'Terracotta'],
    materials: '95% GOTS Organic Cotton, 5% Elastane',
    careInstructions: 'Turn inside out, machine wash gentle cold. Tumble dry low.',
    rating: 5.0,
    reviewCount: 51,
    featured: true,
    bestSeller: true,
    newArrival: true,
    active: true
  },
  {
    name: 'Cozy Waffle Knit Kimono Top & Pant Lounge Set',
    slug: 'cozy-waffle-knit-kimono-top-pant-lounge-set',
    shortDescription: 'Gentle crossover wrap style with snap buttons for easy belly button care.',
    description: 'Designed specifically for newborn umbilical cord comfort. The wrap-around front design means no pulling over sensitive little heads, while the soft elastic waist pant stays comfortably in place.',
    price: 4200,
    discountPrice: 3650,
    categorySlug: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 19,
    sku: 'BC-KS-502',
    brand: 'Butterfly Care Little',
    ageGroup: '0-3m, 3-6m, 6-12m',
    sizes: ['0-3M', '3-6M', '6-12M'],
    colors: ['Oatmeal Heather', 'Dusty Peach', 'Sage Mist'],
    materials: '100% Breathable Organic Waffle Cotton',
    careInstructions: 'Machine wash cold. Low heat iron if needed.',
    rating: 4.9,
    reviewCount: 24,
    featured: true,
    bestSeller: false,
    newArrival: true,
    active: true
  },
  {
    name: 'Hand-Knitted Merino Wool Baby Cardigan & Bonnet Set',
    slug: 'hand-knitted-merino-wool-baby-cardigan-bonnet-set',
    shortDescription: 'Artisanal heirloom knit with natural coconut shell buttons and matching bonnet.',
    description: 'A breathtakingly elegant gift set. Handcrafted using 100% ultra-fine non-scratchy Australian Merino wool that naturally regulates baby’s body temperature throughout all seasons.',
    price: 6900,
    discountPrice: 5950,
    categorySlug: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 8,
    sku: 'BC-WC-503',
    brand: 'Butterfly Care Artisan',
    ageGroup: '0-6m, 6-12m',
    sizes: ['0-6M', '6-12M'],
    colors: ['Creamy Ivory', 'Rose Dawn', 'Soft Biscuit'],
    materials: '100% Extra-fine Merino Wool, Natural Coconut Buttons',
    careInstructions: 'Hand wash gently in lukewarm water. Lay flat on dry towel.',
    rating: 5.0,
    reviewCount: 39,
    featured: false,
    bestSeller: true,
    newArrival: false,
    active: true
  },

  // 7. Toys & Gifts
  {
    name: 'Natural Beechwood & Silicone Teething Rattle Toy',
    slug: 'natural-beechwood-silicone-teething-rattle-toy',
    shortDescription: 'Smooth sanded organic beechwood rings with BPA-free textured silicone beads.',
    description: 'Soothes aching teething gums while stimulating fine motor grasping skills. Made from smooth, splinter-free untreated organic beechwood conditioned with organic coconut oil.',
    price: 2450,
    discountPrice: 1990,
    categorySlug: 'toys-gifts',
    images: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 35,
    sku: 'BC-TR-601',
    brand: 'Butterfly Care Little',
    ageGroup: '3+ months',
    sizes: ['Standard'],
    colors: ['Blush & Sand', 'Sage & Cream', 'Dusty Terracotta'],
    materials: 'Natural FSC Beechwood & 100% Food-Grade Silicone',
    careInstructions: 'Wipe with damp cloth and mild baby soap. Do not submerge wood in water.',
    rating: 4.9,
    reviewCount: 41,
    featured: true,
    bestSeller: true,
    newArrival: false,
    active: true
  },
  {
    name: 'Organic Cotton Heirloom Cuddle Bunny Plushie',
    slug: 'organic-cotton-heirloom-cuddle-bunny-plushie',
    shortDescription: 'Super-soft hand-stitched bunny friend with embroidered eyes, safe for newborns.',
    description: 'The sweetest first companion for your little one. Hand-stitched with love using 100% organic knit cotton and hypoallergenic corn-fiber filling. No buttons or plastic parts.',
    price: 3800,
    discountPrice: 3200,
    categorySlug: 'toys-gifts',
    images: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 22,
    sku: 'BC-BP-602',
    brand: 'Butterfly Care Little',
    ageGroup: '0+ months',
    sizes: ['30cm Height'],
    colors: ['Oatmeal Bunny', 'Rose Petal Bunny', 'Soft Grey Bunny'],
    materials: '100% Organic Cotton Shell, Hypoallergenic Plant Filling',
    careInstructions: 'Hand wash cold or gentle machine wash in laundry bag.',
    rating: 5.0,
    reviewCount: 30,
    featured: true,
    bestSeller: false,
    newArrival: true,
    active: true
  },
  {
    name: 'Luxury New Mama & Welcome Baby Keepsake Gift Box',
    slug: 'luxury-new-mama-welcome-baby-keepsake-gift-box',
    shortDescription: 'Pre-packaged gift box with Muslin Swaddle, Teether, Belly Oil, Baby Wash & Card.',
    description: 'The ultimate baby shower or homecoming present. Thoughtfully curated with our highest-rated essentials for both mom and baby, packaged inside an embossed gold-foil keepsake box with handwritten card option.',
    price: 14500,
    discountPrice: 12900,
    categorySlug: 'toys-gifts',
    images: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 10,
    sku: 'BC-GB-603',
    brand: 'Butterfly Care Signature',
    ageGroup: 'Newborn & Mother',
    sizes: ['Deluxe Curated Box'],
    colors: ['Signature Rose & Cream'],
    materials: 'Luxury Keepsake Gift Box + 5 Premium Products',
    careInstructions: 'Includes detailed care instructions for each item inside.',
    rating: 5.0,
    reviewCount: 26,
    featured: true,
    bestSeller: true,
    newArrival: false,
    active: true
  },

  // 8. Baby Essentials
  {
    name: 'Waterproof Vegan Leather Diaper Backpack & Changing Station',
    slug: 'waterproof-vegan-leather-diaper-backpack',
    shortDescription: 'Spacious 14-pocket travel backpack with insulated bottle slots and fold-out mat.',
    description: 'Style meets parenthood utility. Crafted from premium wipe-clean vegan leather with gold-tone hardware, padded ergonomic shoulder straps, stroller clips, and an insulated 3-bottle front pocket.',
    price: 11500,
    discountPrice: 9800,
    categorySlug: 'baby-essentials',
    images: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 15,
    sku: 'BC-DB-701',
    brand: 'Butterfly Care Signature',
    ageGroup: 'Parents',
    sizes: ['42cm x 30cm x 20cm'],
    colors: ['Caramel Tan', 'Rose Dust', 'Classic Espresso'],
    materials: 'Waterproof Eco Vegan Leather, Gold Alloy Metal Hardware',
    careInstructions: 'Wipe clean with damp cloth.',
    rating: 4.9,
    reviewCount: 37,
    featured: true,
    bestSeller: true,
    newArrival: false,
    active: true
  },
  {
    name: 'Portable Wipe-Clean Padded Diaper Changing Clutch',
    slug: 'portable-wipe-clean-padded-changing-clutch',
    shortDescription: 'Foldable compact changing pad with built-in pillow and wipe dispenser pocket.',
    description: 'Makes on-the-go diaper changes hygienic, clean, and comfortable anywhere. Folds effortlessly into an elegant clutch with wrist strap.',
    price: 3600,
    discountPrice: 2990,
    categorySlug: 'baby-essentials',
    images: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 24,
    sku: 'BC-CP-702',
    brand: 'Butterfly Care Little',
    ageGroup: '0-24 months',
    sizes: ['Compact Foldable'],
    colors: ['Warm Taupe Quilted', 'Dusty Rose Pattern'],
    materials: 'Water-resistant Oxford Polyester & Sponge Cushioning',
    careInstructions: 'Wipe down with alcohol-free sanitizing wipes.',
    rating: 4.8,
    reviewCount: 19,
    featured: false,
    bestSeller: false,
    newArrival: true,
    active: true
  },
  {
    name: 'Ultra-Soft Bamboo Dry & Wet Diaper Wipes (Pack of 6)',
    slug: 'ultra-soft-bamboo-dry-wet-diaper-wipes-pack',
    shortDescription: '99.9% purified water wipes with organic aloe vera and chamomile extract.',
    description: '100% biodegradable bamboo fiber wipes, completely fragrance-free and formulated for newborn skin that is prone to eczema and sensitivities.',
    price: 2900,
    discountPrice: 2450,
    categorySlug: 'baby-essentials',
    images: [
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 45,
    sku: 'BC-BW-703',
    brand: 'Butterfly Care Pure',
    ageGroup: '0+ months',
    sizes: ['6 Packs (480 Wipes Total)'],
    colors: ['Natural'],
    materials: '100% Biodegradable Bamboo Fiber, Purified Water (99.9%)',
    careInstructions: 'Reseal flip top firmly after each use.',
    rating: 4.9,
    reviewCount: 58,
    featured: false,
    bestSeller: true,
    newArrival: false,
    active: true
  }
];

export const INITIAL_REVIEWS = [
  {
    productSku: 'BC-BW-001',
    userName: 'Dilani Perera',
    userEmail: 'dilani.p@gmail.com',
    rating: 5,
    title: 'Pure magic for my baby’s sensitive skin!',
    comment: 'I was hesitant to try new products on my 2-month-old daughter who had mild eczema, but this wash is exceptionally gentle. Soft subtle fragrance and zero redness!',
    verifiedPurchase: true,
    status: 'approved'
  },
  {
    productSku: 'BC-MO-101',
    userName: 'Kavindi Jayawardena',
    userEmail: 'kavindi.j@yahoo.com',
    rating: 5,
    title: 'Must-have for every expecting mother',
    comment: 'Used this belly oil throughout my entire second pregnancy and not a single new stretch mark appeared. Smells like a luxury spa and absorbs so quickly.',
    verifiedPurchase: true,
    status: 'approved'
  },
  {
    productSku: 'BC-SW-301',
    userName: 'Sarah Fernando',
    userEmail: 'sarah.f@outlook.com',
    rating: 5,
    title: 'Incredible quality and gorgeous packaging',
    comment: 'These muslin swaddles are hands down the softest we own in Sri Lanka. They wash beautifully without shrinking and the butterfly motif is so lovely.',
    verifiedPurchase: true,
    status: 'approved'
  },
  {
    productSku: 'BC-NP-201',
    userName: 'Thilini Senanayake',
    userEmail: 'thilini.s@gmail.com',
    rating: 5,
    title: 'Saved my posture during breastfeeding',
    comment: 'The memory foam support makes such a massive difference compared to regular soft pillows. Delivery to Kandy took only 2 days. Highly recommended!',
    verifiedPurchase: true,
    status: 'approved'
  },
  {
    productSku: 'BC-FR-501',
    userName: 'Anushka De Silva',
    userEmail: 'anushka.ds@gmail.com',
    rating: 5,
    title: 'The two-way zipper is a lifesaver at night',
    comment: 'The organic ribbed cotton feels like butter! Midnight diaper changes are so seamless now without waking my baby completely. Ordering more colors today.',
    verifiedPurchase: true,
    status: 'approved'
  },
  {
    productSku: 'BC-GB-603',
    userName: 'Rochelle Mendis',
    userEmail: 'rochelle.m@gmail.com',
    rating: 5,
    title: 'Brought tears of joy at the baby shower',
    comment: 'Sent this gift box to my sister in Colombo. The presentation was royal and the quality of each item inside is top tier. Butterfly Care is my new go-to brand.',
    verifiedPurchase: true,
    status: 'approved'
  }
];

export const INITIAL_COUPONS = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 3000,
    maxDiscount: 1500,
    usageLimit: 500,
    usedCount: 14,
    active: true
  },
  {
    code: 'MOMCARE500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 5000,
    usageLimit: 200,
    usedCount: 8,
    active: true
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 450,
    minOrderValue: 4000,
    usageLimit: 300,
    usedCount: 19,
    active: true
  }
];

export const INITIAL_USERS = [
  {
    name: 'Butterfly Admin',
    email: 'admin@butterflycare.com',
    password: 'Admin@123456',
    role: 'admin',
    phone: '+94771234567',
    addresses: [
      {
        fullName: 'Butterfly Care Admin HQ',
        phone: '+94771234567',
        addressLine: '42 Lotus Avenue',
        city: 'Colombo',
        district: 'Colombo',
        postalCode: '00700',
        isDefault: true
      }
    ]
  },
  {
    name: 'Dilani Perera',
    email: 'dilani.p@gmail.com',
    password: 'Customer@123',
    role: 'customer',
    phone: '+94712345678',
    addresses: [
      {
        fullName: 'Dilani Perera',
        phone: '+94712345678',
        addressLine: '15/3 Flower Road',
        city: 'Colombo 03',
        district: 'Colombo',
        postalCode: '00300',
        isDefault: true
      }
    ]
  },
  {
    name: 'Kavindi Jayawardena',
    email: 'kavindi.j@yahoo.com',
    password: 'Customer@123',
    role: 'customer',
    phone: '+94772345679',
    addresses: [
      {
        fullName: 'Kavindi Jayawardena',
        phone: '+94772345679',
        addressLine: '88 Negombo Road',
        city: 'Wattala',
        district: 'Gampaha',
        postalCode: '11300',
        isDefault: true
      }
    ]
  }
];
