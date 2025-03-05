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
const router = express_1.default.Router();
router.get('/filter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, startDate, endDate, stock } = req.query;
        const filter = {};
        if (name) {
            filter.name = { $regex: new RegExp(name, 'i') };
        }
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }
        if (stock !== undefined) {
            filter.stock = stock == 'true' ? { $gt: 0 } : { $eq: 0 };
        }
        const filteredProduct = yield product_1.Product.find(filter);
        if (filteredProduct.length === 0) {
            return res.status(404).json({ message: 'No product found' });
        }
        res.status(200).json(filteredProduct);
    }
    catch (error) {
        console.log('error', error.message);
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
