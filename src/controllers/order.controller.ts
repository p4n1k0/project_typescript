import { Request, Response } from 'express';
import { Order } from '../interfaces';
import OrderService from '../services/order.service';
import statusCodes from '../statusCodes';

export default class OrderController {
  service = new OrderService();

  getAll = async (req: Request, res: Response) => {
    const data = await this.service.getAll();

    res.status(statusCodes.OK).json(data);
  };

  create = async (req: Request<unknown, unknown, Order>, res: Response) => {
    await this.service.create(req.body);

    res.status(statusCodes.CREATED)
      .json({ userId: req.body.token.id, productsIds: req.body.body.productsIds });
  };
}
