import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
    status?: number;
}

export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.status || 500;
    const isDev = process.env.NODE_ENV === 'development';

    console.error(`❌ Error [${status}]:`, isDev ? err : err.message);

    if (isDev) {
        // Development: Include stack trace
        res.status(status).json({
            error: {
                message: err.message,
                status,
                stack: err.stack,
            },
        });
    } else {
        // Production: No stack trace
        res.status(status).json({
            error: {
                message: err.message || 'Internal Server Error',
                status,
            },
        });
    }
};
