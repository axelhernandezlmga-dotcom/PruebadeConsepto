import { Restaurant } from '../models/Restaurant.js';
import { Order } from '../models/Order.js';

export const getRestaurants = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (error) {
    console.error('Error listando restaurantes', error);
    res.status(500).json({ message: 'Error obteniendo restaurantes' });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error('Error obteniendo restaurante', error);
    res.status(500).json({ message: 'Error obteniendo restaurante' });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    restaurant.menu.push(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Error creando plato', error);
    res.status(500).json({ message: 'Error creando plato' });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    const item = restaurant.menu.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }
    Object.assign(item, req.body);
    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    console.error('Error actualizando plato', error);
    res.status(500).json({ message: 'Error actualizando plato' });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    const item = restaurant.menu.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }
    item.remove();
    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    console.error('Error eliminando plato', error);
    res.status(500).json({ message: 'Error eliminando plato' });
  }
};

export const getRestaurantOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.find({ restaurant: id })
      .populate('customer', 'name address')
      .populate('courier', 'name phone');
    res.json(orders);
  } catch (error) {
    console.error('Error listando pedidos', error);
    res.status(500).json({ message: 'Error listando pedidos' });
  }
};
