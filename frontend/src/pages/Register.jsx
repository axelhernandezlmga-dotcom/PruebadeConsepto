import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { registerRequest } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
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
      const data = await registerRequest({ ...form, role: 'customer' });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Crear una cuenta</h1>
      <p className="text-sm text-slate-500 mb-6">Registrate y empezá a disfrutar envíos deliciosos.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-600">Nombre</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full border border-slate-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
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
        <div>
          <label className="text-sm font-medium text-slate-600">Dirección</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="mt-1 w-full border border-slate-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-red-500 transition-colors disabled:opacity-50"
        >
          {loading ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>
    </div>
  );
};

export default Register;
