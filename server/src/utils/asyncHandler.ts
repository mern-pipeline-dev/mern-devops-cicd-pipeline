import { Request, Response, NextFunction } from 'express';

// Wrapper to catch async errors in route handlers
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
