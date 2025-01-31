import knex from "knex";
import config from "@src/config/knexfile";

const db = knex(config);

export default db;
