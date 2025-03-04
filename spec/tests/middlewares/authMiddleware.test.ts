import { HttpError } from '@constants/Errors';
import HttpStatusCodes from '@constants/HttpStatusCodes';
import { authenticateToken } from '@src/middlewares/authMiddleware';
import { NextFunction, Request, Response } from 'express';

describe('authenticateToken', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = { headers: {} };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should call next() if a valid token is present', () => {
    mockRequest.headers = { authorization: 'valid-token' };
    authenticateToken(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should return 401 if token is missing', () => {
    expect(() => authenticateToken(mockRequest as Request, mockResponse as Response, nextFunction))
      .toThrowError(new HttpError('Unauthorized: Missing token', HttpStatusCodes.UNAUTHORIZED));
  });
  
});
