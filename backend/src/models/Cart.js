import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  size: String,
  image: String,
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

// Calculate total price
cartSchema.methods.getTotalPrice = function () {
  return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Get total items count
cartSchema.methods.getTotalItems = function () {
  return this.items.reduce((total, item) => total + item.quantity, 0);
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
