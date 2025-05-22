import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default (token:string) => {
  try {
    const decodeToken = jwt.verify(token, 'secret');

    return decodeToken;
  } catch (error) {
    return null;
  }
};
