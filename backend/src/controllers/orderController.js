import { Order } from '../models/Order.js';
import { Restaurant } from '../models/Restaurant.js';
import { User } from '../models/User.js';
import { socketServer } from '../services/socket.js';

const STATUS_FLOW = ['Confirmado', 'Preparando', 'En camino', 'Entregado'];

export const createOrder = async (req, res) => {
  try {
    const { customerId, restaurantId, items, paymentMethod } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const order = await Order.create({
      customer: customerId,
      restaurant: restaurantId,
      items,
      total,
      paymentMethod,
      estimatedDeliveryMinutes: restaurant.estimatedDeliveryMinutes
    });
    socketServer.emit('order:created', order);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creando pedido', error);
    res.status(500).json({ message: 'Error creando pedido' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant')
      .populate('courier', 'name phone')
      .populate('customer', 'name address phone');
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error obteniendo pedido', error);
    res.status(500).json({ message: 'Error obteniendo pedido' });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('restaurant', 'name bannerImage');
    res.json(orders);
  } catch (error) {
    console.error('Error listando pedidos de usuario', error);
    res.status(500).json({ message: 'Error listando pedidos' });
  }
};

export const getCouriers = async (req, res) => {
  try {
    const couriers = await User.find({ role: 'courier' }).select('name phone');
    res.json(couriers);
  } catch (error) {
    console.error('Error listando repartidores', error);
    res.status(500).json({ message: 'Error listando repartidores' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, courierId, courierLocation, estimatedDeliveryMinutes } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    if (status && STATUS_FLOW.includes(status)) {
      order.status = status;
    }
    if (courierId) {
      const courier = await User.findById(courierId);
      if (!courier) {
        return res.status(400).json({ message: 'Repartidor inválido' });
      }
      order.courier = courierId;
    }
    if (courierLocation) {
      order.courierLocation = courierLocation;
    }
    if (estimatedDeliveryMinutes) {
      order.estimatedDeliveryMinutes = estimatedDeliveryMinutes;
    }
    await order.save();
    const populated = await Order.findById(id)
      .populate('restaurant')
      .populate('courier', 'name phone');
    socketServer.emit('order:updated', populated);
    res.json(populated);
  } catch (error) {
    console.error('Error actualizando pedido', error);
    res.status(500).json({ message: 'Error actualizando pedido' });
  }
};

export const advanceOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    const currentIndex = STATUS_FLOW.indexOf(order.status);
    const nextStatus = STATUS_FLOW[Math.min(currentIndex + 1, STATUS_FLOW.length - 1)];
    order.status = nextStatus;
    await order.save();
    socketServer.emit('order:updated', order);
    res.json(order);
  } catch (error) {
    console.error('Error avanzando pedido', error);
    res.status(500).json({ message: 'Error avanzando pedido' });
  }
};
