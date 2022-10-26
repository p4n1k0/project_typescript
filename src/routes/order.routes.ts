import express from 'express';
import OrderController from '../controllers/order.controller';
import productIdValidate from '../middlewares/order.middleware';
import token from '../middlewares/token.middleware';

const router = express.Router();

const controller = new OrderController();

router.get('/', controller.getAll);
router.post('/', token, productIdValidate, controller.create);

export default router;
