import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { amountValidate, nameValidate } from '../middlewares/product.middleware';

const router = Router();
const controller = new ProductController();

router.post('/', nameValidate, amountValidate, controller.create);
router.get('/', controller.getAll);

export default router;
