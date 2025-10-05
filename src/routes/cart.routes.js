import express from "express";
import {addToCart, updateCartItem, removeFromCart} from "../controllers/cart.controllers.js";


const router = express.Router();

router.post('/', addToCart);

router.put("/:id", updateCartItem);

router.delete("/:id", removeFromCart);

export default router;