import express, { Request, Response } from 'express';
import { Product } from '../models/product';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
