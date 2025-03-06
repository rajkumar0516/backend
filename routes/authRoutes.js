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
exports.AuthController = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const router = express_1.default.Router();
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const existingUser = yield user_model_1.User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ message: 'User already exists' });
                }
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const newUser = new user_model_1.User({ name, email, password: hashedPassword });
                yield newUser.save();
                return res.status(201).json({ message: 'User registered successfully' });
            }
            catch (error) {
                console.error('Error registering user:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_model_1.User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }
                const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
                return res
                    .cookie('token', token, {
                    secure: true,
                    sameSite: 'none',
                })
                    .json({ message: 'Logged in successfully' });
            }
            catch (error) {
                console.error('Error logging in user:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.AuthController = AuthController;
const authController = new AuthController();
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
exports.default = router;
// import express from 'express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import { User } from '../models/user.model';
// const router = express.Router();
// class AuthController {
//   async register(req: any, res: any): Promise<void> {
//     try {
//       const { name, email, password } = req.body;
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//       }
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({ name, email, password: hashedPassword });
//       await newUser.save();
//       return res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       console.error('Error registering user:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   }
//   async login(req: any, res: any): Promise<void> {
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
//       const token = jwt.sign(
//         { id: user._id, name: user.name, email: user.email },
//         process.env.JWT_SECRET as string,
//         { expiresIn: '1d' }
//       );
//       return res
//         .cookie('token', token, {
//           httpOnly: true,
//           secure: true,
//           sameSite: 'none',
//         })
//         .json({ message: 'Logged in successfully' });
//     } catch (error) {
//       console.error('Error logging in user:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// }
// const authRegister = new AuthController();
// const authLogin = new AuthController();
// router.post('/register', authRegister.register.bind(AuthController));
// router.post('/login', authLogin.login.bind(AuthController));
// export { AuthController };
// export default router;
