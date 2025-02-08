import Paths from '@constants/Paths';
import { Router } from 'express';
import userRouter from './UserRoutes';
import walletRouter from './WalletRoutes';

// **** Variables **** //

const v1Router = Router();

// **** Export default **** //
v1Router.use(Paths.Users.Base, userRouter);
v1Router.use(Paths.Wallets.Base, walletRouter);

export default v1Router;
