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
exports.validateProductCreation = exports.validateTransaction = exports.validateLogin = exports.validateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const validateSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().min(3).required().email(),
        password: joi_1.default.string().min(3).required(),
    });
    const value = schema.validate(req.body);
    if (value.error) {
        return res
            .status(400)
            .json({ error: value.error.details[0].message.replace(/"/g, "") });
    }
    return next();
});
exports.validateSignup = validateSignup;
const validateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        password: joi_1.default.string().min(3).required(),
        email: joi_1.default.string().min(3).required().email(),
    });
    const value = schema.validate(req.body);
    if (value.error) {
        return res
            .status(400)
            .json({ error: value.error.details[0].message.replace(/"/g, "") });
    }
    return next();
});
exports.validateLogin = validateLogin;
const validateTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, walletNumber } = req.body;
    const schema = joi_1.default.object({
        amount: joi_1.default.number(),
        walletNumber: joi_1.default.number(),
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
});
exports.validateTransaction = validateTransaction;
const validateProductCreation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price } = req.body;
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        price: joi_1.default.number(),
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
});
exports.validateProductCreation = validateProductCreation;
