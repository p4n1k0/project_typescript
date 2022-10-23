import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import statusCodes from '../statusCodes';

export default class ProductsController {
  constructor(private service = new ProductService()) { }

  public create = async (req: Request, res: Response) => {
    const { name, amount } = req.body;

    const productCreated = await this.service.create({ name, amount });
    res.status(201).json(productCreated);
  };

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.service.getAll();

    res.status(statusCodes.OK).json(products);
  };
}
