// @src/util/validation.ts
import Joi from 'joi';

// User schemas
export const UserSchema = {
  register: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  checkBlacklist: Joi.object({
    email: Joi.string().email().required(),
  }),
};

// Wallet schemas
export const WalletSchema = {
  fund: Joi.object({
    userId: Joi.string().required(),
    amount: Joi.number().min(0.01).required(),
  }),

  transfer: Joi.object({
    fromUserId: Joi.string().required(),
    toUserId: Joi.string().required(),
    amount: Joi.number().min(0.01).required(),
  }),

  withdraw: Joi.object({
    userId: Joi.string().required(),
    amount: Joi.number().min(0.01).required(),
  }),
};
