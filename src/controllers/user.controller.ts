import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UsersController {
  serviceUser = new UserService();

  public create = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    const token = await this.serviceUser.create({ username, classe, level, password });
    res.status(201).json({ token });
  };

  public login = async (req: Request, res: Response) => {
    const payload = req.body;
    const { type, message } = await this.serviceUser.login(payload);

    if (type) return res.status(type).json({ message });
    
    res.status(200).json({ token: message });
  };
}
