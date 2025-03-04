import { Response } from 'express';
import HttpStatusCodes from '@constants/HttpStatusCodes';

// Types
type Data = { [key: string]: any };
type Status = 'success' | 'error';

interface IApiResponse<T = Data> {
  status: Status;
  message: string;
  data?: T;
}

// Utility Class
export default class ApiResponse<T = Data> {
  private response: IApiResponse<T>;

  constructor(status: Status, message: string, data?: T) {
    this.response = { status, message, data };
  }

  public send(res: Response, statusCode: number): Response {
    return res.status(statusCode).json(this.response);
  }
}

// Predefined Responses
export function sendSuccess<T = Data>(
  res: Response,
  message: string,
  data?: T
): Response {
  return new ApiResponse<T>('success', message, data).send(
    res,
    HttpStatusCodes.OK
  );
}

export function sendCreated<T = Data>(
  res: Response,
  message: string,
  data?: T
): Response {
  return new ApiResponse<T>('success', message, data).send(
    res,
    HttpStatusCodes.CREATED
  );
}

export function sendBadRequest(
  res: Response,
  message = 'Bad request'
): Response {
  return new ApiResponse('error', message).send(
    res,
    HttpStatusCodes.BAD_REQUEST
  );
}

export function sendUnauthorized(
  res: Response,
  message = 'Unauthorized'
): Response {
  return new ApiResponse('error', message).send(
    res,
    HttpStatusCodes.UNAUTHORIZED
  );
}

export function sendForbidden(res: Response, message = 'Forbidden'): Response {
  return new ApiResponse('error', message).send(res, HttpStatusCodes.FORBIDDEN);
}

export function sendNotFound(
  res: Response,
  message = 'Resource not found'
): Response {
  return new ApiResponse('error', message).send(res, HttpStatusCodes.NOT_FOUND);
}

export function sendConflict(
  res: Response,
  message = 'Resource already exists'
): Response {
  return new ApiResponse('error', message).send(res, HttpStatusCodes.CONFLICT);
}

export function sendInternalServerError(
  res: Response,
  message = 'Internal server error'
): Response {
  return new ApiResponse('error', message).send(
    res,
    HttpStatusCodes.INTERNAL_SERVER_ERROR
  );
}
