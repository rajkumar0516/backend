import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, IUser } from '../models/user.model';

const router = express.Router();

interface AuthRequestBody {
  name: string;
  email: string;
  password: string;
}

router.post('/register', async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    return res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const { User } = require('../models/user.model');

// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//     console.error('Error registering user:', error);
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(email, password);
//     const user = await User.findOne({ email });
//     console.log(user, 'user');
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const userExist = await bcrypt.compare(password, user.password);
//     if (!userExist) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign(
//       { id: user._id, name: user.name, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );
//     res
//       .cookie('token', token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'none',
//       })
//       .json({ message: 'logged in successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//     console.error('Error logging in user:', error);
//   }
// });

// module.exports = router;
