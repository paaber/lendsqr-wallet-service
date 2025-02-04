// src/services/UserService.ts
import { UserModel } from '@src/models/UserModel';
import { ConflictError, HttpError } from '@constants/Errors';
import { HttpStatusCodes } from '@src/constants';

export class UserService {
  private userModel: UserModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  // Register a new user
  async registerUser(name: string, email: string, password: string) {
    const isBlacklisted = await this.userModel.isBlacklisted(email);
    if (isBlacklisted) {
      throw new HttpError(
        'User is blacklisted and cannot be registered',
        HttpStatusCodes.UNAUTHORIZED
      );
    }

    const isEmailRegistered = await this.userModel.isEmailRegistered(email);
    if (isEmailRegistered) {
      throw new ConflictError('Email is already registered');
    }

    const userId = await this.userModel.createUser(name, email, password);
    return userId;
  }
}
