import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MenuItemCard from '../components/MenuItemCard.jsx';
import { fetchRestaurant } from '../services/api.js';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchRestaurant(id)
      .then(setRestaurant)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center text-slate-500">Cargando menú...</p>;
  }

  if (!restaurant) {
    return <p className="text-center text-red-500">Restaurante no encontrado.</p>;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl overflow-hidden bg-white shadow-xl">
        <div className="h-72 relative">
          <img src={restaurant.bannerImage} alt={restaurant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white space-y-2">
            <span className="text-sm uppercase tracking-[0.4em] text-white/60">{restaurant.category}</span>
            <h1 className="text-4xl font-bold">{restaurant.name}</h1>
            <p className="max-w-2xl text-white/80">{restaurant.description}</p>
            <div className="flex gap-4 text-sm text-white/70">
              <span>⭐ {restaurant.rating.toFixed(1)}</span>
              <span>⏱️ {restaurant.estimatedDeliveryMinutes} min</span>
              <span>📍 {restaurant.address}</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Menú</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.menu.map((item) => (
            <MenuItemCard key={item._id} item={item} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetail;
