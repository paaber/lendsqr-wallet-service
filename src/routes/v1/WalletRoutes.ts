import express from 'express';
import Paths from '@src/constants/Paths';
import { WalletController } from '@src/controllers/WalletController';
import { authenticateToken } from '@src/middlewares/authMiddleware';
import { WalletService } from '@src/services/WalletService';
import { WalletModel } from '@src/models/WalletModel';
import { UserSchema } from '@src/util/validation';
import { validate } from '@src/middlewares/validator';

// **** Variables **** //
const walletRouter = express.Router();
const walletModel = new WalletModel();
const walletService = new WalletService(walletModel);
const walletController = new WalletController(walletService);

walletRouter.use(authenticateToken);

// POST /api/v1/wallets/fund
walletRouter.post(
  Paths.Wallets.FundAccount,
  validate('fund'),
  walletController.fundWallet.bind(walletController)
);

// POST /api/v1/wallets/transfer
walletRouter.post(
  Paths.Wallets.TransferFunds,
  validate('transfer'),
  walletController.transferFunds.bind(walletController)
);

// POST /api/v1/wallets/withdraw
walletRouter.post(
  Paths.Wallets.WithdrawFunds,
  validate('withdraw'),
  walletController.withdrawFunds.bind(walletController)
);

export default walletRouter;
