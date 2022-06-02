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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authWallet = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY;
const generateToken = (payload, secret = secretKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "1d" });
        return token;
    }
    catch (err) {
        console.log(err);
    }
});
exports.generateToken = generateToken;
const verifyToken = (token, secret = secretKey) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = yield jsonwebtoken_1.default.verify(token, secret);
    return decoded;
});
const authWallet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("No token");
        }
        const decoded = (yield verifyToken(token));
        if (!decoded) {
            throw new Error("You are not authorized to do this");
        }
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token provided!",
            error: err,
        });
    }
    return next();
});
exports.authWallet = authWallet;
