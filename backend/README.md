# Perfume Haven Hub - Backend API

A robust Node.js/Express backend API with MongoDB for the Perfume Haven Hub e-commerce platform.

## 🏗️ Architecture

This backend follows the **MVC (Model-View-Controller)** architecture pattern:

- **Models**: MongoDB schemas for User, Product, Transaction, Review, and Contact
- **Controllers**: Business logic for each entity
- **Routes**: API endpoints organized by feature
- **Middleware**: Authentication, error handling, and logging
- **Config**: Database and OAuth configuration

## 📋 Features

- ✅ User authentication with JWT tokens
- ✅ OAuth 2.0 integration (Google & GitHub)
- ✅ Product management system
- ✅ Order/Transaction management
- ✅ Product reviews and ratings
- ✅ Contact form submission
- ✅ MongoDB database integration
- ✅ Error handling and validation
- ✅ CORS enabled for frontend integration

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas connection string)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/perfume-haven
   NODE_ENV=development
   JWT_SECRET=your_secure_secret_key_here
   JWT_EXPIRE=7d
   
   # OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   
   FRONTEND_URL=http://localhost:5173
   ```

5. Seed sample data:
   ```bash
   npm run seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000/api`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/github` - GitHub OAuth login

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/categories` - Get all categories
- `GET /api/products/brands` - Get all brands

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review (Protected)
- `PUT /api/reviews/:id` - Update review (Protected)
- `DELETE /api/reviews/:id` - Delete review (Protected)

### Transactions
- `POST /api/transactions` - Create order (Protected)
- `GET /api/transactions` - Get user orders (Protected)
- `GET /api/transactions/:id` - Get order details (Protected)
- `PUT /api/transactions/:id` - Update order status (Admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (Admin)
- `GET /api/contact/:id` - Get contact message (Admin)
- `PUT /api/contact/:id` - Respond to contact (Admin)
- `DELETE /api/contact/:id` - Delete contact (Admin)

## 🔑 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer your_jwt_token_here
```

## 🗄️ Database Schema

### User
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: Object,
  googleId: String,
  githubId: String,
  profileImage: String,
  authProvider: String,
  isEmailVerified: Boolean
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  brand: String,
  images: [String],
  thumbnail: String,
  stock: Number,
  rating: Number,
  reviewCount: Number,
  scent: Object,
  volume: String,
  concentration: String,
  gender: String,
  longevity: String,
  sillage: String,
  featured: Boolean
}
```

### Transaction
```javascript
{
  userId: ObjectId,
  items: Array,
  totalAmount: Number,
  taxAmount: Number,
  shippingAmount: Number,
  discountAmount: Number,
  finalAmount: Number,
  status: String,
  paymentMethod: String,
  transactionId: String,
  shippingAddress: Object
}
```

## 🔐 OAuth Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Secret to `.env`

### GitHub OAuth
1. Go to [GitHub Settings](https://github.com/settings/apps)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:5000/api/auth/github/callback`
4. Copy Client ID and Secret to `.env`

## 📦 Deployment

### For Production

1. Build the project:
   ```bash
   npm run build
   ```

2. Set environment variables on your hosting platform

3. Install dependencies:
   ```bash
   npm install --production
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Recommended Hosting
- Heroku, AWS, DigitalOcean, or Render for Node.js backend
- MongoDB Atlas for database

## 🛠️ Technologies Used

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Passport.js** - OAuth integration
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Nodemon** - Development auto-reload

## 📝 Development

### Running Tests
```bash
npm test
```

### Code Structure
```
backend/
├── src/
│   ├── models/          # Database schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── config/          # Configuration files
│   ├── utils/           # Utility functions
│   └── server.js        # Entry point
├── seed.js              # Database seeding
├── package.json
└── .env.example
```

## 🐛 Troubleshooting

### Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network connectivity

### OAuth Issues
- Verify Client ID and Secret
- Check redirect URIs match exactly
- Ensure FRONTEND_URL is correct

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

For issues or questions, please contact the development team or create an issue in the repository.
