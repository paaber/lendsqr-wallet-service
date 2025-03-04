// @src/middlewares/validator.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { sendBadRequest } from '@src/util/ApiResponse';
import { UserSchema, WalletSchema } from '@src/util/validation';

type SchemaKey = keyof typeof UserSchema | keyof typeof WalletSchema;

export function validate(schemaKey: SchemaKey) {
  return (req: Request, res: Response, next: NextFunction) => {
    const schema =
      (UserSchema as Record<string, Joi.ObjectSchema>)[schemaKey] ||
      (WalletSchema as Record<string, Joi.ObjectSchema>)[schemaKey];

    const { error } = schema.validate(req.body);

    if (error) {
      return sendBadRequest(res, error.details[0].message);
    }

    next();
  };
}
