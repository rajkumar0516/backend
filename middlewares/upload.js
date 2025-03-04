"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultiple = exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, path_1.default.join(__dirname, 'uploads')),
    filename: (req, file, cb) => cb(null, Date.now() + path_1.default.extname(file.originalname)),
});
const fileFilter = (req, file, cb) => {
    file.mimetype.startsWith('image/')
        ? cb(null, true)
        : cb(new Error('Only images allowed!'));
};
exports.uploadSingle = (0, multer_1.default)({ storage, fileFilter }).single('image');
exports.uploadMultiple = (0, multer_1.default)({ storage, fileFilter }).array('images', 5);
