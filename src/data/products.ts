import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'nutella-lava',
    name: 'Nutella Lava Cookie Dough',
    category: 'dough',
    pricePkr: 750,
    priceUsd: 4.50,
    weightGrams: 250,
    tagline: 'Warm molten core brimming with pure hazelnut cocoa decadence.',
    description: 'Served piping hot in our cast-iron dish with a crackled golden caramelized top. Cracked open to reveal a steaming river of 60% hazelnut cocoa cream pooling onto warm ceramic.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkaH1IzcGN5RoHnL8s5M0QBeIIvFZxpsABSKi2hbBAw4SwImxblV43vkbIXPFY2KyUShfYb9e_JpSpA-nWfldwaPJOTGxFp6mMf1kRNOB62L8SkAcHaE1YcqfTJNDPaxUW2JCaPMQZPkOKivIJq31PJ0sv7rSE4aY_nHbnIRyi-sIgXO7BNekogGQEhqv_Q6qAWYhzkLuKSTofT5CCh5lEtTwfyn5RKNkU3pSThamBSc2SNVB45yG3cw',
    badge: 'Bestseller',
    subBadge: 'Skillet Baked',
    cacaoPercentage: 65,
    sensoryProfile: {
      moltenFluidity: 98,
      hazelnutDensity: 92,
      edgeCrunch: 85,
      richness: 96,
    },
    tastingNotes: {
      aroma: 'Toasted Piedmont hazelnuts, caramelized brown sugar, dark vanilla bean',
      texture: 'Crisp caramelized outer perimeter with steaming molten velvety core',
      pairings: ['Madagascar Vanilla Bean Gelato', 'Cold Brew Espresso', 'Full-cream Oat Flat White'],
      originNote: 'Single-estate Belgian cocoa butter blend with roasted Mediterranean hazelnuts'
    },
    ingredients: ['Grass-fed creamery butter', 'Organic brown sugar', 'Hazelnut cocoa cream', 'Unbleached wheat flour', 'Farm-fresh eggs', 'Flaky sea salt'],
    allergens: ['Dairy', 'Eggs', 'Tree Nuts (Hazelnuts)', 'Gluten'],
    bakingSpec: 'Fired at 180°C for exactly 9 minutes'
  },
  {
    id: 'lotus-cookie',
    name: 'Lotus Cookie',
    category: 'cookies',
    pricePkr: 680,
    priceUsd: 4.20,
    weightGrams: 165,
    tagline: 'Caramelized Biscoff spread encased in golden spiced crumble crust.',
    description: 'Crisp rough edges crowned with melted speculoos spread drizzle and fine crushed cinnamon biscuit crumb, enveloping a flowing warm caramelized centre.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLsZA0MEy3-dwu7R9TK7ZTiUZnhD-SL4JcsWTV2qSaygXKGxGCr5uAgSKigrKbKgFpXOhYXgmZxg5i4YXrtFzniPzK-w1NvTLcUf0Feqjgu-oN_LmnIhmWTk51vvkqXp6E03qoWfb_a6KVnFezBC4IDF_-IxalA4-BsHxrfJqUynZHB0FrL55T1OD13xkHOa4CGQDfXBd-i5f8meQUsneGa67iPyq-vLmdLjVJygVhuNV6uAxwv10a0A',
    badge: 'Spiced',
    subBadge: 'Signature Crust',
    cacaoPercentage: 45,
    sensoryProfile: {
      moltenFluidity: 84,
      hazelnutDensity: 70,
      edgeCrunch: 92,
      richness: 88,
    },
    tastingNotes: {
      aroma: 'Ceylon cinnamon, brown butter, roasted wheat, burnt sugar caramel',
      texture: 'Crunchy biscuit crumble exterior yielding to gooey speculoos butter',
      pairings: ['Cardamom Chai Latte', 'Earl Grey Tea', 'Affogato'],
      originNote: 'Belgian speculoos spice blend with slow-rendered French churned butter'
    },
    ingredients: ['Grass-fed butter', 'Biscoff speculoos cream', 'Crushed speculoos biscuits', 'Dark brown sugar', 'Cinnamon', 'Sea salt'],
    allergens: ['Dairy', 'Gluten', 'Soy'],
    bakingSpec: 'Baked at 180°C in small 12-piece rotations'
  },
  {
    id: 'classic-crumb-dough',
    name: 'Classic Crumb Dough',
    category: 'dough',
    pricePkr: 720,
    priceUsd: 4.30,
    weightGrams: 250,
    tagline: 'Velvety vanilla dough loaded with 70% dark Belgian chunks and Maldon sea salt.',
    description: 'Baked in our rustic dark skillet until the vanilla butter dough bubbles at the perimeter while remaining intensely chewy and molten at the heart.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUN_EsUAG8mTgMobkwQNbt4Q14b8M-Kd8UCS0ecse9APY-cN9ARboPgMviybXl8PXfkn7Ml8g8GDUjfDt9f63ao26d43BW88jKJgnQBJLyN6EdsRqdCAKRbpn7LKwGH2NyfqfUs9M2-aiUfTYf9i6udjdbkfpBy9IW69rChkz4mdxsfSlAStJp6eb0Y_Vejs1XK2Dk5p5sqPgQAqjBfiSoIORHBPl9EPIsY0utsMt0pnr-BC9Uzzwz7w',
    badge: 'Original',
    subBadge: 'Cast-Iron Cast',
    cacaoPercentage: 70,
    sensoryProfile: {
      moltenFluidity: 90,
      hazelnutDensity: 60,
      edgeCrunch: 88,
      richness: 94,
    },
    tastingNotes: {
      aroma: 'Rich Bourbon vanilla, toasted toffee, bittersweet molten chocolate',
      texture: 'Chewy dough lattice with deep pools of melting dark couverture',
      pairings: ['Cold Whole Milk', 'Pistachio Gelato', 'Double Espresso'],
      originNote: 'Belgian Callebaut 70% dark chocolate callets with hand-harvested Maldon flakes'
    },
    ingredients: ['Pure creamery butter', '70% Belgian dark chocolate', 'Madagascar vanilla', 'Brown sugar', 'Maldon sea salt'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    bakingSpec: 'Cast-iron baked to order at 180°C'
  },
  {
    id: 'triple-madness-dough',
    name: 'Triple Madness Dough',
    category: 'dough',
    pricePkr: 790,
    priceUsd: 4.80,
    weightGrams: 250,
    tagline: 'Trio of milk, dark, and white Belgian chocolate in molten synergy.',
    description: 'Glossy swirls of ivory white chocolate, milk cocoa, and deep dark chocolate ganache marbling across bubbling dough, crowned with roasted cacao nibs.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ9Hs0JDRYpzySEZxfnNTHaK3WX68g_NMbMCXkowkdMIGoOlIJHBjAy-bMsuW8f17yl2g8nzRMYIa3kT4DDP_XG_sUAAj0iP3zG-mv_I60SyxTd-hxtIG5sfnBEHIyYyL4OSYsjHdjzatQdGY43CLBjSKxKQn6DSiaUZVDXoUZDNtfrngPh2FtrQBw5Lz-t95wx_bWySSBB_psADBxdcGDPndkkFiPqOnjtaq5qz2_raRISppTkOfdjA',
    badge: 'Chef Select',
    subBadge: 'Triple Cocoa',
    cacaoPercentage: 72,
    sensoryProfile: {
      moltenFluidity: 95,
      hazelnutDensity: 65,
      edgeCrunch: 82,
      richness: 98,
    },
    tastingNotes: {
      aroma: 'Milk caramel, roasted cacao, subtle floral notes of pure cocoa butter',
      texture: 'Triple-density swirl with cascading liquid chocolate textures',
      pairings: ['Salted Caramel Latte', 'Single Malt Cocoa Brew'],
      originNote: 'Ecuadorian dark chocolate, Swiss milk chocolate, and Belgian white chocolate'
    },
    ingredients: ['Butter', 'Dark cocoa', 'White chocolate', 'Milk chocolate', 'Roasted cacao nibs', 'Flour'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Soy'],
    bakingSpec: 'Baked fresh to order in single pans'
  },
  {
    id: 'double-chocolate-cookie',
    name: 'Double Chocolate Cookie',
    category: 'cookies',
    pricePkr: 690,
    priceUsd: 4.20,
    weightGrams: 170,
    tagline: 'Intense Dutch cocoa base generously stuffed with flowing ganache.',
    description: 'Thick midnight-dark cookie split in half to reveal a dark fudge core dripping onto linen, accented with chocolate shavings and raw cocoa powder dusting.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA00C6LkyZn6slL-p2S43n5L5trRF-Pdvp_pxj9Mo8FM_yqhUR7G_1N61X8tgxjzBpW4T1AP2n-46JtrS5pCsXCIjAsoplCrxid3Xdi3r-CG8VoMketTmOkrXhLUA4AYw9cR_AxRYxc5m4CaPUw3O5hc_i5_MM-tw-gVwO5YsFkQP-gYyIb8DNyqn-Qfytxk91yTuou5S5NbPvc79BCHQPPEouSbNPHMZGaCH9hhcf0wc6Sl_b6ShYow',
    badge: 'Extra Dark',
    subBadge: '70% Dark',
    cacaoPercentage: 74,
    sensoryProfile: {
      moltenFluidity: 88,
      hazelnutDensity: 50,
      edgeCrunch: 86,
      richness: 95,
    },
    tastingNotes: {
      aroma: 'Roasted coffee bean, intense Dutch cocoa, dark berry undertones',
      texture: 'Truffle-like fudgy center encased in crisp chocolate crust',
      pairings: ['Cappuccino', 'Warm Oat Milk', 'Raspberry Sorbet'],
      originNote: 'Dutch alkalized black cocoa with 74% single-origin Venezuelan chocolate'
    },
    ingredients: ['Dutch cocoa powder', 'Dark chocolate ganache', 'Pure butter', 'Brown sugar', 'Flaky salt'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    bakingSpec: 'Precision timed bake to preserve soft truffle center'
  },
  {
    id: 'red-velvet-cookie',
    name: 'Red Velvet Cookie',
    category: 'cookies',
    pricePkr: 720,
    priceUsd: 4.40,
    weightGrams: 165,
    tagline: 'Vibrant crimson dough swirled with silky artisanal cream cheese lava.',
    description: 'Deep ruby-red velvet thick cookie oozing rich white Philadelphia cream cheese frosting from its center onto a minimal warm ceramic tray.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMVCZzPBC0VPlyX1c9ui8helWGM2YcNUDC5xZcoqmGz8qjGEh6Bp6xYEDTQ0SU1tlwfHVonYA5-YC9wSG33h2QMC-LDqMn177eR5mf-KKstZsUfL4IHQJywQ1rY7A2tTNpQOpE7pavO6KNda6Ce7Iq915s7P59ha4FT7aGJ2qxQ-Kp0pBzWY1tGIgzFTJvEWGYKtyBt7pcqPe73rGG6Bd6Dt6m9kASmDPPOj9kbMopsaePs75mpMWqew',
    badge: 'Velvet Core',
    subBadge: 'Cream Cheese',
    cacaoPercentage: 40,
    sensoryProfile: {
      moltenFluidity: 86,
      hazelnutDensity: 40,
      edgeCrunch: 84,
      richness: 91,
    },
    tastingNotes: {
      aroma: 'Sweet cream, tangy cultured dairy, delicate cocoa, vanilla bean',
      texture: 'Velvety cake-like crumb with smooth tart cream cheese flow',
      pairings: ['Matcha Latte', 'Iced Americano', 'Vanilla Shake'],
      originNote: 'Cultured cream cheese pocket encased in light Dutch cocoa dough'
    },
    ingredients: ['Cream cheese core', 'Unbleached flour', 'Cultured butter', 'Natural beet extraction', 'Pure vanilla'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    bakingSpec: 'Continuous rotation bake at 175°C'
  },
  {
    id: 'oreo-cookie',
    name: 'Oreo Cookie',
    category: 'cookies',
    pricePkr: 690,
    priceUsd: 4.20,
    weightGrams: 160,
    tagline: 'Crushed black cookie pieces whipped into sweet cream white chocolate.',
    description: 'Thick cookies and cream masterpiece embedded with dark wafer biscuits, folded with white chocolate chunks and a fluffy vanilla fondant filling.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwoNEGSI74XyWiDMGIH5r-n3tljZfZN6UKPpf68HzqbUrTfqhzYjIyjG8-gk4-Kb2raMQIcU4-R3GwcTx0M5t9DYYnyNY9cUDAH3B8JrltUTGy5TWVgZ9EaB_uKoX-Xfby226zrFR0Nsq_L5yBG6EKeea9Y4_-gMwZtDyX4eLpjAaQYKtgEanQbgzjxtcjBmjqQU_GiJ2D--OE0YgKuUjETKsvXW9BMdilG9VsZJ-bzniQL0C1YOwjWA',
    badge: 'Cookies & Cream',
    subBadge: 'Sweet & Creamy',
    cacaoPercentage: 50,
    sensoryProfile: {
      moltenFluidity: 82,
      hazelnutDensity: 45,
      edgeCrunch: 90,
      richness: 89,
    },
    tastingNotes: {
      aroma: 'Black cocoa crunch, sweet condensed milk, bourbon vanilla',
      texture: 'Dual texture: crunchy wafer bites suspended in chewy butter cookie',
      pairings: ['Cold Whole Milk', 'Iced Mocha', 'Hazelnut Latte'],
      originNote: 'Artisanal Oreo crumble with Belgian ivory cocoa butter callets'
    },
    ingredients: ['Dark cocoa biscuits', 'Belgian white chocolate', 'Butter', 'Flour', 'Vanilla fondant'],
    allergens: ['Dairy', 'Gluten', 'Soy', 'Eggs'],
    bakingSpec: 'Baked fresh every 2 hours'
  },
  {
    id: 'fudge-brownie',
    name: 'Fudge Loaded Brownie',
    category: 'brownies',
    pricePkr: 650,
    priceUsd: 4.00,
    weightGrams: 180,
    tagline: 'Dense fudgy dark chocolate square topped with paper-thin crinkly crust.',
    description: 'Mouthwatering glossy crinkly topped dark chocolate fudge brownie square, dense and moist, revealing gooey chocolate pockets sprinkled with sea salt crystals.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn2qJ-4hoBSNycutSOUUa1Hcgl4ki9LY_WwU5bkkAow-fOJbSaeevUOuIvdzjeqMU8yiHy-ilewV_9VLTZ-VFy04RkyfaDvDMXHOmN-8UwzGQXLqrzJQcPpbvf-t695NOI1grWedxI2OhIXOEJ6iM7OJs7H_jOr-V4Ju_eNyhZ9LwQVk9KLOz1yaJZN7UIJqaGVG7C1Yh-1GKm2_MPxdAeSBDac8VCjIzNa-vyL6mGmzgH5Up8Ogvl5w',
    badge: 'Ultra Dense',
    subBadge: 'Double Baked',
    cacaoPercentage: 72,
    sensoryProfile: {
      moltenFluidity: 80,
      hazelnutDensity: 60,
      edgeCrunch: 75,
      richness: 99,
    },
    tastingNotes: {
      aroma: 'Intense roasted dark cacao, molten fudge, caramelized butter',
      texture: 'Glossy paper-thin crust giving way to super dense, fudgy decadence',
      pairings: ['Warm Salted Caramel Sauce', 'Vanilla Bean Gelato', 'Black Pour-over'],
      originNote: 'Belgian 72% dark chocolate couverture with pure European cultured butter'
    },
    ingredients: ['72% Belgian dark chocolate', 'Cultured butter', 'Cane sugar', 'Dutch cocoa', 'Eggs', 'Flaky salt'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    bakingSpec: 'Slow double-baked for maximum moisture retention'
  },
  {
    id: 'salted-caramel-cookie',
    name: 'Salted Caramel Toffee Cookie',
    category: 'cookies',
    pricePkr: 710,
    priceUsd: 4.30,
    weightGrams: 170,
    tagline: 'Amber burnt sugar caramel drizzle, house toffee shards, and pink Himalayan crystals.',
    description: 'Golden vanilla dough ribboned with slow-cooked amber caramel and crunchy brittle toffee chunks that melt into butterscotch pockets during baking.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApkVSkDk6a49mVGmjoSKy3kdx10ctedIGBmDs2lMyQzirI8Bx_fNWzbiL8ejKkmpKJlZoVQxBm500E1mCTHSKJm_BjSzyxLqbn28T_4zwqq2uIdqMY-0D9oHvGm1wPUl8ADVMtmLv32o5qclXigMOmpLyPRSD1NYmSpKTdZkc4y3fpnBc0uXPiNB_Wf99YpWpl2G5S25IqBmLRblixTjGrh-mER0EJgxt3pBmsSwm6fWbxsa4Zt7KHwA',
    badge: 'Caramelized',
    subBadge: 'House Toffee',
    cacaoPercentage: 55,
    sensoryProfile: {
      moltenFluidity: 87,
      hazelnutDensity: 55,
      edgeCrunch: 89,
      richness: 93,
    },
    tastingNotes: {
      aroma: 'Burnt caramel, toasted butter, brown sugar toffee',
      texture: 'Chewy center with crisp caramel glass shards and gooey pockets',
      pairings: ['Caramel Macchiato', 'Pecan Gelato', 'Espresso Tonic'],
      originNote: 'House-made small batch copper kettle caramel with Himalayan pink rock salt'
    },
    ingredients: ['Slow cooked caramel', 'Butter toffee', 'Dark chocolate chunks', 'Flour', 'Butter', 'Salt'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    bakingSpec: 'Fired at 180°C until caramelized to amber gold'
  },
  {
    id: 'lotus-biscoff-pan',
    name: 'Lotus Biscoff Cast Pan',
    category: 'dough',
    pricePkr: 760,
    priceUsd: 4.60,
    weightGrams: 250,
    tagline: 'Gooey spiced speculoos dough with molten Lotus core and caramel crumbs.',
    description: 'Hot cast iron skillet packed with golden cinnamon spiced cookie dough with a thick reservoir of molten Biscoff spread that stretches when lifted.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBMrX4j2eNl51cth9OltmFQLgV_ASZn7LVy75v7gTmbDCRL0Di6w4qy_oBcbeUB56blKfXMRQJD7GinW8UtAX6pCFOkO6zsayt7dGpXFyi0ojqNJHX0KcPvBYEx-rCjnCNKDbvVDzHRLU03B_WKCCfbaZRBtYdbKC5b02kkLpgZA9KHAFTD8ir9Hx7qPdaqg6GaTwRJWh_d9OUoPKfp8UUi9ZrFqTHB6GIax70clsZJ6CiMOIr_XP85g',
    badge: 'Skillet Favorite',
    subBadge: 'Speculoos Core',
    cacaoPercentage: 45,
    sensoryProfile: {
      moltenFluidity: 94,
      hazelnutDensity: 65,
      edgeCrunch: 85,
      richness: 92,
    },
    tastingNotes: {
      aroma: 'Speculoos spices, warm golden syrup, sweet dough',
      texture: 'Hot bubbling edges with flowing golden spiced caramel center',
      pairings: ['Vanilla Gelato', 'Chai Latte', 'Iced Cinnamon Cappuccino'],
      originNote: 'Imported Belgian Biscoff spread folded into brown sugar butter base'
    },
    ingredients: ['Lotus Biscoff', 'Butter', 'Brown sugar', 'Cinnamon', 'Flour', 'Eggs'],
    allergens: ['Dairy', 'Gluten', 'Soy', 'Eggs'],
    bakingSpec: 'Baked fresh in 250g cast-iron dish'
  },
  {
    id: 'nutella-swirl-brownie',
    name: 'Nutella Swirl Brownie',
    category: 'brownies',
    pricePkr: 690,
    priceUsd: 4.20,
    weightGrams: 190,
    tagline: 'Fudge brownie infused with thick ribbons of roasted hazelnut Nutella swirl.',
    description: 'Dense dark chocolate base swirled with thick molten rivers of roasted hazelnut Nutella, cut cleanly with glistening fudgy crumbs.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArcLPm8rTjfzYtgetbLl3q-KMwPbOYRPGgQ0ER-Fwl0VTzdpksEDTx7w-MnoccXUU_yujTgL-rwhHHLzcKPzh-z1oZaYW3PsRl0botd_8h_sKZNlsGdhYo9R5_pLrhuwFCnrYkX5qx0XrzLYZqPsgxxIxkA--ujm9PYfgtba0VUFQTjjevZqmNPrVGUHcr9Y8Abl8ddLV8UD0a6vz53JAiS3rDKN2IQWzRvxw4rkswoUy45-2c-lke3Q',
    badge: 'Molten Ribbon',
    subBadge: 'Hazelnut Infused',
    cacaoPercentage: 70,
    sensoryProfile: {
      moltenFluidity: 85,
      hazelnutDensity: 88,
      edgeCrunch: 78,
      richness: 97,
    },
    tastingNotes: {
      aroma: 'Nutella, roasted nuts, Dutch cocoa, melted butter',
      texture: 'Fudgy and chewy with ribbons of gooey hazelnut cream',
      pairings: ['Oat Flat White', 'Vanilla Ice Cream', 'Iced Latte'],
      originNote: 'Double-swirled artisan Nutella in 70% dark chocolate batter'
    },
    ingredients: ['Dark chocolate', 'Nutella', 'Butter', 'Sugar', 'Flour', 'Eggs'],
    allergens: ['Dairy', 'Gluten', 'Tree Nuts', 'Eggs'],
    bakingSpec: 'Double baked and rested for 45 minutes'
  },
  {
    id: 'skillet-gelato-duet',
    name: 'The Skillet & Gelato Duet',
    category: 'combos',
    pricePkr: 950,
    priceUsd: 5.80,
    weightGrams: 350,
    tagline: 'Any warm Cookie Dough Skillet served with a tub of artisanal Madagascar Vanilla.',
    description: 'The ultimate hot-cold contrast. Freshly baked skillet bubbling from the oven, crowned by you with silky vanilla bean gelato that melts into the molten crater.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqhdq4jlopOWHx4L19TwKCEIgR6tgk3zWeuUbYiKW7JRmHwOI5X0WM8ATUwa_1Ldgw2V8GbcrAD3uzW9vCrY1owcKbwwsoZY6-Ku-gDmocpkwYWpknF_ETSwx_fMGR19f6WjrGSEVHUWQiv3Vy4fYBOUFvulerfJKxmy1b19sk9IMLJBuYIV-X5EgSMXsOfq4iW-fDYT34A3TMPQR2EZaUDkx5VcXpD4mc_U6VUlK42G7cuGsX238Z6Q',
    badge: 'Hot & Cold Signature',
    subBadge: 'Curated Duet',
    cacaoPercentage: 68,
    sensoryProfile: {
      moltenFluidity: 99,
      hazelnutDensity: 85,
      edgeCrunch: 88,
      richness: 98,
    },
    tastingNotes: {
      aroma: 'Cold sweet cream contrast with bubbling roasted cocoa butter',
      texture: 'Simultaneous contrast of piping hot crisp dough and ice-cold cream',
      pairings: ['Warm Salted Caramel drizzle', 'Double Shot Espresso'],
      originNote: 'Madagascar vanilla pod churned gelato with bespoke skillet bake'
    },
    ingredients: ['Cookie dough skillet', 'Madagascar vanilla gelato', 'Cream', 'Milk', 'Chocolate'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Tree Nuts (optional)'],
    bakingSpec: 'Dispatched in thermal insulated container alongside deep-frozen gelato'
  },
  {
    id: 'atelier-box-six',
    name: 'The Atelier Box of Six',
    category: 'combos',
    pricePkr: 3850,
    priceUsd: 22.50,
    weightGrams: 990,
    tagline: 'Curate any six signature heavyweight cookies in our luxury embossed gift carton.',
    description: 'Presented in our signature deep-chocolate embossed gift box tied with raw textured linen ribbon. Includes custom parchment wraps and tasting guide cards.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ4vhdVeuzLKM0rIFwVpfj1WTvcurNWS2N_yUZjA_vJo4_xJEZsEHHuO16DP73z3LHwwYg8bpHm7q6IpdMIhb_ZVnvTEASvEjQcWqX5itKyOgSsfDOJBsJBjuSl5wvUmpdkrlQk5YabhQHHhZlRoegkHipEkNUbGp-djygrsXsiNaYJDNAnVSOt-sIlb9XCF-Rp_J6knYuCXZMjsEu_xldKf5lnQ4AJ9TvsK4OcUM8i1SWGCGUIthsuw',
    badge: 'Bespoke Box',
    subBadge: 'Luxury Packaging',
    cacaoPercentage: 65,
    sensoryProfile: {
      moltenFluidity: 90,
      hazelnutDensity: 80,
      edgeCrunch: 88,
      richness: 95,
    },
    tastingNotes: {
      aroma: 'Complex bouquet of fresh bakery confections, cocoa, and spiced butter',
      texture: 'Six distinct textural experiences from molten lava to crisp snap',
      pairings: ['Artisan Coffee Roasts', 'Dessert Wines', 'Family Gatherings'],
      originNote: 'Hand-packed in insulated boutique packaging'
    },
    ingredients: ['Assorted chef selection of 6 gourmet cookies'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Tree Nuts (Hazelnuts)'],
    bakingSpec: 'Baked in synchronized batch for immediate dispatch'
  }
];

export const BRAND_STORY = {
  headline: "MORE THAN A COOKIE.",
  quote: "We don't bake for restraint. We bake for the pure joy of breaking open something truly decadent.",
  pillars: [
    {
      num: "01",
      title: "Small Batch Precision",
      desc: "Never frozen. Batches are prepared in deliberate 24-piece rotations every two hours, ensuring edge crispness and an authentic molten heart at every order time.",
      tag: "Continuous Oven Regimen"
    },
    {
      num: "02",
      title: "Single-Origin Cocoa",
      desc: "We partner exclusively with sustainable Belgian cacao producers. Selected for nuanced roast depth, velvety fluidity, and balanced bitter sweetness that cuts through rich butter.",
      tag: "70% Belgian Couverture"
    },
    {
      num: "03",
      title: "Generous Indulgence",
      desc: "We believe in overflowing centers and heavyweight confections. We do not skimp on hazelnut spreads, rich creams, or pure butter dough weight. Every cookie weighs over 160 grams.",
      tag: "Heavyweight Formulation"
    }
  ],
  stats: [
    { value: "180°C", label: "Exact Bake Heat" },
    { value: "160g+", label: "Average Weight" },
    { value: "100%", label: "Grass-Fed Butter" },
    { value: "0%", label: "Preservatives or Premixes" }
  ]
};
