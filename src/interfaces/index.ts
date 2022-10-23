export interface IProduct {
  name: string;
  amount: string;
}

export interface Product extends IProduct {
  id: number;
}

interface IUser {
  id?: number;
  username: string;
  classe: string;
  level: number;
  password: string;
}

export default IUser;
