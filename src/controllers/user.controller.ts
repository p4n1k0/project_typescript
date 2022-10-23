import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import UserService from '../services/user.service';

export default class UsersController {
  constructor(private service = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    const token = await this.service.create({ username, classe, level, password });

    res.status(statusCodes.CREATED).json({ token });
  };
}
