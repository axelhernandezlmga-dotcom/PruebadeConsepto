import { useCart } from '../context/CartContext.jsx';

const MenuItemCard = ({ item, restaurant }) => {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="h-40 rounded-2xl overflow-hidden">
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-slate-900">{item.name}</h4>
          <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-primary font-semibold text-lg">${item.price.toLocaleString()}</span>
        <button
          onClick={() => addItem(item, restaurant)}
          className="bg-primary text-white px-4 py-2 rounded-full hover:bg-red-500 transition-colors text-sm font-semibold"
        >
          Añadir
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
