import { Request, Response } from "express";
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const {name, email, password} = req.body;

        console.log("📝 Register request received:", { name, email, passwordLength: password?.length });

        // Validate input
        if (!name || !email || !password) {
            console.warn("❌ Validation failed: Missing required fields");
            res.status(400).json({ message: "Name, email, and password are required" });
            return;
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.warn("❌ User already exists:", email);
            res.status(400).json({ message: "Email already registered" });
            return;
        }

        console.log("🔐 Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log("💾 Creating user document...");
        const user = new User({name, email, password: hashedPassword});
        
        console.log("💿 Saving to MongoDB...");
        await user.save();

        console.log("✅ User registered successfully:", user._id);
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        res.status(201).json({ 
            message: "User registered successfully",
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role 
            }
        });
        } catch (error) {
            console.error("❌ Register error:", error);
            if (error instanceof Error) {
                console.error("   Error message:", error.message);
                console.error("   Error stack:", error.stack);
                res.status(400).json({ 
                    message: "Registration failed", 
                    error: error.message,
                    details: process.env.NODE_ENV === 'development' ? error.stack : undefined
                });
            } else {
                res.status(400).json({ message: "Registration failed", error: "Unknown error" });
            }
        }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }

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

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof Error) {
        res.status(500).json({ message: "Login error", error: error.message });
    } else {
        res.status(500).json({ message: "Login error", error: "Unknown error" });
    }
  }
};