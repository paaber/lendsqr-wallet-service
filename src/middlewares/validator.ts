import { HttpStatusCodes } from '@src/constants';
import { ResponseStatus, sendJsonResponse } from '@src/util/ApiResponse';
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateBody = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return sendJsonResponse({
        responseCtx: res,
        statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
        status: ResponseStatus.ERROR,
        message: error.details[0].message,
      });
    }

    next();
  };
};

export const validateQueryParams = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query);

    if (error) {
      return sendJsonResponse({
        responseCtx: res,
        statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
        status: ResponseStatus.ERROR,
        message: error.details[0].message,
      });
    }

    next();
  };
};

export const validatePathParams = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);

    if (error) {
      return sendJsonResponse({
        responseCtx: res,
        statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
        status: ResponseStatus.ERROR,
        message: error.details[0].message,
      });
    }

    next();
  };
};
