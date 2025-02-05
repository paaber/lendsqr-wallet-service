import express from 'express';
import Paths from '@src/constants/Paths';
import { WalletController } from '@src/controllers/WalletController';

// **** Variables **** //
const walletRouter = express.Router();
const walletController = new WalletController();

walletRouter.post(
  Paths.Wallets.FundAccount,
  walletController.fundWallet.bind(walletController)
);
walletRouter.post(
  Paths.Wallets.TransferFunds,
  walletController.transferFunds.bind(walletController)
);
walletRouter.post(
  Paths.Wallets.WithdrawFunds,
  walletController.withdrawFunds.bind(walletController)
);

export default walletRouter;
