import { Request, Response, NextFunction } from "express";
import { Wallet } from "../models/wallet";
import { Product } from "../models/product";

const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { name, price } = req.body;
  try {
    const product = Product.build({
      name,
      price,
    });
    await product.save();
    return res
      .status(201)
      .json({ message: "Product successfully created", product });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

const listProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.find({});
    if (product.length === 0) {
      return res.status(200).json({ message: "No product in store" });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

const purchaseProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { walletNumber } = req.user;
  try {
    const myWallet = await Wallet.findOne({
      walletNumber: walletNumber.walletNumber,
    });
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (myWallet!.amount < product.price) {
      return res.status(400).json({ message: "Insufficient funds" });
    }
    Wallet.findOneAndUpdate(
      { walletNumber: walletNumber.walletNumber },
      { $inc: { amount: -product.price } },
      { new: true }
    )
      .then((wallet) => {
        return res.status(201).json({
          wallet,
          message: "Item purchase successful",
        });
      })
      .catch((error) =>
        res
          .status(400)
          .json({ error, message: "Unable to withdraw from wallet" })
      );
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

export { postProduct, listProduct, purchaseProduct };
