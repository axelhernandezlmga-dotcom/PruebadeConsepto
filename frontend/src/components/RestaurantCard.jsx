import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link
      to={`/restaurants/${restaurant._id}`}
      className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden border border-slate-100"
    >
      <div className="h-48 overflow-hidden">
        <img src={restaurant.bannerImage} alt={restaurant.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{restaurant.name}</h3>
          <span className="text-sm bg-secondary text-dark px-3 py-1 rounded-full font-semibold">
            {restaurant.rating.toFixed(1)}★
          </span>
        </div>
        <p className="text-sm text-slate-500 line-clamp-2">{restaurant.description}</p>
        <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wide">
          <span>{restaurant.category}</span>
          <span>{restaurant.estimatedDeliveryMinutes} min</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
