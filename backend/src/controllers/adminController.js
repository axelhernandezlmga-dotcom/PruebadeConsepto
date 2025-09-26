import { User } from '../models/User.js';
import { Restaurant } from '../models/Restaurant.js';
import { Order } from '../models/Order.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error listando usuarios', error);
    res.status(500).json({ message: 'Error listando usuarios' });
  }
};

export const getCouriers = async (req, res) => {
  try {
    const couriers = await User.find({ role: 'courier' }).select('-password');
    res.json(couriers);
  } catch (error) {
    console.error('Error listando repartidores', error);
    res.status(500).json({ message: 'Error listando repartidores' });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('customer', 'name')
      .populate('restaurant', 'name')
      .populate('courier', 'name');
    res.json(orders);
  } catch (error) {
    console.error('Error listando pedidos', error);
    res.status(500).json({ message: 'Error listando pedidos' });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Error creando restaurante', error);
    res.status(500).json({ message: 'Error creando restaurante' });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error('Error actualizando restaurante', error);
    res.status(500).json({ message: 'Error actualizando restaurante' });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    res.json({ message: 'Restaurante eliminado' });
  } catch (error) {
    console.error('Error eliminando restaurante', error);
    res.status(500).json({ message: 'Error eliminando restaurante' });
  }
};
