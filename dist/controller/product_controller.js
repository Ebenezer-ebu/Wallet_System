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
exports.purchaseProduct = exports.listProduct = exports.postProduct = void 0;
const wallet_1 = require("../models/wallet");
const product_1 = require("../models/product");
const postProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price } = req.body;
    try {
        const product = product_1.Product.build({
            name,
            price,
        });
        yield product.save();
        return res
            .status(201)
            .json({ message: "Product successfully created", product });
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: err });
    }
});
exports.postProduct = postProduct;
const listProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.Product.find({});
        if (product.length === 0) {
            return res.status(200).json({ message: "No product in store" });
        }
        return res.status(200).json(product);
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: err });
    }
});
exports.listProduct = listProduct;
const purchaseProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { walletNumber } = req.user;
    try {
        const myWallet = yield wallet_1.Wallet.findOne({
            walletNumber: walletNumber.walletNumber,
        });
        const product = yield product_1.Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (myWallet.amount < product.price) {
            return res.status(400).json({ message: "Insufficient funds" });
        }
        wallet_1.Wallet.findOneAndUpdate({ walletNumber: walletNumber.walletNumber }, { $inc: { amount: -product.price } }, { new: true })
            .then((wallet) => {
            return res.status(201).json({
                wallet,
                message: "Item purchase successful",
            });
        })
            .catch((error) => res
            .status(400)
            .json({ error, message: "Unable to withdraw from wallet" }));
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: err });
    }
});
exports.purchaseProduct = purchaseProduct;
