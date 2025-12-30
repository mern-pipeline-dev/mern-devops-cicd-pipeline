import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db'; // Ensure this path is correct
import carRoutes from './routes/car.routes';

dotenv.config();

connectDB();

const app: Application = express();

// --- MOVED THESE UP ---
// Middleware must come BEFORE routes
app.use(cors());
app.use(express.json()); 
// ----------------------

// Routes
app.use('/api/cars', carRoutes);

app.get('/cars', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});