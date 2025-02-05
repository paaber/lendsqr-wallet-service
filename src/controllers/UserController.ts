import { Request, Response } from 'express';
import { UserService } from '@src/services/UserService';
import { UserModel } from '@src/models/UserModel';
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendConflict,
  sendInternalServerError,
} from '@src/util/ApiResponse';
import logger from '../logger';
import { ConflictError, HttpError } from '@src/constants/Errors';

export class UserController {
  private userService: UserService;

  constructor() {
    const userModel = new UserModel();
    this.userService = new UserService(userModel);
  }

  // Register a new user
  async registerUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const userId = await this.userService.registerUser(name, email, password);

      // Use sendCreated for 201 status code
      return sendCreated(res, 'User registered successfully', { userId });
    } catch (error: any) {
      logger.error('Error in registerUser:', error);

      if (error instanceof ConflictError) {
        return sendConflict(res, error.message);
      } else if (error instanceof HttpError) {
        return sendBadRequest(res, error.message);
      } else {
        return sendInternalServerError(res, 'An unexpected error occurred');
      }
    }
  }
}
