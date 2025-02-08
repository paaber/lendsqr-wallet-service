import { HttpError } from '@constants/Errors';
import { HttpStatusCodes } from '@src/constants';
import knex from '@src/database/index';
import logger from '@src/logger';

export class WalletModel {
  private tableName = 'wallets';

  private async logTransaction(
    trx: any,
    senderId: string,
    receiverId: string,
    amount: number,
    type: 'fund' | 'transfer' | 'withdraw'
  ): Promise<void> {
    await trx('transactions').insert({
      senderId,
      receiverId,
      amount,
      type,
    });
  }

  async fundWallet(userId: string, amount: number): Promise<void> {
    return knex.transaction(async (trx) => {
      try {
        const user = await trx('users').where({ id: userId }).first();
        if (!user) {
          throw new HttpError('User not found', HttpStatusCodes.NOT_FOUND);
        }

        let wallet = await trx(this.tableName).where({ userId }).first();
        if (!wallet) {
          [wallet] = await trx(this.tableName).insert({
            userId,
            balance: amount,
          });
        } else {
          await trx(this.tableName)
            .where({ userId })
            .update({ balance: knex.raw(`balance + ${amount}`) });
        }
        await this.logTransaction(trx, userId, userId, amount, 'fund');
      } catch (error) {
        throw new HttpError(
          'Failed to fund wallet',
          HttpStatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    });
  }

  // Transfer funds between users
  async transferFunds(
    fromUserId: string,
    toUserId: string,
    amount: number
  ): Promise<void> {
    if (amount <= 0) {
      throw new HttpError(
        'Amount must be greater than zero',
        HttpStatusCodes.BAD_REQUEST
      );
    }
    return knex.transaction(async (trx) => {
      try {
        const [fromUser, toUser] = await Promise.all([
          trx('users').where({ id: fromUserId }).first(),
          trx('users').where({ id: toUserId }).first(),
        ]);

        if (!fromUser || !toUser) {
          throw new HttpError(
            'One or both users not found',
            HttpStatusCodes.NOT_FOUND
          );
        }

        const fromWallet = await trx(this.tableName)
          .where({ userId: fromUserId })
          .first();

        if (!fromWallet || fromWallet.balance < amount) {
          throw new HttpError(
            'Insufficient balance',
            HttpStatusCodes.BAD_REQUEST
          );
        }

        await trx(this.tableName)
          .where({ userId: fromUserId })
          .update({ balance: knex.raw('balance - ?', [amount]) });

        const toWallet = await trx(this.tableName)
          .where({ userId: toUserId })
          .first();

        if (!toWallet) {
          await trx(this.tableName).insert({
            userId: toUserId,
            balance: amount,
          });
        } else {
          await trx(this.tableName)
            .where({ userId: toUserId })
            .update({ balance: knex.raw('balance + ?', [amount]) });
        }
        await this.logTransaction(
          trx,
          fromUserId,
          toUserId,
          amount,
          'transfer'
        );
      } catch (error) {
        logger.error('Error transfering Funds', error);
        throw new HttpError(
          'Failed to transfer funds',
          HttpStatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    });
  }

  // Withdraw funds from a user's wallet
  async withdrawFunds(userId: string, amount: number): Promise<void> {
    return knex.transaction(async (trx) => {
      try {
        const user = await trx('users').where({ id: userId }).first();
        if (!user) {
          throw new HttpError('User not found', HttpStatusCodes.NOT_FOUND);
        }

        // Check if the user has sufficient balance
        const wallet = await trx(this.tableName).where({ userId }).first();
        if (!wallet || wallet.balance < amount) {
          throw new HttpError(
            'Insufficient balance',
            HttpStatusCodes.BAD_REQUEST
          );
        }

        // Deduct the amount from the user's wallet
        await trx(this.tableName)
          .where({ userId })
          .update({ balance: knex.raw('balance - ?', [amount]) });

        await this.logTransaction(trx, userId, userId, amount, 'withdraw');
      } catch (error) {
        throw new HttpError(
          'Failed to withdraw funds',
          HttpStatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    });
  }
}
