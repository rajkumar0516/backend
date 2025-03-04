import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import getProductRouter from './routes/getProductRoutes';
import productRouter from './routes/productRoutes';
import deleteRouter from './routes/productDelete';
import connectDB from './database';
import authRoutes from './routes/authRoutes';
import updateRouter from './routes/productUpdate';
const app: Application = express();
const port: string | number = process.env.PORT ?? 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRouter);
app.use('/api/products', getProductRouter);
app.use('/api/products/', deleteRouter);
app.use('/api/products/', updateRouter);
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'middlewares/uploads'))
);
async function main(): Promise<void> {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Start the server only after a successful DB connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

main();
