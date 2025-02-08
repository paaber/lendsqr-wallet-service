import express from 'express';
import Paths from '@constants/Paths';
import { UserController } from '@src/controllers/UserController';
import { authenticateToken } from '@src/middlewares/authMiddleware';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post(
  Paths.Users.Register,
  userController.registerUser.bind(userController)
);
userRouter.post(
  Paths.Users.Login,
  userController.loginUser.bind(userController)
);

// Protected routes (require authentication)
userRouter.use(authenticateToken);

userRouter.get(
  Paths.Users.Profile,
  userController.getUserProfile.bind(userController)
);
userRouter.post(
  Paths.Users.CheckBlacklist,
  userController.checkBlacklist.bind(userController)
);

export default userRouter;
