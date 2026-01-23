import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
        service: 'VoltDrive Backend',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

export default router;