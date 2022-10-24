import { NextFunction, Request, Response } from 'express';
import statusCodes from '../statusCodes';

export const nameValidate = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: '"name" is required' });
  }
  if (typeof name !== 'string') {
    return res.status(statusCodes.INVALID_FORMAT)
      .json({ message: '"name" must be a string' });
  }
  if (name.length <= 2) {
    return res.status(statusCodes.INVALID_FORMAT)
      .json({ message: '"name" length must be at least 3 characters long' });
  }

  next();
};

export const amountValidate = (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: '"amount" is required' });
  }
  if (typeof amount !== 'string') {
    return res.status(statusCodes.INVALID_FORMAT).json({ message: '"amount" must be a string' });
  }
  if (amount.length <= 2) {
    return res.status(statusCodes.INVALID_FORMAT)
      .json({ message: '"amount" length must be at least 3 characters long' });
  }

  next();
};
