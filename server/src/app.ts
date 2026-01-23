import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { securityHeaders, rateLimiter } from './middleware/security.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { errorHandler } from './middleware/error.middleware';
import healthRoutes from './routes/health.routes';
import carRoutes from './routes/car.routes';
import { dbConnected } from './config/db';

const app: Application = express();

// Security middleware (MUST be first)
app.use(securityHeaders);

// Body size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS
app.use(cors());

// Rate limiting (apply to API routes, NOT health)
app.use('/api', rateLimiter);

// Request logging middleware
app.use(requestLogger);

// DB Status Middleware (optional - for debugging)
app.use((req: Request, res: Response, next: NextFunction) => {
    if (!dbConnected) {
        res.set('X-DB-Status', 'disconnected');
    }
    next();
});

// Health check route (NO rate limiting)
app.use('/health', healthRoutes);

// API Routes (WITH rate limiting)
app.use('/api/cars', carRoutes);

// 404 handler (BEFORE error handler)
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler (MUST be LAST)
app.use(errorHandler);

export default app;