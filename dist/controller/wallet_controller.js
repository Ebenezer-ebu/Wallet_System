"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawFromWallet = exports.getWallet = exports.fundWallet = void 0;
const wallet_1 = require("../models/wallet");
const user_wallet_1 = require("../models/user_wallet");
const fundWallet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, walletNumber } = req.body;
    try {
        wallet_1.Wallet.findOneAndUpdate({ walletNumber }, { $inc: { amount: amount } }, { new: true })
            .then((wallet) => {
            return res.status(201).json(wallet);
        })
            .catch((error) => res.status(400).json({ error, message: "Unable to fund account" }));
    }
    catch (err) {
        return res
            .status(500)
            .json({ error: err, message: "Internal Server Error" });
    }
});
exports.fundWallet = fundWallet;
const getWallet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    try {
        const myWallet = yield user_wallet_1.User.find({ email }).populate("wallet");
        if (!myWallet) {
            return res
                .status(404)
                .json({ message: "wallet not found login to get a wallet" });
        }
        return res.status(200).json(myWallet);
    }
    catch (err) {
        return res
            .status(500)
            .json({ error: err, message: "Internal server error" });
    }
});
exports.getWallet = getWallet;
const withdrawFromWallet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletNumber } = req.user;
    const { amount, walletNumber: walletNumber2 } = req.body;
    if (walletNumber.walletNumber !== walletNumber2) {
        return res
            .status(400)
            .json({ message: "This wallet doesn't belong to you" });
    }
    try {
        wallet_1.Wallet.findOneAndUpdate({ walletNumber: walletNumber.walletNumber }, { $inc: { amount: -amount } }, { new: true })
            .then((wallet) => {
            return res.status(201).json({ wallet, message: `A withdrawal of ${amount} was made successfully` });
        })
            .catch((error) => res
            .status(400)
            .json({ error, message: "Unable to withdraw from wallet" }));
    }
    catch (err) {
        return res
            .status(500)
            .json({ error: err, message: "Internal Server Error" });
    }
});
exports.withdrawFromWallet = withdrawFromWallet;
