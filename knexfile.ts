import "tsconfig-paths/register"; 


import type { Knex } from 'knex';

import EnvVars  from '@constants/EnvVars';





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