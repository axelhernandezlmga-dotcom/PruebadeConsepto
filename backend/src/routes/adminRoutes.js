import { Router } from 'express';
import {
  getUsers,
  getCouriers,
  getOrders,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, authorize('superAdmin'));

router.get('/users', getUsers);
router.get('/couriers', getCouriers);
router.get('/orders', getOrders);
router.post('/restaurants', createRestaurant);
router.put('/restaurants/:id', updateRestaurant);
router.delete('/restaurants/:id', deleteRestaurant);

export default router;
