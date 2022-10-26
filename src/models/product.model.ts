import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct, Product } from '../interfaces';

export default class ProductModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: IProduct): Promise<Product> {
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
    const [data] = await this.connection.execute<ResultSetHeader>(
      query,
      [product.name, product.amount],
    );

    const { insertId: id } = data;

    return { id, ...product };
  }

  public async getAll(): Promise<Product[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    const [products] = result;

    return products as Product[];
  }

  public async newProduct(orderId: number, productId : number) {
    const product = await this.connection
      .execute(
        'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
        [orderId, productId],
      );

    return product;
  }
}
