/**
 * Setup express server.
 */

import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import 'express-async-errors'; // For handling async errors

import BaseRouter from '@src/routes/api';
import Paths from '@src/constants/Paths';
import EnvVars from '@src/constants/EnvVars';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { NodeEnvs } from '@src/constants/misc';
import { RouteError } from '@src/other/classes';
import { corsMiddleware } from './middlewares/cors';
import limiter from './middlewares/rateLimiting';

import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { ApiJsonData } from '@routes/types/express/misc';

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

  let status = HttpStatusCodes.INTERNAL_SERVER_ERROR; // Default to 500
  let message = 'Internal Server Error';

  if (err instanceof RouteError) {
    status = err.status;
    message = err.message;
  }

  return res.status(status).json({ error: message });
});

const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.use('/uploads', express.static(path.join(staticDir, 'uploads')));

// Default route to welcome message
app.get('/', (_: Request, res: Response) => {
  return res.send('WELCOME TO HASTRO');
});

// ** Swagger Setup ** //
app.get(
  `/api${API_VERSION_STRING}/docs/swagger.yaml`,
  (req: Request, res: Response) => {
    const swaggerFile = readFileSync('./src/other/swagger.yaml', 'utf8');
    res.setHeader('Content-Type', 'text/yaml');
    res.send(swaggerFile);
  }
);

const resolveBasePathRoute = () => {
  return EnvVars.NodeEnv === NodeEnvs.Dev
    ? `/api${API_VERSION_STRING}`
    : `${API_VERSION_STRING}`;
};

app.use(
  `/api${API_VERSION_STRING}/docs`,
  swaggerUi.serve,
  swaggerUi.setup(
    {},
    {
      swaggerOptions: {
        url: `${resolveBasePathRoute()}/docs/swagger.yaml`,
      },
    }
  )
);

// ** 404 Not Found Route ** //
app.use((req: Request, res: Response) => {
  res
    .status(HttpStatusCodes.NOT_FOUND)
    .json(new ApiJsonData('error', 'Route not found').valueOf());
});

export default app;
