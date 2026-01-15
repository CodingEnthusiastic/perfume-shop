import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ['perfume', 'cologne', 'fragrance', 'essential-oils', 'diffuser'],
    },
    brand: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    scent: {
      top: [String],
      middle: [String],
      base: [String],
    },
    volume: {
      type: String,
      required: true,
    },
    ingredients: [String],
    concentration: {
      type: String,
      enum: ['Eau de Cologne', 'Eau de Toilette', 'Eau de Parfum', 'Parfum'],
    },
    gender: {
      type: String,
      enum: ['unisex', 'male', 'female'],
      default: 'unisex',
    },
    longevity: {
      type: String,
      enum: ['poor', 'moderate', 'good', 'excellent'],
    },
    sillage: {
      type: String,
      enum: ['soft', 'moderate', 'strong', 'very-strong'],
    },
    sizes: {
      type: [String],
      default: ['50ml', '75ml', '100ml'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for faster searches
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1, price: 1 });

export default mongoose.model('Product', productSchema);
