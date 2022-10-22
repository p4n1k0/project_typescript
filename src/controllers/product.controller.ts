import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductsController {
  constructor(private service = new ProductService()) { }

  public create = async (req: Request, res: Response) => {
    const { name, amount } = req.body;

    const productCreated = await this.service.create({ name, amount });
    res.status(201).json(productCreated);
  };
}
