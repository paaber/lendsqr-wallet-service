import config from '@root/knexfile';
import { EnvVars } from '@src/constants';
import knex from 'knex';

const environment = EnvVars.NodeEnv || 'development';
const dbConfig = config[environment];

if (!dbConfig || !dbConfig.client) {
  throw new Error(
    `Knex configuration is missing or invalid for environment: ${environment}`
  );
}

const db = knex(dbConfig);

export default db;
