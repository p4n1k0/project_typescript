import { Request, Response, NextFunction } from 'express';
import { Order } from '../interfaces';


export default (req: Request<unknown, unknown, Order>, res: Response, next: NextFunction) => {
  const { productsIds } = req.body.body;

  if (!productsIds) return res.status(400).json({ message: '"productsIds" is required' });
  if (typeof productsIds !== 'object') return res.status(422).json({ message: '"productsIds" must be an array' });
  if (productsIds.length === 0) return res.status(422).json({ message: '"productsIds" must include only numbers' });

  next();
};
