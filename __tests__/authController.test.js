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
const authRoutes_1 = require("../routes/authRoutes");
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
jest.mock('../models/user.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
describe('AuthController', () => {
    let req;
    let res;
    let authController;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnThis(),
        };
        authController = new authRoutes_1.AuthController();
    });
    describe('register', () => {
        it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            };
            user_model_1.User.findOne.mockResolvedValue(null);
            bcryptjs_1.default.hash.mockResolvedValue('hashedPassword');
            user_model_1.User.prototype.save.mockResolvedValue({});
            yield authController.register(req, res);
            expect(user_model_1.User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
            expect(bcryptjs_1.default.hash).toHaveBeenCalledWith('password123', 10);
            expect(user_model_1.User.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User registered successfully',
            });
        }));
        it('should return 400 if user already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { email: 'john@example.com' };
            user_model_1.User.findOne.mockResolvedValue({});
            yield authController.register(req, res);
            expect(user_model_1.User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
        }));
    });
    describe('login', () => {
        it('should log in a user', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { email: 'john@example.com', password: 'password123' };
            user_model_1.User.findOne.mockResolvedValue({
                _id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                password: 'hashedPassword',
            });
            bcryptjs_1.default.compare.mockResolvedValue(true);
            jsonwebtoken_1.default.sign.mockReturnValue('token');
            yield authController.login(req, res);
            expect(user_model_1.User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
            expect(bcryptjs_1.default.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
            expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith({ id: '1', name: 'John Doe', email: 'john@example.com' }, process.env.JWT_SECRET, { expiresIn: '1d' });
            expect(res.cookie).toHaveBeenCalledWith('token', 'token', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });
            expect(res.json).toHaveBeenCalledWith({
                message: 'Logged in successfully',
            });
        }));
        it('should return 400 if credentials are invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { email: 'john@example.com', password: 'password123' };
            user_model_1.User.findOne.mockResolvedValue(null);
            yield authController.login(req, res);
            expect(user_model_1.User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        }));
    });
});
