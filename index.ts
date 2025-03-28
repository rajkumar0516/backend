import dotenv from 'dotenv';
import path from 'path';
import { sendingEmail } from './cron/cron';
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
import filterRouter from './routes/filteredProduct';
import sendMailRouter from './routes/sendMailRouter';
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
app.use('/api/products', filterRouter);
app.use('/api/mail', sendMailRouter);
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'middlewares/uploads'))
);
async function main(): Promise<void> {
  try {
    await connectDB();
    await sendingEmail();
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

main();
