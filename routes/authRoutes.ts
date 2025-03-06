import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

const router = express.Router();

class AuthController {
  async register(req: any, res: any): Promise<void> {
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
  }

  async login(req: any, res: any): Promise<void> {
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
          secure: true,
          sameSite: 'none',
        })
        .json({ message: 'Logged in successfully' });
    } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

const authController = new AuthController();
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

export { AuthController };
export default router;

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
