import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import recordsRouter from './routes/records.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: config.allowedOrigins }));
  app.use(express.json({ limit: '100kb' }));

  app.get('/salud', (_request, response) => {
    response.status(200).json({ estado: 'ok' });
  });
  app.use('/registros', recordsRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
