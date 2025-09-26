import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartSummary from '../components/CartSummary.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { createOrder } from '../services/api.js';

const paymentMethods = ['Pago en efectivo', 'Tarjeta guardada', 'Mercado Pago'];

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { items, clearCart, restaurant } = useCart();
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!restaurant) return;
    setLoading(true);
    try {
      const order = await createOrder({
        customerId: user.id,
        restaurantId: restaurant._id,
        items,
        paymentMethod
      });
      clearCart();
      navigate(`/orders?orderId=${order._id}`);
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error creando el pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <section className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
          <div className="grid gap-3">
            {paymentMethods.map((method) => (
              <label
                key={method}
                className={`border rounded-2xl px-4 py-3 cursor-pointer transition-all ${
                  paymentMethod === method
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/30'
                    : 'border-slate-200 hover:border-primary'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="hidden"
                />
                <span className="font-medium text-slate-800">{method}</span>
              </label>
            ))}
          </div>
        </section>
        <section className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Dirección de entrega</h2>
          <p className="text-sm text-slate-500">
            Tu pedido se enviará a <span className="font-semibold">{user.address || 'Cargar dirección en perfil'}</span>.
          </p>
        </section>
      </div>
      <div className="lg:col-span-1">
        <CartSummary onCheckout={handleCheckout} />
        {loading && <p className="text-center text-sm text-slate-500 mt-3">Procesando pedido...</p>}
      </div>
    </div>
  );
};

export default Checkout;
