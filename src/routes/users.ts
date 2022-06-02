import express from "express";

import { signup, login } from "../controller/user_controller";
import {
  fundWallet,
  getWallet,
  withdrawFromWallet,
} from "../controller/wallet_controller";

import {
  validateSignup,
  validateLogin,
  validateTransaction,
} from "../middlewares/validate";

import { authWallet } from "../middlewares/auth";

const router = express.Router();

router.post("/register", validateSignup, signup);
router.post("/login", validateLogin, login);
router.put("/fund-account", validateTransaction, authWallet, fundWallet);
router.put("/withdraw", validateTransaction, authWallet, withdrawFromWallet);
router.get("/get-wallet", authWallet, getWallet);

export default router;
