import mongoose from 'mongoose';

let dbConnected = false;

const connectDB = async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        
        if (!mongoUri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        console.log('🔄 Attempting to connect to MongoDB...');
        
        await mongoose.connect(mongoUri, {
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        
        dbConnected = true;
        console.log(`✅ MongoDB Connected Successfully!`);
        console.log(`   Host: ${mongoose.connection.host}`);
        console.log(`   Database: ${mongoose.connection.name}`);
    } catch (error) {
        dbConnected = false;
        if (error instanceof Error) {
            console.error(`❌ MongoDB Connection Failed!`);
            console.error(`   Error: ${error.message}`);
            console.warn('⚠️  Server starting WITHOUT database connection');
            console.warn('⚠️  Check MongoDB Atlas credentials and network access');
            
            // Print helpful debugging info
            console.log('\n📋 Debugging Information:');
            console.log(`   MONGODB_URI configured: ${process.env.MONGODB_URI ? '✅ Yes' : '❌ No'}`);
            console.log(`   Check MongoDB Atlas at: https://cloud.mongodb.com`);
            console.log(`   Verify IP whitelist includes your current IP`);
        }
    }
};

export { connectDB, dbConnected };