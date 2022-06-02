import { Request, Response, NextFunction } from "express";
import { User } from "../models/user_wallet";
import { Wallet } from "../models/wallet";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { generateToken } from "../middlewares/auth";

const salt = Number(process.env.SALT);

const signup = async (req: Request, res: Response, next: NextFunction) => {
  let { name, email, password, amount } = req.body;
  const walletNumber = Math.floor(10000000000 + Math.random() * 900000);
  password = await hashPassword(password, salt);
  try {
    const walletDetails = Wallet.build({
      walletNumber,
      amount,
    });
    const registerUser = User.build({
      name,
      email,
      password,
      wallet: walletDetails._id,
    });
    await registerUser.save();
    await walletDetails.save();
    return res.status(201).json(registerUser);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(500)
        .json({ error: err, message: "Email has been taken" });
    }
    return res
      .status(500)
      .json({ error: err, message: "Internal server error" });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email }).populate("wallet");
  if (!userExists) {
    return res.status(404).json({ message: "User not found" });
  }
  const validPassword = await verifyPassword(password, userExists.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Wrong password" });
  }
  let payload = {
    email: userExists.email,
    walletNumber: userExists.wallet,
  };
  const token = await generateToken(payload);
  return res
    .status(200)
    .json({ message: "User login successful", user: userExists, token });
};

export { signup, login };
