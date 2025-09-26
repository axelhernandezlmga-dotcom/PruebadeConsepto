import { useEffect, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard.jsx';
import { fetchRestaurants } from '../services/api.js';

const categories = ['Todas', 'Pizzerías', 'Hamburgueserías', 'Cafeterías'];

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [category, setCategory] = useState('Todas');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchRestaurants(category === 'Todas' ? undefined : { category })
      .then(setRestaurants)
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="space-y-10">
      <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 shadow-xl">
        <div className="space-y-6 max-w-xl">
          <p className="uppercase tracking-[0.3em] text-sm font-semibold">Entrega en minutos</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Descubrí los mejores sabores de tu ciudad con Pedidos Express
          </h1>
          <p className="text-lg text-white/80">
            Pedí en tus restaurantes favoritos y seguí el pedido en tiempo real desde tu celular.
          </p>
          <div className="flex gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  category === cat ? 'bg-white text-primary' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <img
          src="https://images.pexels.com/photos/4393664/pexels-photo-4393664.jpeg"
          alt="Delivery"
          className="w-full md:w-96 rounded-3xl shadow-2xl"
        />
      </section>
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">Locales destacados</h2>
          <p className="text-sm text-slate-500">Explorá menús curados para cada ocasión</p>
        </div>
        {loading ? (
          <p className="text-center text-slate-500">Cargando restaurantes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
