import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
    phone: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['general', 'support', 'feedback', 'complaint', 'partnership'],
      default: 'general',
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved', 'closed'],
      default: 'new',
    },
    response: {
      type: String,
      default: null,
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    respondedAt: {
      type: Date,
      default: null,
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

export default mongoose.model('Contact', contactSchema);
