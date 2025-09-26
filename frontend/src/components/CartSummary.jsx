import { useCart } from '../context/CartContext.jsx';

const CartSummary = ({ onCheckout }) => {
  const { items, removeItem, updateQuantity, total, restaurant } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 text-center shadow-sm">
        <p className="text-slate-500">Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{restaurant?.name}</h3>
        <p className="text-sm text-slate-400">{restaurant?.address}</p>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item._id} className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-slate-800">{item.name}</p>
              <p className="text-sm text-slate-400">${item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                className="w-16 border border-slate-200 rounded-full px-2 py-1 text-center"
              />
              <button
                onClick={() => removeItem(item._id)}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between text-lg font-semibold">
        <span>Total</span>
        <span>${total.toLocaleString()}</span>
      </div>
      <button
        onClick={onCheckout}
        className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-red-500 transition-colors"
      >
        Confirmar pedido
      </button>
    </div>
  );
};

export default CartSummary;
