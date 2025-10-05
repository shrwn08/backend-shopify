import express from "express";
import {addToCart, updateCartItem, removeFromCart} from "../controllers/cart.controllers.js";
import verifyToken from "../middlewares/verify.middlewares.js";

const router = express.Router();

router.post('/', verifyToken,addToCart);

router.put("/:id",verifyToken ,updateCartItem);

router.delete("/:id", verifyToken,removeFromCart);

export default router;