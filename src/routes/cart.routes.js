import express from "express";
import {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
} from "../controllers/cart.controllers.js";
import verifyToken from "../middlewares/verify.middlewares.js";

const router = express.Router();

router.post('/add_to_cart', verifyToken,addToCart);

router.put("/increase_quantity/",verifyToken ,increaseQuantity);
router.put("/decrease_quantity/",verifyToken ,decreaseQuantity);
router.delete("/add_to_cart/:id", verifyToken,removeFromCart);

export default router;