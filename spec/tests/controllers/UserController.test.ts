// spec/tests/controllers/UserController.test.ts
import request from 'supertest';
import app from '@src/server';
import { UserModel } from '@src/models/UserModel';
import { HttpError } from '@constants/Errors';
import HttpStatusCodes from '@constants/HttpStatusCodes';

jest.mock('@src/models/UserModel');

describe('UserController', () => {
  const mockUserModel = new UserModel() as jest.Mocked<UserModel>;

  beforeEach(() => {
    // Mock the UserModel used in the controller
    jest.resetAllMocks();
    jest.spyOn(UserModel.prototype, 'isBlacklisted').mockResolvedValue(false);
    jest.spyOn(UserModel.prototype, 'createUser').mockResolvedValue('user-uuid');
  });

  describe('POST /users/register', () => {
    it('should return 201 on successful registration', async () => {
      const response = await request(app)
        .post('/api/v1/users/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(HttpStatusCodes.CREATED);
      expect(response.body.data.userId).toBe('user-uuid');
    });

    it('should return 400 if user is blacklisted', async () => {
      jest.spyOn(UserModel.prototype, 'isBlacklisted').mockResolvedValue(true);
   

      const response = await request(app)
        .post('/api/v1/users/register')
        .send({
          name: 'John Doe',
          email: 'blacklisted@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    });
  });
});