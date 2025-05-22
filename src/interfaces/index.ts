export interface IProduct {
  name: string;
  amount: string;
};

export interface Product extends IProduct {
  id: number;
};

export interface IOrder extends Product {
  userId: number;
  productsIds: number[];
};

export interface UserCredentials {
  username: string;
  password: string;
};

export interface IUser extends UserCredentials {
  classe: string;
  level: number;
};

export interface User extends IUser {
  id?: number;
};

export interface Error {
  type: number | null;
  message: string | Token;
};

export interface Token extends Error {
  token: {
    id: number;
    username: string;
    iat: number;
  };
};

export interface Order extends Token {
  body: { 
    productsIds: number[];
  };
};
