import { Request, Response, NextFunction } from 'express';
import { Order } from '../interfaces';
import statusCodes from '../statusCodes';

const MESSAGES = {
  NOT_REQUIRED: '"productsIds" is required',
  NOT_ARRAY: '"productsIds" must be an array',
  NOT_NUMBERS: '"productsIds" must include only numbers',
};

export default (req: Request<unknown, unknown, Order>, res: Response, next: NextFunction) => {
  const { productsIds } = req.body.body;

  if (!productsIds) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: MESSAGES.NOT_REQUIRED });
  }
  if (typeof productsIds !== 'object') {
    return res.status(statusCodes.INVALID_FORMAT).json({ message: MESSAGES.NOT_ARRAY });
  }
  if (productsIds.length === 0) {
    return res.status(statusCodes.INVALID_FORMAT).json({ message: MESSAGES.NOT_NUMBERS });
  }

  next();
};
