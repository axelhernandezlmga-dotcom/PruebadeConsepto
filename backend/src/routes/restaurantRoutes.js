import { Router } from 'express';
import {
  getRestaurants,
  getRestaurantById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getRestaurantOrders
} from '../controllers/restaurantController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:id/orders', authenticate, authorize('restaurantAdmin', 'superAdmin'), getRestaurantOrders);
router.post('/:id/menu', authenticate, authorize('restaurantAdmin', 'superAdmin'), createMenuItem);
router.put('/:id/menu/:itemId', authenticate, authorize('restaurantAdmin', 'superAdmin'), updateMenuItem);
router.delete('/:id/menu/:itemId', authenticate, authorize('restaurantAdmin', 'superAdmin'), deleteMenuItem);

export default router;
