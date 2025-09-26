import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['customer', 'restaurantAdmin', 'superAdmin', 'courier'],
      default: 'customer'
    },
    phone: String,
    address: String,
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
