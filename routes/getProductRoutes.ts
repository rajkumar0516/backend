import express, { Request, Response, Router } from 'express';
import { Product } from '../models/product';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();
class ProductController {
  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
const getProducts = new ProductController();
router.get('/', authMiddleware, getProducts.getProduct.bind(ProductController));

export default router;
