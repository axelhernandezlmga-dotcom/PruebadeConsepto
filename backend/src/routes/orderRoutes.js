import { Router } from 'express';
import {
  createOrder,
  getOrderById,
  getOrdersByUser,
  updateOrderStatus,
  advanceOrderStatus,
  getCouriers
} from '../controllers/orderController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticate, createOrder);
router.get('/user/:userId', authenticate, getOrdersByUser);
router.get('/couriers/list', authenticate, authorize('restaurantAdmin', 'superAdmin'), getCouriers);
router.get('/couriers', authenticate, authorize('restaurantAdmin', 'superAdmin'), getCouriers);
router.get('/:id', authenticate, getOrderById);
router.put('/:id', authenticate, authorize('restaurantAdmin', 'superAdmin'), updateOrderStatus);
router.post('/:id/advance', authenticate, authorize('restaurantAdmin', 'superAdmin', 'courier'), advanceOrderStatus);

export default router;
