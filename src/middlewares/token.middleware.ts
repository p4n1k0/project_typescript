import { Request, Response, NextFunction } from 'express';
import tokenDecode from '../utils/tokenDecode';


export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const nekto = tokenDecode(authorization as string); 

  if (!nekto) return res.status(401).json({ message: 'Invalid token' });

  req.body = {
    body: req.body,
    token: nekto,
  };

  next();
};
