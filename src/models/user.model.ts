import { Pool, ResultSetHeader } from 'mysql2/promise';
import { User, UserCredentials } from '../interfaces/index';
import connection from './connection';

export default class UserModel {
  private connection: Pool;
  
  constructor() {
    this.connection = connection;
  }

  public async create(user: User): Promise<void> {
    const { username, classe, level, password } = user;
    await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
  }

  public async getAll(): Promise<User[]> {
    const [data] = await this.connection.execute<User[] & ResultSetHeader>(
      'SELECT * FROM Trybesmith.Users',
    );

    return data;
  }

  public async login(data: UserCredentials): Promise<User | undefined> {
    const users = await this.getAll();
    const user: User | undefined = users.find((u) => (
      u.username === data.username && u.password === data.password
    ));

    if (!user) return user;

    const payload = { id: user.id, username: user.username };
    
    return payload as User;
  }
}
