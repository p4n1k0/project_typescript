import { Request, Response, NextFunction } from 'express';
import tokenDecode from '../utils/tokenDecode';
import statusCodes from '../statusCodes';

const MESSAGES = {
  NOT_FOUND: 'Token not found',
  INVALID: 'Invalid token',
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: MESSAGES.NOT_FOUND });
  }

  const nekto = tokenDecode(authorization as string); 

  if (!nekto) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: MESSAGES.INVALID });
  }

  req.body = {
    body: req.body,
    token: nekto,
  };

  next();
};
