import mongoose from "mongoose";

// Add a product to the cart or increase quantity if already exists
export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        // Check if the item already exists in the user's cart
        const existing = await Cart.findOne({ userId: req.userId, productId });

        if (existing) {
            // Increase quantity if exists
            existing.quantity += quantity;
            await existing.save();
        } else {
            // if not. create new cart item
            await Cart.create({ userId: req.userId, productId, quantity });
        }

        res.json({ message: "Item added to cart" });
    } catch (err) {
        next(err); //error handler
    }
};