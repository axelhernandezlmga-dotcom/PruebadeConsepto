import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    category: String,
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    address: String,
    phone: String,
    bannerImage: String,
    rating: { type: Number, default: 4 },
    estimatedDeliveryMinutes: { type: Number, default: 30 },
    location: {
      lat: Number,
      lng: Number
    },
    menu: [menuItemSchema]
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
