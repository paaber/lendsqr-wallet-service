import express from 'express';
import Paths from '@src/constants/Paths';
import { WalletController } from '@src/controllers/WalletController';
import { authenticateToken } from '@src/middlewares/authMiddleware';

// **** Variables **** //
const walletRouter = express.Router();
const walletController = new WalletController();

walletRouter.use(authenticateToken);

// POST /api/v1/wallets/fund
walletRouter.post(
  Paths.Wallets.FundAccount,
  walletController.fundWallet.bind(walletController)
);

// POST /api/v1/wallets/transfer
walletRouter.post(
  Paths.Wallets.TransferFunds,
  walletController.transferFunds.bind(walletController)
);

// POST /api/v1/wallets/withdraw
walletRouter.post(
  Paths.Wallets.WithdrawFunds,
  walletController.withdrawFunds.bind(walletController)
);

export default walletRouter;
