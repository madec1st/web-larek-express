import { Router } from 'express';
import placeOrder from '../controllers/orderController';
import validateOrderBody from '../middlewares/validationOrder';

const router = Router();

router.post('/', validateOrderBody, placeOrder);

export default router;
