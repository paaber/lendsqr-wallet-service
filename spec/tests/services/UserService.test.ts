// spec/tests/services/UserService.test.ts
import { UserService } from '@src/services/UserService';
import { UserModel } from '@src/models/UserModel';
import { HttpError } from '@constants/Errors';
import HttpStatusCodes from '@constants/HttpStatusCodes';

jest.mock('@src/models/UserModel');

describe('UserService', () => {
  let userService: UserService;
  const mockUserModel = new UserModel() as jest.Mocked<UserModel>;

  beforeEach(() => {
    userService = new UserService(mockUserModel);
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a user successfully', async () => {
      mockUserModel.isBlacklisted.mockResolvedValue(false);
      mockUserModel.isEmailRegistered.mockResolvedValue(false);
      mockUserModel.createUser.mockResolvedValue('user-uuid');

      const userId = await userService.registerUser('John Doe', 'john@example.com', 'password123');
      expect(userId).toBe('user-uuid');
    });

    it('should throw error if user is blacklisted', async () => {
      mockUserModel.isBlacklisted.mockResolvedValue(true);

      await expect(userService.registerUser('John Doe', 'john@example.com', 'password123'))
        .rejects.toThrow(new HttpError('User is blacklisted and cannot be registered', HttpStatusCodes.BAD_REQUEST));
    });
  });

  describe('loginUser', () => {
    it('should return true for valid credentials', async () => {
      mockUserModel.findByEmail.mockResolvedValue({ id: 'user-uuid', email: 'john@example.com' });

      const result = await userService.loginUser('john@example.com', 'password123');
      expect(result).toBe(true);
    });

    it('should throw error for invalid credentials', async () => {
      mockUserModel.findByEmail.mockResolvedValue(null);

      await expect(userService.loginUser('nonexistent@example.com', 'password123'))
        .rejects.toThrow(new HttpError('Invalid credentials', HttpStatusCodes.UNAUTHORIZED));
    });
  });
});