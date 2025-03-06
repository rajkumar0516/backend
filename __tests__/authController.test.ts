import { Request, Response } from 'express';
import { AuthController } from '../routes/authRoutes';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../models/user.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let authController: AuthController;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnThis(),
    };
    authController = new AuthController();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      req.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (User.prototype.save as jest.Mock).mockResolvedValue({});

      await authController.register(req as Request, res as Response);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
      });
    });

    it('should return 400 if user already exists', async () => {
      req.body = { email: 'john@example.com' };

      (User.findOne as jest.Mock).mockResolvedValue({});

      await authController.register(req as Request, res as Response);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });
  });

  describe('login', () => {
    it('should log in a user', async () => {
      req.body = { email: 'john@example.com', password: 'password123' };

      (User.findOne as jest.Mock).mockResolvedValue({
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token');

      await authController.login(req as Request, res as Response);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedPassword'
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      expect(res.cookie).toHaveBeenCalledWith('token', 'token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      expect(res.json).toHaveBeenCalledWith({
        message: 'Logged in successfully',
      });
    });

    it('should return 400 if credentials are invalid', async () => {
      req.body = { email: 'john@example.com', password: 'password123' };

      (User.findOne as jest.Mock).mockResolvedValue(null);

      await authController.login(req as Request, res as Response);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
  });
});
