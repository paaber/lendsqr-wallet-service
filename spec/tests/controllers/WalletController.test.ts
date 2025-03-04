// spec/tests/controllers/WalletController.test.ts
import request from 'supertest';
import app from '@src/server';
import { WalletModel } from '@src/models/WalletModel';
import { HttpError } from '@constants/Errors';
import HttpStatusCodes from '@constants/HttpStatusCodes';

jest.mock('@src/models/WalletModel');

describe('WalletController', () => {
  const mockWalletModel = new WalletModel() as jest.Mocked<WalletModel>;

  beforeAll(() => {
    // Mock the WalletModel used in the controller
    jest.spyOn(WalletModel.prototype, 'fundWallet').mockResolvedValue();
  });

  describe('POST /wallets/fund', () => {
    it('should return 200 on successful funding', async () => {
      const response = await request(app)
        .post('/api/v1/wallets/fund')
        .set('Authorization', 'valid-token')
        .send({
          userId: 'user-uuid',
          amount: 1000.00,
        });

      expect(response.status).toBe(HttpStatusCodes.OK);
      expect(response.body.message).toBe('Wallet funded successfully');
    });

    it('should return 400 for invalid amount', async () => {
      const response = await request(app)
        .post('/api/v1/wallets/fund')
        .set('Authorization', 'valid-token')
        .send({
          userId: 'user-uuid',
          amount: -100.00,
        });

      expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    });
  });
});