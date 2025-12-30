import { Request, Response } from "express";
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const {name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({name, email, password: hashedPassword});
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(400).json({ message: "Registration failed", error });
        }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

   
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};