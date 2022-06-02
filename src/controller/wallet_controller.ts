import { Request, Response, NextFunction } from "express";
import { Wallet } from "../models/wallet";
import { User } from "../models/user_wallet";

const fundWallet = async (req: Request, res: Response, next: NextFunction) => {
  const { amount, walletNumber } = req.body;
  try {
    Wallet.findOneAndUpdate(
      { walletNumber },
      { $inc: { amount: amount } },
      { new: true }
    )
      .then((wallet) => {
        return res.status(201).json(wallet);
      })
      .catch((error) =>
        res.status(400).json({ error, message: "Unable to fund account" })
      );
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

const getWallet = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.user;
  try {
    const myWallet = await User.find({ email }).populate("wallet");
    if (!myWallet) {
      return res
        .status(404)
        .json({ message: "wallet not found login to get a wallet" });
    }
    return res.status(200).json(myWallet);
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal server error" });
  }
};

const withdrawFromWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { walletNumber } = req.user;
  const { amount, walletNumber: walletNumber2 } = req.body;
  if (walletNumber.walletNumber !== walletNumber2) {
    return res
      .status(400)
      .json({ message: "This wallet doesn't belong to you" });
  }
  try {
    Wallet.findOneAndUpdate(
      { walletNumber: walletNumber.walletNumber },
      { $inc: { amount: -amount } },
      { new: true }
    )
      .then((wallet) => {
        return res.status(201).json({ wallet, message: `A withdrawal of ${amount} was made successfully` });
      })
      .catch((error) =>
        res
          .status(400)
          .json({ error, message: "Unable to withdraw from wallet" })
      );
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

export { fundWallet, getWallet, withdrawFromWallet };
