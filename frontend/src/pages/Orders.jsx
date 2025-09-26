import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import OrderTracker from '../components/OrderTracker.jsx';
import { fetchOrder, fetchUserOrders } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000');

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const location = useLocation();

  const orderIdFromQuery = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('orderId');
  }, [location.search]);

  const loadOrders = () => {
    fetchUserOrders(user.id).then((data) => {
      setOrders(data);
      if (data.length > 0) {
        setSelected((prev) => prev || data[0]);
      }
    });
  };

  useEffect(() => {
    loadOrders();
  }, [user.id]);

  useEffect(() => {
    if (orderIdFromQuery) {
      fetchOrder(orderIdFromQuery).then((order) => {
        setSelected(order);
        setOrders((prev) => {
          const others = prev.filter((o) => o._id !== order._id);
          return [order, ...others];
        });
      });
    }
  }, [orderIdFromQuery]);

  useEffect(() => {
    const handleUpdate = (order) => {
      if (order.customer === user.id || order.customer?._id === user.id) {
        setOrders((prev) => {
          const others = prev.filter((o) => o._id !== order._id);
          return [order, ...others];
        });
        if (selected?._id === order._id) {
          setSelected(order);
        }
      }
    };

    socket.on('order:updated', handleUpdate);
    socket.on('order:created', loadOrders);

    return () => {
      socket.off('order:updated', handleUpdate);
      socket.off('order:created', loadOrders);
    };
  }, [selected, user.id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className="bg-white rounded-3xl shadow-lg p-6 space-y-4 lg:col-span-1">
        <h2 className="text-lg font-semibold">Mis pedidos</h2>
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {orders.map((order) => (
            <button
              key={order._id}
              onClick={() => setSelected(order)}
              className={`w-full text-left border rounded-2xl px-4 py-3 transition-colors ${
                selected?._id === order._id ? 'border-primary bg-primary/10' : 'border-slate-200 hover:border-primary'
              }`}
            >
              <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>{order.restaurant?.name || 'Pedido'}</span>
                <span className="text-xs text-slate-400">
                  {new Date(order.createdAt).toLocaleTimeString('es-AR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Estado: {order.status}</p>
            </button>
          ))}
          {orders.length === 0 && <p className="text-sm text-slate-500">Aún no realizaste pedidos.</p>}
        </div>
      </section>
      <section className="lg:col-span-2">
        {selected ? (
          <OrderTracker order={selected} />
        ) : (
          <div className="bg-white rounded-3xl p-6 text-center shadow-sm">
            <p className="text-slate-500">Seleccioná un pedido para ver el seguimiento.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Orders;
