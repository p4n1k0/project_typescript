import { IOrder, Order } from '../interfaces';
import connection from '../models/connection';
import OrderModel from '../models/order.model';

export default class ProductService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<IOrder[]> {
    const products = await this.model.getAll();

    return products;
  } 

  public async create(body: Order) { await this.model.create(body); }
}
