import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import RestaurantDetail from './pages/RestaurantDetail.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import PartnerDashboard from './pages/PartnerDashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { useAuth } from './context/AuthContext.jsx';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute roles={['customer']}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute roles={['customer']}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['superAdmin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner"
          element={
            <ProtectedRoute roles={['restaurantAdmin']}>
              <PartnerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
