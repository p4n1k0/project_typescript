import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { Error, User, UserCredentials } from '../interfaces/index';


export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async create(user: User): Promise<string> {
    await this.model.create(user);
    const token = this.generateToken(user);

    return token;
  }  

  public async login(data: UserCredentials): Promise<Error> {
    if (!data.username) return { type: 400, message: '"username" is required' };

    if (!data.password) return { type: 400, message: '"password" is required' };

    const user = await this.model.login(data);
    if (!user) return { type: 401, message: 'Username or password invalid' };

    const token = this.generateToken(user);    
    return { type: null, message: token };
  }

  private generateToken = (user: User): string => {
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, 'secret');

    return token;
  };
}
