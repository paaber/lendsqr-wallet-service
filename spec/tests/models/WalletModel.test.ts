import { WalletModel } from '@src/models/WalletModel';
import knex from '@src/database/index';
import { HttpError } from '@constants/Errors';
import HttpStatusCodes from '@constants/HttpStatusCodes';

jest.mock('@src/database/index');

describe('WalletModel', () => {
    let walletModel: WalletModel;
    let mockedWalletModel: jest.Mocked<WalletModel>;
  
    beforeEach(() => {
      walletModel = new WalletModel();

      mockedWalletModel = walletModel as jest.Mocked<WalletModel>;

      jest.spyOn(walletModel as any, 'logTransaction').mockResolvedValue(undefined);
  
      jest.clearAllMocks();
    });

  describe('fundWallet', () => {
    it('should fund the wallet successfully', async () => {
      (knex.transaction as jest.Mock).mockImplementationOnce(async (callback) => {
      
        const trx = jest.fn();
        trx.mockImplementation((tableName: string) => {
          if (tableName === 'users') {
            return {
              where: jest.fn().mockReturnThis(),
              first: jest.fn().mockResolvedValue({ id: 'user-uuid', name: 'John Doe' }),
            };
          } else if (tableName === 'wallets') {
            return {
              where: jest.fn().mockReturnThis(),
              first: jest.fn().mockResolvedValue(null),
              insert: jest.fn().mockResolvedValue([{ id: 'wallet-uuid' }]),
              update: jest.fn().mockResolvedValue(1),
            };
          }

          return {
            where: jest.fn().mockReturnThis(),
            first: jest.fn().mockResolvedValue(null),
          };
        });

        (knex as any).raw = jest.fn().mockReturnValue('balance + 1000');
        return callback(trx);
      });

      await expect(walletModel.fundWallet('user-uuid', 1000)).resolves.not.toThrow();
    });

    it('should throw error on database failure', async () => {
        (knex.transaction as jest.Mock).mockImplementationOnce(async (callback) => {
          const trx = jest.fn().mockImplementation((tableName: string) => {
            if (tableName === 'users') {
              return {
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockRejectedValue(new Error('Database error')),
              };
            }
            return {
              where: jest.fn().mockReturnThis(),
              first: jest.fn().mockResolvedValue(null),
            };
          });
      
          (knex as any).raw = jest.fn().mockReturnValue('balance + 1000');
          return callback(trx);
        });
      
        await expect(walletModel.fundWallet('user-uuid', 1000))
          .rejects.toThrowError('Failed to fund wallet');
      });
      
  });
});
