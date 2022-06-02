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
exports.login = exports.signup = void 0;
const user_wallet_1 = require("../models/user_wallet");
const wallet_1 = require("../models/wallet");
const bcrypt_1 = require("../utils/bcrypt");
const auth_1 = require("../middlewares/auth");
const salt = Number(process.env.SALT);
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password, amount } = req.body;
    const walletNumber = Math.floor(10000000000 + Math.random() * 900000);
    password = yield (0, bcrypt_1.hashPassword)(password, salt);
    try {
        const walletDetails = wallet_1.Wallet.build({
            walletNumber,
            amount,
        });
        const registerUser = user_wallet_1.User.build({
            name,
            email,
            password,
            wallet: walletDetails._id,
        });
        yield registerUser.save();
        yield walletDetails.save();
        return res.status(201).json(registerUser);
    }
    catch (err) {
        if (err.code === 11000) {
            return res
                .status(500)
                .json({ error: err, message: "Email has been taken" });
        }
        return res
            .status(500)
            .json({ error: err, message: "Internal server error" });
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userExists = yield user_wallet_1.User.findOne({ email }).populate("wallet");
    if (!userExists) {
        return res.status(404).json({ message: "User not found" });
    }
    const validPassword = yield (0, bcrypt_1.verifyPassword)(password, userExists.password);
    if (!validPassword) {
        return res.status(400).json({ message: "Wrong password" });
    }
    let payload = {
        email: userExists.email,
        walletNumber: userExists.wallet,
    };
    const token = yield (0, auth_1.generateToken)(payload);
    return res
        .status(200)
        .json({ message: "User login successful", user: userExists, token });
});
exports.login = login;
