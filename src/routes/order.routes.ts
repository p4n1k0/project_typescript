import express from 'express';
import OrderController from '../controllers/order.controller';

const router = express.Router();

const controller = new OrderController();

router.get('/orders', controller.getAll);

export default router;
