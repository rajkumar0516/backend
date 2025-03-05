import express, { Request, Response } from 'express';
import { Product } from '../models/product';
import { uploadMultiple } from '../middlewares/upload';
const router = express.Router();
router.post(
  '/add-multiple',
  uploadMultiple,
  async (req: Request, res: Response) => {
    try {
      const { name, description, price, stock } = req.body;
      const images = (req.files as Express.Multer.File[]).map(
        (file) => file.path
      );
      const product = new Product({
        name,
        description,
        price,
        stock,
        images,
      });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

export default router;
