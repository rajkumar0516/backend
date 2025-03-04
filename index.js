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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const getProductRoutes_1 = __importDefault(require("./routes/getProductRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const productDelete_1 = __importDefault(require("./routes/productDelete"));
const database_1 = __importDefault(require("./database"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productUpdate_1 = __importDefault(require("./routes/productUpdate"));
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/products', getProductRoutes_1.default);
app.use('/api/products/', productDelete_1.default);
app.use('/api/products/', productUpdate_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'middlewares/uploads')));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            console.log('Connected to MongoDB');
            // Start the server only after a successful DB connection
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    });
}
main();
