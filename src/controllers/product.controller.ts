import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductsController {
  serviceProduct = new ProductService();

  public create = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    const productCreated = await this.serviceProduct.create({ name, amount });
    res.status(201).json(productCreated);
  };

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.serviceProduct.getAll();
    res.status(200).json(products);
  };
}
