import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table
      .uuid('senderId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('receiverId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.decimal('amount', 15, 2).notNullable();
    table.enum('type', ['fund', 'transfer', 'withdraw']).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transactions');
}
