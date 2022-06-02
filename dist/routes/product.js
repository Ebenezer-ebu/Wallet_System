"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controller/product_controller");
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const router = express_1.default.Router();
router.post("/stock-product", validate_1.validateProductCreation, product_controller_1.postProduct);
router.get("/get-product", product_controller_1.listProduct);
router.put("/purchase-product/:id", auth_1.authWallet, product_controller_1.purchaseProduct);
exports.default = router;
