import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchRestaurant, fetchRestaurantOrders, updateOrder, advanceOrder, api } from '../services/api.js';
import { useNavigate } from 'react-router-dom';

const PartnerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [menuForm, setMenuForm] = useState({ name: '', description: '', price: 0, imageUrl: '', category: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user?.restaurant) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user?.restaurant) return;
    fetchRestaurant(user.restaurant).then(setRestaurant);
    fetchRestaurantOrders(user.restaurant).then(setOrders);
    api
      .get('/orders/couriers')
      .then((res) => setCouriers(res.data))
      .catch(() => setCouriers([]));
  }, [user?.restaurant]);

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/restaurants/${user.restaurant}/menu`, menuForm);
      const data = await fetchRestaurant(user.restaurant);
      setRestaurant(data);
      setMenuForm({ name: '', description: '', price: 0, imageUrl: '', category: '' });
      setMessage('Plato agregado correctamente');
    } catch (error) {
      setMessage('No se pudo agregar el plato');
    }
  };

  const handleAssignCourier = async (orderId, courierId) => {
    try {
      await updateOrder(orderId, { courierId });
      const data = await fetchRestaurantOrders(user.restaurant);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdvance = async (orderId) => {
    await advanceOrder(orderId);
    const data = await fetchRestaurantOrders(user.restaurant);
    setOrders(data);
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Menú de {restaurant?.name}</h2>
        <form onSubmit={handleMenuSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Nombre"
            value={menuForm.name}
            onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
            className="border border-slate-200 rounded-full px-4 py-3"
          />
          <input
            type="number"
            required
            placeholder="Precio"
            value={menuForm.price}
            onChange={(e) => setMenuForm({ ...menuForm, price: Number(e.target.value) })}
            className="border border-slate-200 rounded-full px-4 py-3"
          />
          <input
            type="text"
            placeholder="Categoría"
            value={menuForm.category}
            onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
            className="border border-slate-200 rounded-full px-4 py-3"
          />
          <input
            type="text"
            placeholder="URL de imagen"
            value={menuForm.imageUrl}
            onChange={(e) => setMenuForm({ ...menuForm, imageUrl: e.target.value })}
            className="border border-slate-200 rounded-full px-4 py-3"
          />
          <textarea
            placeholder="Descripción"
            value={menuForm.description}
            onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
            className="md:col-span-2 border border-slate-200 rounded-3xl px-4 py-3"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-primary text-white py-3 rounded-full font-semibold hover:bg-red-500 transition-colors"
          >
            Agregar plato
          </button>
        </form>
        {message && <p className="text-sm text-slate-500 mt-3">{message}</p>}
      </section>
      <section className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Pedidos entrantes</h3>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border border-slate-200 rounded-3xl p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-800">{order.customer?.name}</p>
                  <p className="text-sm text-slate-500">{order.customer?.address}</p>
                  <p className="text-xs text-slate-400">Estado: {order.status}</p>
                </div>
                <div className="text-sm text-slate-600">
                  {order.items.map((item) => (
                    <p key={item.menuItem || item.name}>
                      {item.quantity} x {item.name}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <select
                    value={order.courier?._id || ''}
                    onChange={(e) => handleAssignCourier(order._id, e.target.value)}
                    className="border border-slate-200 rounded-full px-4 py-2 text-sm"
                  >
                    <option value="">Asignar repartidor</option>
                    {couriers.map((courier) => (
                      <option key={courier._id} value={courier._id}>
                        {courier.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAdvance(order._id)}
                    className="bg-secondary text-dark px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-400 transition-colors"
                  >
                    Avanzar estado
                  </button>
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && <p className="text-sm text-slate-500">No hay pedidos por ahora.</p>}
        </div>
      </section>
    </div>
  );
};

export default PartnerDashboard;
