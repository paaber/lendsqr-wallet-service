import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del(); // Deletes all existing entries
  await knex('users').insert([
    {
      id: uuidv4(),
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    },
    {
      id: uuidv4(),
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password456',
    },
  ]);
}
