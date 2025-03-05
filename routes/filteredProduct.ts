import express from 'express';
import { Product } from '../models/product';

const router = express.Router();

router.get('/filter', async (req: any, res: any) => {
  try {
    const { name, startDate, endDate, stock } = req.query;
    const filter: any = {};
    if (name) {
      filter.name = { $regex: new RegExp(name as string, 'i') };
    }
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }
    if (stock !== undefined) {
      filter.stock = stock == 'true' ? { $gt: 0 } : { $eq: 0 };
    }
    const filteredProduct = await Product.find(filter);
    if (filteredProduct.length === 0) {
      return res.status(404).json({ message: 'No product found' });
    }
    res.status(200).json(filteredProduct);
  } catch (error) {
    console.log('error', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
