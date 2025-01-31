/**
 * Environments variables declared here.
 */

import { config as dotenvConfig } from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenvConfig();
}

export default {
  NodeEnv: process.env.NODE_ENV ?? '',
  Port: process.env.PORT ?? 0,
  DatabaseUrl: process.env.DATABASE_URL,
} as const;
