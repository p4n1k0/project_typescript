import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import statusCodes from '../statusCodes';

export default class OrderController {
  service = new OrderService();

  getAll = async (req: Request, res: Response) => {
    const data = await this.service.getAll();

    res.status(statusCodes.OK).json(data);
  };
}
