import { Router } from 'express';
import { getAllProducts, createNewProduct } from '../controllers/productController';

const router = Router();

router.get('/', getAllProducts);
router.post('/', createNewProduct);

export default router;
