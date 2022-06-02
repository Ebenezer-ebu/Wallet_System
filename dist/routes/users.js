"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user_controller");
const wallet_controller_1 = require("../controller/wallet_controller");
const validate_1 = require("../middlewares/validate");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/register", validate_1.validateSignup, user_controller_1.signup);
router.post("/login", validate_1.validateLogin, user_controller_1.login);
router.put("/fund-account", validate_1.validateTransaction, auth_1.authWallet, wallet_controller_1.fundWallet);
router.put("/withdraw", validate_1.validateTransaction, auth_1.authWallet, wallet_controller_1.withdrawFromWallet);
router.get("/get-wallet", auth_1.authWallet, wallet_controller_1.getWallet);
exports.default = router;
