import type { Request, Response } from 'express';

export const getHealth = (_req: Request, res: Response) => {
     res.json({ status: 'ok', uptime: Math.floor(process.uptime()), timestamp: new Date().toISOString() })
}