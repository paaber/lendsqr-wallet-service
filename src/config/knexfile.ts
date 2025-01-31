// src/configs/knexConfig.ts
import knex from 'knex';
import { EnvVars } from '@src/constants';

import { config as dotenvConfig } from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenvConfig();
}

const knexConfig = knex({
  client: 'mysql',
  connection: EnvVars.DatabaseUrl,
  pool: { min: 2, max: 10 },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
});

export default knexConfig;
