import express from 'express';
import { Product } from '../models/product';
import authMiddleware from '../middlewares/authMiddleware';
const router = express.Router();

router.delete('/delete/:id', authMiddleware, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
