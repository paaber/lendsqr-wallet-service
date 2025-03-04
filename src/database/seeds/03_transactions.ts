import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  const users = await knex('users').select('id');

  await knex('transactions').del(); // Deletes all existing entries
  await knex('transactions').insert([
    {
      id: uuidv4(),
      senderId: users[0].id,
      receiverId: users[1].id,
      amount: 200.0,
      type: 'transfer',
    },
    {
      id: uuidv4(),
      senderId: users[1].id,
      receiverId: users[0].id,
      amount: 100.0,
      type: 'transfer',
    },
  ]);
}
