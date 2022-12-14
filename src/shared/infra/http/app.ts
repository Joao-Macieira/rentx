import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import 'express-async-errors';

import createConnection from '@shared/infra/typeorm';

import '@shared/container';
import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

import swaggerFile from '../../../swagger.json';

createConnection();
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error: ${error.message}`,
  });
});

export { app };
