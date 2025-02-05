import express from 'express';
import Paths from '@constants/Paths';
import UserController from '../controllers/UserController';

const userRouter = express.Router();

// **** Routes **** //
userRouter.post(Paths.Users.Register, UserController.registerUser);
userRouter.post(Paths.Users.Login, UserController.loginUser);
userRouter.get(Paths.Users.Profile, UserController.getUserProfile);
userRouter.post(Paths.Users.FundAccount, UserController.fundAccount);
userRouter.post(Paths.Users.TransferFunds, UserController.transferFunds);
userRouter.post(Paths.Users.WithdrawFunds, UserController.withdrawFunds);

export default userRouter;
