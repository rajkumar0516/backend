"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../models/product");
const upload_1 = require("../middlewares/upload");
const router = express_1.default.Router();
class ProductController {
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, price, stock } = req.body;
                const images = req.files.map((file) => file.path);
                const product = new product_1.Product({
                    name,
                    description,
                    price,
                    stock,
                    images,
                });
                yield product.save();
                res.status(201).json(product);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
const addProducts = new ProductController();
router.post('/add-multiple', upload_1.uploadMultiple, addProducts.addProduct.bind(ProductController));
exports.default = router;
