import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const validateSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(3).required(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return res
      .status(400)
      .json({ error: value.error.details[0].message.replace(/"/g, "") });
  }
  return next();
};

const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    password: Joi.string().min(3).required(),
    email: Joi.string().min(3).required().email(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return res
      .status(400)
      .json({ error: value.error.details[0].message.replace(/"/g, "") });
  }
  return next();
};

const validateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount, walletNumber } = req.body;
  const schema = Joi.object({
    amount: Joi.number(),
    walletNumber: Joi.number(),
  });
  const value = schema.validate({
    amount: Number(amount),
    walletNumber: Number(walletNumber),
  });
  if (value.error) {
    return res
      .status(400)
      .json({ error: value.error.details[0].message.replace(/"/g, "") });
  }
  return next();
};

const validateProductCreation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price } = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number(),
  });
  const value = schema.validate({
    name,
    price: Number(price),
  });
  if (value.error) {
    return res
      .status(400)
      .json({ error: value.error.details[0].message.replace(/"/g, "") });
  }
  return next();
};

export {
  validateSignup,
  validateLogin,
  validateTransaction,
  validateProductCreation,
};
