// src/services/WalletService.ts
import { WalletModel } from '@src/models/WalletModel';
import { HttpError } from '@constants/Errors';
import { HttpStatusCodes } from '@src/constants';

export class WalletService {
  private walletModel: WalletModel;

  constructor(walletModel: WalletModel) {
    this.walletModel = walletModel;
  }

  // Fund a user's wallet
  async fundWallet(userId: number, amount: number): Promise<void> {
    if (amount <= 0) {
      throw new HttpError(
        'Amount must be greater than 0',
        HttpStatusCodes.BAD_REQUEST
      );
    }

    await this.walletModel.fundWallet(userId, amount);
  }

  // Transfer funds between users
  async transferFunds(
    fromUserId: number,
    toUserId: number,
    amount: number
  ): Promise<void> {
    if (amount <= 0) {
      throw new HttpError(
        'Amount must be greater than 0',
        HttpStatusCodes.BAD_REQUEST
      );
    }

    if (fromUserId === toUserId) {
      throw new HttpError(
        'Cannot transfer funds to the same user',
        HttpStatusCodes.BAD_REQUEST
      );
    }

    await this.walletModel.transferFunds(fromUserId, toUserId, amount);
  }

  // Withdraw funds from a user's wallet
  async withdrawFunds(userId: number, amount: number): Promise<void> {
    if (amount <= 0) {
      throw new HttpError('Amount must be greater than 0', 400);
    }

    await this.walletModel.withdrawFunds(userId, amount);
  }
}
