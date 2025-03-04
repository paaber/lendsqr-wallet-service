import Paths from '@constants/Paths';
import { UserController } from '@src/controllers/UserController';
import { authenticateToken } from '@src/middlewares/authMiddleware';
import { validate } from '@src/middlewares/validator';
import { UserModel } from '@src/models/UserModel';
import { UserService } from '@src/services/UserService';
import express from 'express';

const userRouter = express.Router();
const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

userRouter.post(
  Paths.Users.Register,
  validate('register'),
  userController.registerUser.bind(userController)
);
userRouter.post(
  Paths.Users.Login,
  validate('login'),
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
  validate('checkBlacklist'),
  userController.checkBlacklist.bind(userController)
);

export default userRouter;
