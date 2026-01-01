import mongoose from 'mongoose';

let dbConnected = false;

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        dbConnected = true;
        console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        dbConnected = false;
        if (error instanceof Error) {
            console.warn(`⚠️ MongoDB Connection Failed: ${error.message}`);
            console.warn('⚠️ Server starting WITHOUT database - using fallback mode');
        }
        // DO NOT EXIT - let server start anyway even if DB connection fails it will start
    }
};

export { connectDB, dbConnected };