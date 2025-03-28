import express from 'express';
import { Product } from '../models/product';
import { uploadMultiple } from '../middlewares/upload';
import authMiddleware from '../middlewares/authMiddleware';
const router = express.Router();
class ProductController {
  async updateProduct(req: any, res: any): Promise<void> {
    try {
      const id = req.params.id;
      const { name, description, price } = req.body;
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const newImages = req.files
        ? req.files.map((file: Express.Multer.File) => file.path)
        : existingProduct.images;

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, description, price, images: newImages },
        { new: true, runValidators: true }
      );
      return res.status(200).json({
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
const updateSingleProduct = new ProductController();
router.put(
  '/update/:id',
  authMiddleware,
  uploadMultiple,
  updateSingleProduct.updateProduct.bind(ProductController)
);

export default router;
