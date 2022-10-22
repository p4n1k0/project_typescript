import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct, Product } from '../interfaces';

export default class ProductModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  create = async (product: IProduct): Promise<Product> => {
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
    const [data] = await this.connection.execute<ResultSetHeader>(
      query,
      [product.name, product.amount],
    );

    const { insertId: id } = data;

    return { id, ...product };
  };
}
