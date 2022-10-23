import express from 'express';
import productRouter from './routes/product.routes';
import userRouter from './routes/user.routes';
import orderRouter from './routes/order.routes';

const app = express();

app.use(express.json());

app.use('/products', productRouter);

app.use('/users', userRouter);

app.use('/orders', orderRouter);

export default app;
