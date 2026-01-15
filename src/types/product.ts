export interface ProductNotes {
  top?: string[];
  middle?: string[];
  base?: string[];
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  images: string[];
  thumbnail: string;
  scent?: ProductNotes;
  stock: number;
  featured: boolean;
  rating: number;
  reviewCount: number;
  volume: string;
  concentration?: string;
  gender?: string;
  longevity?: string;
  sillage?: string;
  ingredients?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  productId: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  profileImage?: string;
  authProvider: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  _id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  totalAmount: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: string;
  paymentMethod: string;
  transactionId: string;
  shippingAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
