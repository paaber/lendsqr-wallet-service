import knex from 'knex';
import config from '@root/knexfile';

const db = knex(config);

export default db;
