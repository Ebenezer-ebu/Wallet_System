"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const walletSchema = new mongoose_1.default.Schema({
    walletNumber: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
walletSchema.statics.build = (attrs) => {
    return new Wallet(attrs);
};
const Wallet = mongoose_1.default.model("Wallet", walletSchema);
exports.Wallet = Wallet;
