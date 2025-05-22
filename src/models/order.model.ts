import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IOrder, Order } from '../interfaces/index';

export default class OrderModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrder[]> {
    const [orders] = await this.connection.execute<RowDataPacket[]>(
      `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) as productsIds FROM Trybesmith.Orders o
      JOIN Trybesmith.Products p
      ON o.id = p.orderId
      GROUP BY o.id`,
    );

    return orders as IOrder[];
  }

  public async create(body: Order) {
    const [order] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES(?)',
      [body.token.id],
    );

    await Promise.all(body.body.productsIds.map(async (productId) => {
      await this.connection.execute(`UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?`,
        [order.insertId, productId],
      );
    }));
  }
}
