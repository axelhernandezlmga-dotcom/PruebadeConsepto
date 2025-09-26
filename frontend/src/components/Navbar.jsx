import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { items } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary font-semibold text-xl">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
            PE
          </span>
          Pedidos Express
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          {user && user.role === 'customer' && (
            <Link to="/orders" className="hover:text-primary transition-colors">
              Mis pedidos
            </Link>
          )}
          {user && user.role === 'superAdmin' && (
            <Link to="/admin" className="hover:text-primary transition-colors">
              Admin General
            </Link>
          )}
          {user && user.role === 'restaurantAdmin' && (
            <Link to="/partner" className="hover:text-primary transition-colors">
              Panel del local
            </Link>
          )}
          <Link to="/checkout" className="relative hover:text-primary transition-colors">
            Carrito
            {items.length > 0 && (
              <span className="absolute -top-2 -right-3 w-5 h-5 text-xs bg-secondary text-dark rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-red-500 transition-colors"
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary transition-colors">
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white px-4 py-2 rounded-full hover:bg-red-500 transition-colors"
              >
                Registrarme
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
