import express, { Request, Response } from 'express';
import { Product } from '../models/product';
import { uploadMultiple } from '../middlewares/upload';
const router = express.Router();
class ProductController {
  async addProduct(req: Request, res: Response): Promise<void> {
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
}
const addProducts = new ProductController();
router.post(
  '/add-multiple',
  uploadMultiple,
  addProducts.addProduct.bind(ProductController)
);

export default router;
