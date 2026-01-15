import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import Product from './src/models/Product.js';

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});

    const products = [
      {
        name: 'Midnight Elixir',
        description: 'A sophisticated blend of dark florals and woody notes that evokes elegance and mystery.',
        price: 89.99,
        originalPrice: 129.99,
        category: 'perfume',
        brand: 'Luxe Fragrance',
        images: [
          'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1615634260444-d1ecf76afc42?w=500&h=500&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&h=500&fit=crop',
        stock: 50,
        rating: 4.5,
        reviewCount: 23,
        volume: '100ml',
        concentration: 'Eau de Parfum',
        gender: 'unisex',
        longevity: 'excellent',
        sillage: 'strong',
        sizes: ['50ml', '100ml', '200ml'],
        scent: {
          top: ['Bergamot', 'Black Pepper'],
          middle: ['Rose', 'Jasmine'],
          base: ['Sandalwood', 'Musk'],
        },
        ingredients: ['Alcohol Denat.', 'Aqua', 'Fragrance'],
        featured: true,
      },
      {
        name: 'Citrus Dream',
        description: 'A refreshing citrus fragrance perfect for daytime wear with bright and energetic notes.',
        price: 59.99,
        originalPrice: null,
        category: 'cologne',
        brand: 'Fresh Scents',
        images: [
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
        stock: 75,
        rating: 4.2,
        reviewCount: 18,
        volume: '75ml',
        concentration: 'Eau de Toilette',
        gender: 'masculine',
        longevity: 'moderate',
        sillage: 'moderate',
        sizes: ['50ml', '75ml', '150ml'],
        scent: {
          top: ['Lemon', 'Orange', 'Grapefruit'],
          middle: ['Neroli', 'Petitgrain'],
          base: ['Cedar', 'Vetiver'],
        },
        ingredients: ['Alcohol Denat.', 'Aqua', 'Fragrance'],
        featured: true,
      },
      {
        name: 'Rose Garden',
        description: 'A classic floral fragrance that celebrates the beauty of fresh roses in full bloom.',
        price: 74.99,
        originalPrice: 99.99,
        category: 'perfume',
        brand: 'Classic Flowers',
        images: [
          'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
        stock: 40,
        rating: 4.7,
        reviewCount: 34,
        volume: '100ml',
        concentration: 'Eau de Parfum',
        gender: 'feminine',
        longevity: 'good',
        sillage: 'strong',
        sizes: ['50ml', '100ml', '200ml'],
        scent: {
          top: ['Bergamot', 'Lemon'],
          middle: ['Rose', 'Peony', 'Geranium'],
          base: ['Musk', 'Sandalwood'],
        },
        ingredients: ['Alcohol Denat.', 'Aqua', 'Fragrance'],
        featured: true,
      },
      {
        name: 'Ocean Breeze',
        description: 'A crisp aquatic fragrance that captures the essence of a fresh ocean breeze.',
        price: 54.99,
        originalPrice: null,
        category: 'cologne',
        brand: 'Aqua Scents',
        images: [
          'https://images.unsplash.com/photo-1617638924702-92bde7bab60d?w=500&h=500&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1617638924702-92bde7bab60d?w=500&h=500&fit=crop',
        stock: 60,
        rating: 4.3,
        reviewCount: 21,
        volume: '75ml',
        concentration: 'Eau de Toilette',
        gender: 'unisex',
        longevity: 'moderate',
        sillage: 'moderate',
        sizes: ['50ml', '75ml', '150ml'],
        scent: {
          top: ['Sea Salt', 'Watermelon'],
          middle: ['Aquatic Notes'],
          base: ['Driftwood', 'Ambroxan'],
        },
        ingredients: ['Alcohol Denat.', 'Aqua', 'Fragrance'],
        featured: false,
      },
      {
        name: 'Vanilla Bliss',
        description: 'A warm and comforting fragrance with creamy vanilla and gourmand notes.',
        price: 64.99,
        originalPrice: 89.99,
        category: 'fragrance',
        brand: 'Sweet Dreams',
        images: [
          'https://images.unsplash.com/photo-1610000969868-b447b6b1a940?w=500&h=500&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1610000969868-b447b6b1a940?w=500&h=500&fit=crop',
        stock: 45,
        rating: 4.6,
        reviewCount: 27,
        volume: '100ml',
        concentration: 'Eau de Parfum',
        gender: 'feminine',
        longevity: 'good',
        sillage: 'moderate',
        sizes: ['50ml', '100ml', '200ml'],
        scent: {
          top: ['Tonka Bean', 'Cinnamon'],
          middle: ['Vanilla', 'Caramel'],
          base: ['Sandalwood', 'Amber'],
        },
        ingredients: ['Alcohol Denat.', 'Aqua', 'Fragrance'],
        featured: false,
      },
      {
        name: 'Spice Market',
        description: 'An exotic blend of warm spices that transport you to bustling Eastern markets.',
        price: 79.99,
        originalPrice: null,
        category: 'perfume',
        brand: 'Exotic Blend',
        images: [
          'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=500&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=500&fit=crop',
        stock: 55,
        rating: 4.4,
        reviewCount: 19,
        volume: '100ml',
        concentration: 'Eau de Parfum',
        gender: 'unisex',
        longevity: 'excellent',
        sillage: 'strong',
        sizes: ['50ml', '100ml', '200ml'],
        scent: {
          top: ['Cardamom', 'Black Pepper'],
          middle: ['Clove', 'Cinnamon', 'Saffron'],
          base: ['Oud', 'Amber'],
        },
        ingredients: ['Alcohol Denat.', 'Aqua', 'Fragrance'],
        featured: false,
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`✓ Seeded ${createdProducts.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();
