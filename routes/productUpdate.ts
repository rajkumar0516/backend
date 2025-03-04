import express, { Request, Response } from 'express';
import { Product } from '../models/product';
import { uploadMultiple } from '../middlewares/upload';

const router = express.Router();

router.put('/update/:id', uploadMultiple, async (req: any, res: any) => {
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
});

export default router;
