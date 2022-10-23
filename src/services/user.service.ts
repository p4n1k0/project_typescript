import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { IUser } from '../interfaces/index';

const { JWT_SECRET = 'secret' } = process.env;

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async create(user: IUser): Promise<string> {
    await this.model.create(user);
    const token = this.generateToken(user);

    return token;
  }

  private generateToken = (user: IUser): string => {
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, JWT_SECRET);

    return token;
  };
}
