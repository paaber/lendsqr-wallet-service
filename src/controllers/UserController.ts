import {
  ConflictError,
  HttpError,
  NotAllowedError,
} from '@src/constants/Errors';
import { UserModel } from '@src/models/UserModel';
import { UserService } from '@src/services/UserService';
import {
  sendBadRequest,
  sendConflict,
  sendCreated,
  sendInternalServerError,
  sendSuccess,
  sendUnauthorized,
} from '@src/util/ApiResponse';
import { Request, Response } from 'express';
import logger from '../logger';

export class UserController {
  private userService: UserService;

  constructor() {
    const userModel = new UserModel();
    this.userService = new UserService(userModel);
  }

  // Register a new user
  async registerUser(req: Request, res: Response) {
    const { name, email, password, forced } = req.body;

    try {
      const userId = await this.userService.registerUser(
        name,
        email,
        password,
        forced
      );
      // Use sendCreated for 201 status code
      return sendCreated(res, 'User registered successfully', { userId });
    } catch (error: any) {
      logger.error('Error in registerUser:', error);

      switch (true) {
        case error instanceof ConflictError:
          return sendConflict(res, error.message);
        case error instanceof HttpError:
          return sendBadRequest(res, error.message);
        case error instanceof NotAllowedError:
          return sendBadRequest(res, error.message);
        default:
          return sendInternalServerError(res, 'An unexpected error occurred');
      }
    }
  }

  // Faux login (no real authentication)
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      // Add your login logic here (e.g., validate credentials)
      return sendSuccess(res, 'Login successful');
    } catch (error: any) {
      logger.error('Error in loginUser:', error);
      return sendUnauthorized(res, 'Invalid credentials');
    }
  }

  // Get user profile
  async getUserProfile(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const user = await this.userService.getUserProfile(userId);
      return sendSuccess(res, 'User profile retrieved', user);
    } catch (error: any) {
      logger.error('Error in getUserProfile:', error);
      return sendBadRequest(res, error.message);
    }
  }

  // Check if a user is blacklisted
  async checkBlacklist(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const isBlacklisted = await this.userService.isBlacklisted(email);
      return sendSuccess(res, 'Blacklist check successful', { isBlacklisted });
    } catch (error: any) {
      logger.error('Error in checkBlacklist:', error);
      return sendBadRequest(res, error.message);
    }
  }
}
