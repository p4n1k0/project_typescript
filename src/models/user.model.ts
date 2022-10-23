import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IUser } from '../interfaces/index';
import connection from './connection';

export default class UserModel {
  private connection: Pool;
  
  constructor() {
    this.connection = connection;
  }

  public async create(user: IUser): Promise<void> {
    const { username, classe, level, password } = user;
    await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
  }
}
