import "tsconfig-paths/register"; 


import type { Knex } from 'knex';

import EnvVars  from '@constants/EnvVars';

import { config as dotenvConfig } from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenvConfig();
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: EnvVars.DatabaseUrl,
    migrations: {
      directory: './src/database/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
};

export default config;