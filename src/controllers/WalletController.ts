import { Request, Response } from 'express';
import { WalletService } from '@src/services/WalletService';
import { WalletModel } from '@src/models/WalletModel';
import {
  sendSuccess,
  sendBadRequest,
  sendInternalServerError,
} from '@src/util/ApiResponse';
import logger from '../logger';
import { HttpError } from '@src/constants/Errors';

export class WalletController {
  private walletService: WalletService;

  constructor() {
    const walletModel = new WalletModel();
    this.walletService = new WalletService(walletModel);
  }

  async fundWallet(req: Request, res: Response) {
    const { userId, amount } = req.body;

    try {
      await this.walletService.fundWallet(userId, amount);
      return sendSuccess(res, 'Wallet funded successfully');
    } catch (error: any) {
      logger.error('Error in fundWallet:', error);

      if (error instanceof HttpError) {
        return sendBadRequest(res, error.message);
      } else {
        return sendInternalServerError(res, 'An unexpected error occurred');
      }
    }
  }

  // Transfer funds between users
  async transferFunds(req: Request, res: Response) {
    const { fromUserId, toUserId, amount } = req.body;

    try {
      await this.walletService.transferFunds(fromUserId, toUserId, amount);
      return sendSuccess(res, 'Funds transferred successfully');
    } catch (error: any) {
      logger.error('Error in transferFunds:', error);

      if (error instanceof HttpError) {
        return sendBadRequest(res, error.message);
      } else {
        return sendInternalServerError(res, 'An unexpected error occurred');
      }
    }
  }

  // Withdraw funds from a user's wallet
  async withdrawFunds(req: Request, res: Response) {
    const { userId, amount } = req.body;

    try {
      await this.walletService.withdrawFunds(userId, amount);
      return sendSuccess(res, 'Funds withdrawn successfully');
    } catch (error: any) {
      logger.error('Error in withdrawFunds:', error);

      if (error instanceof HttpError) {
        return sendBadRequest(res, error.message);
      } else {
        return sendInternalServerError(res, 'An unexpected error occurred');
      }
    }
  }
}
