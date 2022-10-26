import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IOrder, Order } from '../interfaces/index';

export default class OrderModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrder[]> {
    const [orders] = await this.connection.execute<RowDataPacket[]>(
      `SELECT table1.id, table1.userId, JSON_ARRAYAGG(table2.id) AS productsIds 
      FROM Trybesmith.Orders AS table1 INNER JOIN Trybesmith.Products AS table2 
      ON table1.id = table2.orderId GROUP BY table1.id`,
    );

    return orders as IOrder[];
  }

  public async create(body: Order) {
    const [order] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders(userId) VALUES(?)',
      [body.token.id],
    );

    body.body.productsIds.forEach(async (productId) => {
      await this.connection.execute(
        'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
        [order.insertId, productId],
      );
    });
  }
}
