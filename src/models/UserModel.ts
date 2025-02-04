// src/models/UserModel.ts
import knex from '../database/index';
import bcrypt from 'bcrypt';
import EnvVars from '@constants/EnvVars';
import { HttpError } from '../constants/Errors';
import { HttpStatusCodes } from '@src/constants';
import { checkKarmaBlacklist } from '@src/util/KarmaLookup';

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
  ): Promise<number> {
    return knex.transaction(async (trx) => {
      try {
        const hashedPassword = await this.hashPassword(password);

        const [userId] = await trx(this.tableName).insert({
          name,
          email,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        });

        return userId;
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
}
