import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { loginRequest } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginRequest(form);
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error iniciando sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">¡Hola de nuevo!</h1>
      <p className="text-sm text-slate-500 mb-6">Ingresá tu cuenta para seguir tus pedidos en tiempo real.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-600">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full border border-slate-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Contraseña</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full border border-slate-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-red-500 transition-colors disabled:opacity-50"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
      <p className="text-xs text-slate-400 mt-4">
        Podés usar el usuario de prueba <span className="font-semibold">carla@delivery.com</span> con contraseña{' '}
        <span className="font-semibold">123456</span>.
      </p>
    </div>
  );
};

export default Login;
