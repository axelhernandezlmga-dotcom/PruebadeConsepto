import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true
    },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    paymentMethod: { type: String, default: 'Efectivo' },
    status: {
      type: String,
      enum: ['Confirmado', 'Preparando', 'En camino', 'Entregado'],
      default: 'Confirmado'
    },
    courier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    courierLocation: {
      lat: Number,
      lng: Number
    },
    estimatedDeliveryMinutes: { type: Number, default: 35 }
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
