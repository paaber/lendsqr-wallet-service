/**
 * Environments variables declared here.
 */

export default {
  NodeEnv: process.env.NODE_ENV ?? "",
  Port: process.env.PORT ?? 0,
  DatabaseUrl: process.env.DB_URL,

} as const;
