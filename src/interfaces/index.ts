export interface IProduct {
  name: string;
  amount: string;
}

export interface Product extends IProduct {
  id: number;
}

export interface IUser {
  id?: number;
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface IOrder {
  id: number;
  userId: number;
  productsIds: number[];
}
