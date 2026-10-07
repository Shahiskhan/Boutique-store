// src/data/products.js

// Product names — category wise
const productNames = {
  Clothing: [
    "Silk Evening Dress", "Linen Summer Shirt", "Wool Winter Coat",
    "Pleated Midi Skirt", "Cashmere Sweater", "Cotton Blouse",
    "Denim Jacket", "Floral Maxi Dress", "Knit Cardigan",
    "Satin Slip Dress", "Trench Coat", "Velvet Blazer",
    "Chiffon Wrap Dress", "Ribbed Turtleneck", "A-Line Skirt",
    "Boho Sundress", "Tailored Trousers", "Off-Shoulder Top",
    "Wrap Midi Dress", "Lace Blouse"
  ],
  Bags: [
    "Leather Handbag", "Canvas Tote Bag", "Crossbody Purse",
    "Mini Shoulder Bag", "Leather Clutch", "Woven Straw Bag",
    "Bucket Bag", "Saddle Bag", "Quilted Chain Bag",
    "Belt Bag", "Hobo Bag", "Box Bag",
    "Weekender Duffel", "Card Holder", "Laptop Tote",
    "Evening Clutch", "Backpack Purse", "Baguette Bag",
    "Drawstring Bag", "Camera Bag"
  ],
  Accessories: [
    "Pearl Necklace", "Silk Scarf", "Gold Hoop Earrings",
    "Leather Belt", "Statement Ring", "Layered Chain Necklace",
    "Hair Claw Clip", "Silk Hairband", "Pearl Stud Earrings",
    "Bangle Set", "Anklet Chain", "Brooch Pin",
    "Sunglasses", "Wrist Watch", "Choker Necklace",
    "Drop Earrings", "Cuff Bracelet", "Hair Pin Set",
    "Pendant Necklace", "Charm Bracelet"
  ],
  Footwear: [
    "Strappy Heels", "Leather Ankle Boots", "Ballet Flats",
    "Block Heel Sandals", "White Sneakers", "Kitten Heels",
    "Combat Boots", "Espadrilles", "Mule Shoes",
    "Platform Sandals", "Loafers", "Pointed Toe Pumps",
    "Slingback Heels", "Chelsea Boots", "Slide Sandals",
    "Wedge Sandals", "Oxford Shoes", "Peep Toe Heels",
    "Running Shoes", "Mary Jane Flats"
  ]
}

// Unsplash image IDs — category wise
const imageIds = {
  Clothing: [
    "1595777457583-95e059d581b8", "1596755094514-f87e34085b2c",
    "1539533018447-63fcce2678e3", "1583496661160-fb5886a0aaaa",
    "1576566588028-4147f3842f27", "1564257631407-4deb1f99d992",
    "1551028719-00167b16eac5", "1572804013309-59a88b7e92f1",
    "1434389677669-e08b4cac3105", "1490481651871-ab68de25d43d",
    "1469334031218-e382a71b716b", "1483985988355-763728e1935b",
    "1515886657613-9f3515b0c78f", "1529139574466-a303027c1d8b",
    "1502716119720-b23a93e5fe1b"
  ],
  Bags: [
    "1584917865442-de89df76afd3", "1544816155-12df9643f363",
    "1590874103328-eac38a683ce7", "1594223274512-ad4803739b7c",
    "1566150905458-1bf1fc113f0d", "1591561954557-26941169b49e",
    "1584917865442-de89df76afd3", "1606522754091-a3bbf9ad4cb3",
    "1612902456551-333ac5afa26e", "1592507678155-3e59c1c1e1e1"
  ],
  Accessories: [
    "1599643478518-a784e5dc4c8f", "1601924994987-69e26d50dc26",
    "1535632066927-ab7c9ab60908", "1611591437281-460bfbe1220a",
    "1573408301185-9146fe634ad0", "1621072156002-e2fccdc0b176",
    "1515562141207-7a88fb7ce338", "1602173574767-37ac01994b2a",
    "1596944924616-7b38e7cfac36", "1589128777073-263566ae5e4d"
  ],
  Footwear: [
    "1543163521-1bf539c55dd2", "1608256246200-53e635b5b65f",
    "1560769629-975ec94e6a86", "1549298916-b41d501d3772",
    "1595950653106-6c9ebd614d3a", "1603487742131-4160ec999306",
    "1584735175315-9d5df23be620", "1600269452121-4f2416e55c28",
    "1608231387042-66d1773070a5", "1562183241-b937e95585b6"
  ]
}

// Badges
const badges = ["New Arrival", "Sale", "Bestseller", null, null, null]

// Categories
const categoriesList = ["Clothing", "Bags", "Accessories", "Footwear"]

// Helper — random number
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// Helper — random item from array
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]

// Generate 200 products
export const products = Array.from({ length: 200 }, (_, index) => {
  const id = index + 1
  const category = randomItem(categoriesList)
  const name = randomItem(productNames[category])
  const basePrice = randomBetween(30, 250)
  const hasDiscount = Math.random() > 0.5
  const oldPrice = hasDiscount ? Math.round(basePrice * (1 + randomBetween(20, 60) / 100)) : null

  return {
    id,
    name: `${name} ${id}`,  // Unique naam ke liye ID add ki
    price: basePrice,
    oldPrice,
    category,
    image: `https://images.unsplash.com/photo-${randomItem(imageIds[category])}?w=600&auto=format&fit=crop`,
    description: `Premium ${category.toLowerCase()} piece crafted with care for the modern woman.`,
    badge: randomItem(badges),
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),  // 3.5 - 5.0
    reviews: randomBetween(5, 100),
    inStock: Math.random() > 0.1  // 90% in stock
  }
})

// Categories nikalne ke liye
export const categories = ["All", ...new Set(products.map(p => p.category))]