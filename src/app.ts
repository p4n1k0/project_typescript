import express from 'express';
import productRouter from './routes/product.routes';
import userRouter from './routes/user.routes';
import orderRouter from './routes/order.routes';
import loginRouter from './routes/login.routes';

const app = express();

app.use(express.json());

app.use('/products', productRouter);

app.use(userRouter);

app.use(loginRouter);

app.use(orderRouter);

export default app;
