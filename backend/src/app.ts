import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './env';
import { healthRouter } from './modules/health/health.routes';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';
import {authRouter} from './modules/auth/routes';
import { categoryRouter } from './modules/catalog/category.routes';

export function createApp() {
const app = express();
app.use(cors({origin:  env.CORS_ORIGIN}));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/categories',categoryRouter)
app.use(notFoundHandler);
app.use(errorHandler);

return app;
}
