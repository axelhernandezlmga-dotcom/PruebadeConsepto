import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

const storedToken = typeof window !== 'undefined' ? localStorage.getItem('delivery-token') : null;
if (storedToken) {
  api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
}

export const fetchRestaurants = (params = {}) => api.get('/restaurants', { params }).then((res) => res.data);
export const fetchRestaurant = (id) => api.get(`/restaurants/${id}`).then((res) => res.data);
export const fetchRestaurantOrders = (id) => api.get(`/restaurants/${id}/orders`).then((res) => res.data);
export const createOrder = (payload) => api.post('/orders', payload).then((res) => res.data);
export const fetchOrder = (id) => api.get(`/orders/${id}`).then((res) => res.data);
export const fetchUserOrders = (userId) => api.get(`/orders/user/${userId}`).then((res) => res.data);
export const advanceOrder = (id) => api.post(`/orders/${id}/advance`).then((res) => res.data);
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data).then((res) => res.data);
export const loginRequest = (payload) => api.post('/auth/login', payload).then((res) => res.data);
export const registerRequest = (payload) => api.post('/auth/register', payload).then((res) => res.data);
export const fetchAdminUsers = () => api.get('/admin/users').then((res) => res.data);
export const fetchAdminCouriers = () => api.get('/admin/couriers').then((res) => res.data);
export const fetchAdminOrders = () => api.get('/admin/orders').then((res) => res.data);
export const createRestaurantRequest = (data) => api.post('/admin/restaurants', data).then((res) => res.data);
