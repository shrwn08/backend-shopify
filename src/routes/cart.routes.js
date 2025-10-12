import express from "express";
import {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity, getProductCart
} from "../controllers/cart.controllers.js";
import verifyToken from "../middlewares/verify.middlewares.js";

const router = express.Router();
//localhost:8080/api/add_to_cart
router.post('/add_to_cart', verifyToken,addToCart);
router.get("/cart", verifyToken, getProductCart);
////http://localhost:8080/api/increase_quantity
router.put("/increase_quantity/",verifyToken ,increaseQuantity);
router.put("/decrease_quantity/",verifyToken ,decreaseQuantity);
router.delete("/add_to_cart/:id", verifyToken,removeFromCart);


export default router;