export const mockProducts = [
    {
      id: 1,
      name: "Florence Velvet Sofa",
      slug: "florence-velvet-sofa",
      price: 45000,
      salePrice: null,
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800",
      ],
      category: "living-room",
      subcategory: "sofas",
      description: "Luxurious 3-seater velvet sofa with solid hardwood frame. Perfect for modern living spaces.",
      specifications: {
        dimensions: "210cm (W) × 90cm (D) × 85cm (H)",
        material: "Premium velvet upholstery",
        color: "Navy Blue",
        weight: "45kg",
        frame: "Solid hardwood",
        assembly: "Minimal assembly required"
      },
      tags: ["modern", "velvet", "3-seater", "luxury"],
      stock: 5,
      featured: true,
      bestSeller: true,
      newArrival: false
    },
    {
      id: 2,
      name: "Milan Dining Table",
      slug: "milan-dining-table",
      price: 38000,
      salePrice: 32000,
      images: [
        "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800",
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800",
      ],
      category: "dining-room",
      subcategory: "tables",
      description: "Elegant solid wood dining table seats 6 comfortably. Timeless design for family gatherings.",
      specifications: {
        dimensions: "180cm (L) × 90cm (W) × 75cm (H)",
        material: "Solid oak wood",
        color: "Natural Oak",
        weight: "55kg",
        seating: "6 persons",
        assembly: "Easy assembly"
      },
      tags: ["dining", "oak", "6-seater", "classic"],
      stock: 3,
      featured: true,
      bestSeller: true,
      newArrival: false
    },
    {
      id: 3,
      name: "Copenhagen Office Chair",
      slug: "copenhagen-office-chair",
      price: 18000,
      salePrice: null,
      images: [
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800",
        "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800",
      ],
      category: "office",
      subcategory: "chairs",
      description: "Ergonomic office chair with lumbar support. Perfect for long working hours.",
      specifications: {
        dimensions: "60cm (W) × 60cm (D) × 110cm (H)",
        material: "Mesh back, foam cushion",
        color: "Black",
        weight: "12kg",
        features: "Adjustable height, tilt mechanism",
        assembly: "Minimal assembly"
      },
      tags: ["office", "ergonomic", "mesh", "adjustable"],
      stock: 12,
      featured: false,
      bestSeller: true,
      newArrival: false
    },
    {
      id: 4,
      name: "Modern Platform Bed",
      slug: "modern-platform-bed",
      price: 52000,
      salePrice: null,
      images: [
        "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      ],
      category: "bedroom",
      subcategory: "beds",
      description: "Low-profile platform bed with upholstered headboard. Queen size.",
      specifications: {
        dimensions: "160cm (W) × 200cm (L) × 110cm (H)",
        material: "Upholstered fabric, solid wood",
        color: "Light Grey",
        weight: "65kg",
        size: "Queen (160×200cm)",
        assembly: "Assembly required"
      },
      tags: ["bedroom", "queen", "upholstered", "modern"],
      stock: 4,
      featured: true,
      bestSeller: false,
      newArrival: true
    },
    {
      id: 5,
      name: "Minimalist Coffee Table",
      slug: "minimalist-coffee-table",
      price: 15000,
      salePrice: null,
      images: [
        "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800",
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800",
      ],
      category: "living-room",
      subcategory: "tables",
      description: "Clean-lined coffee table with lower shelf. Perfect for small spaces.",
      specifications: {
        dimensions: "100cm (L) × 60cm (W) × 40cm (H)",
        material: "Engineered wood, metal legs",
        color: "Walnut Brown",
        weight: "18kg",
        features: "Lower storage shelf",
        assembly: "Easy assembly"
      },
      tags: ["living-room", "minimalist", "storage", "small-space"],
      stock: 8,
      featured: false,
      bestSeller: false,
      newArrival: true
    },
    {
      id: 6,
      name: "Scandinavian Bookshelf",
      slug: "scandinavian-bookshelf",
      price: 22000,
      salePrice: 19000,
      images: [
        "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800",
        "https://images.unsplash.com/photo-1595428773960-5c994b9feeb2?w=800",
      ],
      category: "office",
      subcategory: "storage",
      description: "5-tier open bookshelf with clean Scandinavian design. Multiple finish options.",
      specifications: {
        dimensions: "80cm (W) × 30cm (D) × 180cm (H)",
        material: "Solid pine wood",
        color: "White",
        weight: "25kg",
        shelves: "5 adjustable shelves",
        assembly: "Assembly required"
      },
      tags: ["office", "scandinavian", "storage", "bookshelf"],
      stock: 6,
      featured: false,
      bestSeller: false,
      newArrival: true
    },
    {
      id: 7,
      name: "Outdoor Lounge Set",
      slug: "outdoor-lounge-set",
      price: 85000,
      salePrice: null,
      images: [
        "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      ],
      category: "outdoor",
      subcategory: "sets",
      description: "Weather-resistant outdoor lounge set. Includes 2 chairs, sofa, and coffee table.",
      specifications: {
        dimensions: "Various (4-piece set)",
        material: "Rattan, weatherproof cushions",
        color: "Natural Rattan",
        weight: "80kg (total)",
        includes: "2 chairs, 1 sofa, 1 table",
        assembly: "Minimal assembly"
      },
      tags: ["outdoor", "rattan", "set", "weather-resistant"],
      stock: 2,
      featured: true,
      bestSeller: false,
      newArrival: true
    },
    {
      id: 8,
      name: "Industrial Bar Stools",
      slug: "industrial-bar-stools",
      price: 12000,
      salePrice: null,
      images: [
        "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800",
        "https://images.unsplash.com/photo-1578991624414-276ef23a534f?w=800",
      ],
      category: "dining-room",
      subcategory: "stools",
      description: "Set of 2 industrial-style bar stools with adjustable height. Metal and wood construction.",
      specifications: {
        dimensions: "40cm (W) × 40cm (D) × 75-95cm (H)",
        material: "Metal frame, wood seat",
        color: "Black Metal, Natural Wood",
        weight: "8kg each",
        features: "Adjustable height, footrest",
        quantity: "Set of 2"
      },
      tags: ["dining", "bar-stools", "industrial", "adjustable"],
      stock: 10,
      featured: false,
      bestSeller: true,
      newArrival: false
    },
    {
      id: 9,
      name: "Classic Wardrobe",
      slug: "classic-wardrobe",
      price: 68000,
      salePrice: 58000,
      images: [
        "https://images.unsplash.com/photo-1595428773960-61883e43097b?w=800",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      ],
      category: "bedroom",
      subcategory: "storage",
      description: "Spacious 3-door wardrobe with hanging space and shelves. Solid construction.",
      specifications: {
        dimensions: "150cm (W) × 60cm (D) × 200cm (H)",
        material: "Solid wood, glass mirror",
        color: "Dark Walnut",
        weight: "90kg",
        features: "2 hanging rods, 4 shelves, mirror",
        assembly: "Professional assembly recommended"
      },
      tags: ["bedroom", "wardrobe", "storage", "classic"],
      stock: 3,
      featured: false,
      bestSeller: false,
      newArrival: false
    },
    {
      id: 10,
      name: "Decorative Wall Mirror",
      slug: "decorative-wall-mirror",
      price: 8500,
      salePrice: null,
      images: [
        "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800",
        "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800",
      ],
      category: "decor",
      subcategory: "mirrors",
      description: "Round decorative mirror with gold metal frame. Perfect accent piece.",
      specifications: {
        dimensions: "80cm diameter",
        material: "Glass, metal frame",
        color: "Gold Frame",
        weight: "4kg",
        features: "Wall-mounted, hanging hardware included",
        style: "Modern Glam"
      },
      tags: ["decor", "mirror", "gold", "accent"],
      stock: 15,
      featured: false,
      bestSeller: true,
      newArrival: false
    },
    {
      id: 11,
      name: "Velvet Accent Chair",
      slug: "velvet-accent-chair",
      price: 28000,
      salePrice: null,
      images: [
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      ],
      category: "living-room",
      subcategory: "chairs",
      description: "Elegant velvet accent chair with gold legs. Statement piece for any room.",
      specifications: {
        dimensions: "75cm (W) × 80cm (D) × 90cm (H)",
        material: "Velvet upholstery, metal legs",
        color: "Emerald Green",
        weight: "18kg",
        features: "Deep cushioning, gold legs",
        assembly: "Legs attach easily"
      },
      tags: ["living-room", "accent", "velvet", "luxury"],
      stock: 7,
      featured: true,
      bestSeller: false,
      newArrival: true
    },
    {
      id: 12,
      name: "Minimalist Desk",
      slug: "minimalist-desk",
      price: 25000,
      salePrice: null,
      images: [
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800",
      ],
      category: "office",
      subcategory: "desks",
      description: "Clean-lined work desk with cable management. Perfect for home office.",
      specifications: {
        dimensions: "120cm (L) × 60cm (W) × 75cm (H)",
        material: "Engineered wood, metal legs",
        color: "White Top, Black Legs",
        weight: "22kg",
        features: "Cable management, spacious surface",
        assembly: "Easy assembly"
      },
      tags: ["office", "desk", "minimalist", "work-from-home"],
      stock: 9,
      featured: false,
      bestSeller: true,
      newArrival: false
    }
  ];
  
  // Helper functions to filter products
  export const getFeaturedProducts = () => {
    return mockProducts.filter(product => product.featured);
  };
  
  export const getBestSellers = () => {
    return mockProducts.filter(product => product.bestSeller);
  };
  
  export const getNewArrivals = () => {
    return mockProducts.filter(product => product.newArrival);
  };
  
  export const getProductsByCategory = (category) => {
    return mockProducts.filter(product => product.category === category);
  };
  
  export const getProductBySlug = (slug) => {
    return mockProducts.find(product => product.slug === slug);
  };