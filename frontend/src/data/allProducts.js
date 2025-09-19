// All products data for Sweet Bites e-commerce application

// Raw product data (aligned with FilterSidebar)
const rawProducts = [
  {
    name: "Kaju Katli",
    category: "Premium Sweets",
    type: "Traditional",
    sweetType: "mithai",
    collections: "Dryfruit Collection",
    price: 450,
    originalPrice: 500,
    discount: 10,
    description: "Premium cashew fudge made with pure cashews and silver leaf.",
    longDescription: "Our signature Kaju Katli is crafted using the finest cashews sourced directly from Kerala...",
    images: [
      { url: "/images/kaju-katli.jpg", altText: "Kaju Katli" },
      { url: "/images/kaju-katli-2.jpg", altText: "Kaju Katli Close-up" }
    ],
    availability: true,
    stock: 50,
    weight: "250g",
    weights: ["250g", "500g", "1kg"],
    ingredients: ["Cashews", "Sugar", "Ghee", "Cardamom", "Silver Leaf"],
    tags: ["premium", "traditional", "festival", "gift"],
    rating: 4.8,
    reviewCount: 156
  },
  {
    name: "Rasgulla",
    category: "Rajbhog",
    type: "Traditional",
    sweetType: "bengali",
    collections: "Bengali Classics",
    price: 280,
    originalPrice: 320,
    discount: 12.5,
    description: "Soft and spongy cottage cheese balls soaked in sugar syrup.",
    longDescription: "Our authentic Bengali Rasgulla is made from fresh chenna (cottage cheese)...",
    images: [
      { url: "/images/rasgulla.jpg", altText: "Rasgulla" },
      { url: "/images/rasgulla-2.jpg", altText: "Rasgulla in syrup" }
    ],
    availability: true,
    stock: 75,
    weight: "500g",
    weights: ["250g", "500g", "1kg"],
    ingredients: ["Fresh Milk", "Sugar", "Cardamom", "Rose Water"],
    tags: ["bengali", "traditional", "soft", "festival"],
    rating: 4.6,
    reviewCount: 89
  },
  {
    name: "Gulab Jamun",
    category: "Rajbhog",
    type: "Traditional",
    sweetType: "classic",
    collections: "Festival Specials",
    price: 300,
    originalPrice: 330,
    discount: 9,
    description: "Deep-fried milk solid dumplings soaked in rose-flavored sugar syrup.",
    longDescription: "Our signature Gulab Jamuns are made from fresh khoya (milk solids)...",
    images: [
      { url: "/images/gulab-jamun.jpg", altText: "Gulab Jamun" },
      { url: "/images/gulab-jamun-2.jpg", altText: "Gulab Jamun with syrup" }
    ],
    availability: true,
    stock: 60,
    weight: "500g",
    weights: ["250g", "500g", "1kg"],
    ingredients: ["Khoya", "Sugar", "Rose Water", "Cardamom", "Flour"],
    tags: ["classic", "celebration", "warm", "traditional"],
    rating: 4.9,
    reviewCount: 203
  },
  {
    name: "Motichoor Ladoo",
    category: "Rajbhog",
    type: "Special",
    sweetType: "ladoo",
    collections: "Festival Specials",
    price: 360,
    originalPrice: 400,
    discount: 10,
    description: "Tiny gram flour pearls fried and bound together with sugar syrup.",
    longDescription: "Our authentic Motichoor Ladoos are made from fine gram flour pearls (boondi)...",
    images: [
      { url: "/images/motichoor-ladoo.jpg", altText: "Motichoor Ladoo" },
      { url: "/images/motichoor-ladoo-2.jpg", altText: "Motichoor Ladoo Close-up" }
    ],
    availability: true,
    stock: 45,
    weight: "400g",
    weights: ["200g", "400g", "800g"],
    ingredients: ["Gram Flour", "Sugar", "Ghee", "Cardamom", "Almonds", "Pistachios"],
    tags: ["traditional", "festival", "celebration", "handmade"],
    rating: 4.7,
    reviewCount: 134
  },
  {
    name: "Coconut Ladoo",
    category: "Rajbhog",
    type: "Traditional",
    sweetType: "ladoo",
    collections: "Milk Sweets",
    price: 290,
    originalPrice: 320,
    discount: 9.4,
    description: "Fresh coconut based ladoos with cardamom and condensed milk.",
    longDescription: "Made with freshly grated coconut, condensed milk, and a touch of cardamom...",
    images: [
      { url: "/images/coconut-ladoo.jpg", altText: "Coconut Ladoo" },
      { url: "/images/coconut-ladoo-2.jpg", altText: "Coconut Ladoo with garnish" }
    ],
    availability: true,
    stock: 55,
    weight: "350g",
    weights: ["200g", "350g", "700g"],
    ingredients: ["Fresh Coconut", "Condensed Milk", "Sugar", "Cardamom", "Ghee"],
    tags: ["coconut", "fresh", "light", "homemade"],
    rating: 4.5,
    reviewCount: 87
  },
  {
    name: "Kaju Barfi",
    category: "Premium Sweets",
    type: "Special",
    sweetType: "barfi",
    collections: "Dryfruit Collection",
    price: 480,
    originalPrice: 520,
    discount: 7.7,
    description: "Rich cashew fudge squares with cardamom and silver leaf.",
    longDescription: "Premium Kaju Barfi made from finest quality cashews...",
    images: [
      { url: "/images/kaju-barfi.jpg", altText: "Kaju Barfi" },
      { url: "/images/kaju-barfi-2.jpg", altText: "Kaju Barfi with silver leaf" }
    ],
    availability: true,
    stock: 35,
    weight: "250g",
    weights: ["250g", "500g", "1kg"],
    ingredients: ["Premium Cashews", "Sugar", "Ghee", "Cardamom Powder"],
    tags: ["premium", "gift", "festival", "royal"],
    rating: 4.9,
    reviewCount: 187
  }
];

// ✅ Add auto-generated IDs
export const allProducts = rawProducts.map((product, index) => ({
  id: `product-${index + 1}`,
  ...product,
}));

// Helper functions
export const getProductById = (id) => allProducts.find((p) => p.id === id);
export const getProductsByCategory = (category) =>
  allProducts.filter(
    (p) => p.category === category || p.sweetType === category
  );
export const getFeaturedProducts = (limit = 6) =>
  allProducts
    .filter((p) => p.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);

export default allProducts;
