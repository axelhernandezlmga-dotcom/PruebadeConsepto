import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDatabase } from '../config/database.js';
import { User } from '../models/User.js';
import { Restaurant } from '../models/Restaurant.js';
import { Order } from '../models/Order.js';

dotenv.config();

const seed = async () => {
  try {
    await connectDatabase();
    await Promise.all([User.deleteMany(), Restaurant.deleteMany(), Order.deleteMany()]);

    const password = await bcrypt.hash('123456', 10);

    const [superAdmin, pizzaAdmin, burgerAdmin, courierJuan, courierAna, customer] = await User.create([
      { name: 'Super Admin', email: 'admin@delivery.com', password, role: 'superAdmin' },
      { name: 'Pizzería Admin', email: 'pizza@delivery.com', password, role: 'restaurantAdmin' },
      { name: 'Burger Admin', email: 'burger@delivery.com', password, role: 'restaurantAdmin' },
      { name: 'Juan Repartidor', email: 'juan@delivery.com', password, role: 'courier', phone: '+54 11 2222-3333' },
      { name: 'Ana Repartidora', email: 'ana@delivery.com', password, role: 'courier', phone: '+54 11 4444-5555' },
      {
        name: 'Carla Cliente',
        email: 'carla@delivery.com',
        password,
        role: 'customer',
        address: 'Av. Siempre Viva 742',
        phone: '+54 11 7777-8888'
      }
    ]);

    const restaurants = await Restaurant.create([
      {
        name: 'La Pizzería de Tony',
        category: 'Pizzerías',
        description: 'Pizzas artesanales con masa madre y horno de barro.',
        address: 'Av. Corrientes 1234',
        phone: '+54 11 5555-1212',
        bannerImage: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg',
        rating: 4.7,
        estimatedDeliveryMinutes: 35,
        location: { lat: -34.6037, lng: -58.3816 },
        menu: [
          {
            name: 'Pizza Margarita',
            description: 'Salsa de tomate, mozzarella fresca, albahaca y oliva extra virgen.',
            price: 3500,
            category: 'Pizzas',
            imageUrl: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg'
          },
          {
            name: 'Calzone Napolitano',
            description: 'Relleno de jamón, mozzarella y ricota casera.',
            price: 3200,
            category: 'Pizzas',
            imageUrl: 'https://images.pexels.com/photos/4109084/pexels-photo-4109084.jpeg'
          }
        ]
      },
      {
        name: 'Burger Station',
        category: 'Hamburgueserías',
        description: 'Burgers gourmet con ingredientes locales y panes brioche.',
        address: 'Hipólito Yrigoyen 789',
        phone: '+54 11 6666-4545',
        bannerImage: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
        rating: 4.6,
        estimatedDeliveryMinutes: 25,
        location: { lat: -34.6083, lng: -58.3712 },
        menu: [
          {
            name: 'Cheeseburger Clásica',
            description: 'Doble carne, cheddar, pepinos y salsa especial.',
            price: 2800,
            category: 'Hamburguesas',
            imageUrl: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'
          },
          {
            name: 'Veggie Deluxe',
            description: 'Hamburguesa de garbanzos con palta y brotes.',
            price: 2600,
            category: 'Hamburguesas',
            imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
          }
        ]
      },
      {
        name: 'Café Central',
        category: 'Cafeterías',
        description: 'Café de especialidad, pastelería y brunch todo el día.',
        address: 'Florida 456',
        phone: '+54 11 3333-9898',
        bannerImage: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg',
        rating: 4.8,
        estimatedDeliveryMinutes: 20,
        location: { lat: -34.6038, lng: -58.3817 },
        menu: [
          {
            name: 'Latte Vainilla',
            description: 'Shot doble de espresso con leche vaporizada y almíbar de vainilla.',
            price: 1200,
            category: 'Bebidas',
            imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
          },
          {
            name: 'Croissant de Almendras',
            description: 'Croissant de manteca relleno con crema de almendras.',
            price: 950,
            category: 'Pastelería',
            imageUrl: 'https://images.pexels.com/photos/2147862/pexels-photo-2147862.jpeg'
          }
        ]
      }
    ]);

    pizzaAdmin.restaurant = restaurants[0]._id;
    burgerAdmin.restaurant = restaurants[1]._id;
    await pizzaAdmin.save();
    await burgerAdmin.save();

    console.log('Datos insertados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error sembrando datos', error);
    process.exit(1);
  }
};

seed();
