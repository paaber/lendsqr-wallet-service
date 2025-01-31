import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  const users = await knex('users').select('id'); // Get user IDs

  await knex('wallets').del(); // Deletes all existing entries
  await knex('wallets').insert([
    {
      id: uuidv4(),
      userId: users[0].id,
      balance: 1000.0,
    },
    {
      id: uuidv4(),
      userId: users[1].id,
      balance: 500.0,
    },
  ]);
}
