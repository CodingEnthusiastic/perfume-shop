import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Session configuration for Passport
app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true },
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/cart', cartRoutes);

app.get('/api/auth/failed', (req, res) => {
  res.status(401).json({ success: false, message: 'Authentication failed' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
