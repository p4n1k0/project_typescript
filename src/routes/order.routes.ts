import express from 'express';
import OrderController from '../controllers/order.controller';

const router = express.Router();

const controller = new OrderController();

router.get('/', controller.getAll);

export default router;
