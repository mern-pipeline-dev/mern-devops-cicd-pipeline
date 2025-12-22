import express, {Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import carRoutes from './routes/car.routes';

dotenv.config();

connectDB();

const app: Application = express();

app.use('/api/cars', carRoutes);
app.use(cors());
app.use(express.json());

app.get('/cars', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime()});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});