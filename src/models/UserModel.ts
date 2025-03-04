import { HttpError } from '@constants/Errors';
import { HttpStatusCodes } from '@src/constants';
import knex from '@src/database/index';
import { checkKarmaBlacklist } from '@src/util/KarmaLookup';
import bcrypt from 'bcrypt';

export class UserModel {
  private tableName = 'users';

  async isBlacklisted(email: string): Promise<boolean> {
    try {
      return await checkKarmaBlacklist(email);
    } catch (error) {
      throw new HttpError(
        'Error checking blacklist status',
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    const user = await knex(this.tableName).where({ email }).first();
    return !!user;
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    return knex.transaction(async (trx) => {
      try {
        const hashedPassword = await this.hashPassword(password);

        // Insert user
        await trx(this.tableName).insert({
          name,
          email,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        });

        const user = await trx(this.tableName).where({ email }).first();
        return user.id;
      } catch (error) {
        throw new HttpError(
          'Failed to create user',
          HttpStatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    });
  }

  // Hash password using bcrypt
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async findById(userId: string): Promise<any> {
    try {
      const user = await knex(this.tableName).where({ id: userId }).first();
      if (!user) {
        throw new HttpError('User not found', HttpStatusCodes.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpError(
        'Failed to find user',
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const user = await knex(this.tableName).where({ email }).first();

      if (!user) {
        throw new HttpError('User not found', HttpStatusCodes.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpError(
        'Failed to find user',
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
