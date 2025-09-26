import { useEffect, useState } from 'react';
import {
  fetchAdminUsers,
  fetchAdminCouriers,
  fetchAdminOrders,
  createRestaurantRequest
} from '../services/api.js';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', description: '', address: '', estimatedDeliveryMinutes: 30 });
  const [message, setMessage] = useState('');

  const loadData = () => {
    fetchAdminUsers().then(setUsers);
    fetchAdminCouriers().then(setCouriers);
    fetchAdminOrders().then(setOrders);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRestaurantRequest(form);
      setMessage('Restaurante creado con éxito');
      setForm({ name: '', category: '', description: '', address: '', estimatedDeliveryMinutes: 30 });
      loadData();
    } catch (error) {
      setMessage('No se pudo crear el restaurante');
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Crear nuevo restaurante</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-slate-200 rounded-full px-4 py-3"
          />
          <input
            type="text"
            required
            placeholder="Categoría"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border border-slate-200 rounded-full px-4 py-3"
          />
          <input
            type="text"
            placeholder="Dirección"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="border border-slate-200 rounded-full px-4 py-3"
          />
          <input
            type="number"
            placeholder="Tiempo estimado (min)"
            value={form.estimatedDeliveryMinutes}
            onChange={(e) => setForm({ ...form, estimatedDeliveryMinutes: Number(e.target.value) })}
            className="border border-slate-200 rounded-full px-4 py-3"
          />
          <textarea
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="md:col-span-2 border border-slate-200 rounded-3xl px-4 py-3"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-primary text-white py-3 rounded-full font-semibold hover:bg-red-500 transition-colors"
          >
            Crear restaurante
          </button>
        </form>
        {message && <p className="text-sm text-slate-500 mt-3">{message}</p>}
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Usuarios</h3>
          <ul className="space-y-2 text-sm text-slate-600 max-h-64 overflow-y-auto">
            {users.map((user) => (
              <li key={user._id} className="flex items-center justify-between">
                <span>{user.name}</span>
                <span className="text-slate-400">{user.role}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Repartidores</h3>
          <ul className="space-y-2 text-sm text-slate-600 max-h-64 overflow-y-auto">
            {couriers.map((courier) => (
              <li key={courier._id} className="flex items-center justify-between">
                <span>{courier.name}</span>
                <span className="text-slate-400">{courier.phone || 'Sin teléfono'}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Pedidos recientes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-400">
              <tr>
                <th className="py-2">Cliente</th>
                <th className="py-2">Restaurante</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {orders.map((order) => (
                <tr key={order._id} className="border-t border-slate-100">
                  <td className="py-2">{order.customer?.name}</td>
                  <td className="py-2">{order.restaurant?.name}</td>
                  <td className="py-2">{order.status}</td>
                  <td className="py-2">${order.total?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
