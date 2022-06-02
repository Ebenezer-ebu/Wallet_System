import express from "express";

import {
  postProduct,
  listProduct,
  purchaseProduct,
} from "../controller/product_controller";

import { authWallet } from "../middlewares/auth";


import { validateProductCreation } from "../middlewares/validate";

const router = express.Router();

router.post("/stock-product", validateProductCreation, postProduct);
router.get("/get-product", listProduct);
router.put("/purchase-product/:id", authWallet, purchaseProduct);


export default router;
