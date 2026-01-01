import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';

dotenv.config();

// Try to connect to DB (won't crash if it fails)
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});