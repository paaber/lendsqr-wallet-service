/**
 * Setup express server.
 */

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'; // For handling async errors
import helmet from 'helmet';
import logger from 'jet-logger';
import morgan from 'morgan';
import path from 'path';

import EnvVars from '@constants/EnvVars';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { NodeEnvs } from '@src/constants/misc';
import Paths from '@src/constants/Paths';
import { RouteError } from '@src/other/classes';
import BaseRouter from '@src/routes/api';
import { corsMiddleware } from './middlewares/cors';
import limiter from './middlewares/rateLimiting';

import { ApiJsonData } from '@routes/types/express/misc';
import { HttpError } from './constants/Errors';

// **** Variables **** //

const API_VERSION_STRING = Paths.Version1;
const app = express();

// **** Middleware Setup **** //

// Basic middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Logging (only in development)
if (EnvVars.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security (only in production)
if (EnvVars.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// Routes (must be after middleware)
app.use(Paths.Base, BaseRouter);

// ** Error Handling Middleware ** //

// Global Error Handler (Async and Sync)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test) {
    logger.err(err, true);
  }

  let status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';

  switch (true) {
    case err instanceof HttpError:
      status = err.statusCode;
      message = err.message;
      break;

    case err instanceof RouteError:
      status = err.status;
      message = err.message;
      break;

    default:
      message = err.message || 'Something went wrong';
  }

  return res.status(status).json({ error: message });
});

const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.use('/uploads', express.static(path.join(staticDir, 'uploads')));

// Default route to welcome message
app.get('/', (_: Request, res: Response) => {
  return res.send('WELCOME TO LENDSQUARE');
});

const resolveBasePathRoute = () => {
  return EnvVars.NodeEnv === NodeEnvs.Dev
    ? `/api${API_VERSION_STRING}`
    : `${API_VERSION_STRING}`;
};

// ** 404 Not Found Route ** //
app.use((req: Request, res: Response) => {
  res
    .status(HttpStatusCodes.NOT_FOUND)
    .json(new ApiJsonData('error', 'Route not found').valueOf());
});

export default app;
