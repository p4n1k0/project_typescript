import { Request, Response } from 'express';
import { Order } from '../interfaces';
import OrderService from '../services/order.service';

export default class OrderController {
  serviceOrder = new OrderService();

  getAll = async (req: Request, res: Response) => {
    const data = await this.serviceOrder.getAll();
    res.status(200).json(data);
  };

  create = async (req: Request<unknown, unknown, Order>, res: Response) => {
    await this.serviceOrder.create(req.body);
    res.status(201).json({ userId: req.body.token.id, productsIds: req.body.body.productsIds });
  };
}
