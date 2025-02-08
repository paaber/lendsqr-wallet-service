// src/services/UserService.ts
import { ConflictError, HttpError, NotAllowedError } from '@constants/Errors';
import { HttpStatusCodes } from '@src/constants';
import { UserModel } from '@src/models/UserModel';
import { IUserService } from './types';

export class UserService implements IUserService {
  private userModel: UserModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  // Register a new user
  async registerUser(
    name: string,
    email: string,
    password: string,
    forced: boolean = false
  ): Promise<string> {
    const isBlacklisted = await this.userModel.isBlacklisted(email);

    if (isBlacklisted && !forced) {
      throw new NotAllowedError('User is blacklisted and cannot be registered');
    }

    const isEmailRegistered = await this.userModel.isEmailRegistered(email);
    if (isEmailRegistered) {
      throw new ConflictError('Email is already registered');
    }

    const userId = await this.userModel.createUser(name, email, password);
    return userId;
  }

  // Faux login (no real authentication)
  async loginUser(email: string, password: string): Promise<boolean> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new HttpError('Invalid credentials', HttpStatusCodes.UNAUTHORIZED);
    }

    // For simplicity, treat any non-empty password as valid
    return !!password;
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpError('User not found', HttpStatusCodes.NOT_FOUND);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  // Check if a user is blacklisted
  async isBlacklisted(email: string): Promise<boolean> {
    return this.userModel.isBlacklisted(email);
  }
}
