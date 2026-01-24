import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { dbConnected } from '../config/db';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const mongoStatus = mongoose.connection.readyState;
    const mongoStatusText = mongoStatus === 1 ? 'connected' : mongoStatus === 2 ? 'connecting' : 'disconnected';
    
    res.status(200).json({
        status: 'ok',
        service: 'VoltDrive Backend',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: {
            connected: dbConnected,
            mongoStatus: mongoStatusText,
            host: mongoose.connection.host || 'unknown',
        },
        environment: process.env.NODE_ENV,
    });
});

// Detailed health check
router.get('/detailed', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
        service: 'VoltDrive Backend',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        mongodb: {
            connected: dbConnected,
            readyState: mongoose.connection.readyState,
            host: mongoose.connection.host || 'unknown',
            port: mongoose.connection.port || 'unknown',
            name: mongoose.connection.name || 'unknown',
        },
        environment: {
            nodeEnv: process.env.NODE_ENV,
            port: process.env.PORT,
            corsOrigin: process.env.CORS_ORIGIN,
        },
        memory: {
            rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
            heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
            heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
        },
    });
});

export default router;