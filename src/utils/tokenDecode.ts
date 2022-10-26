import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret: string = process.env.JWT_SECRET || 'secret';

export default (token:string) => {
  try {
    const decodeToken = jwt.verify(token, secret);

    return decodeToken;
  } catch (error) {
    return null;
  }
};
