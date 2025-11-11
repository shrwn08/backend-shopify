import express from "express";
import {
    addToCart,
    removeFromCart, getProductCart,
    updateQuantity,
    clearCart
} from "../controllers/cart.controllers.js";
import verifyToken from "../middlewares/verify.middlewares.js";

const router = express.Router();
//localhost:8080/api/add_to_cart
router.post('/add_to_cart', verifyToken,addToCart);
router.get("/cart", verifyToken, getProductCart);
// ////http://localhost:8080/api/increase_quantity

router.put("/update_quantity/",verifyToken ,updateQuantity);

router.delete("/remove/:id", verifyToken,removeFromCart);
router.delete("/orderplaced", verifyToken, clearCart)


export default router;