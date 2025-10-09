import mongoose from "mongoose";
import Cart from "../models/cart.models.js";


// Fetch all cart items for the logged-in user
export const getProductCart = async (req, res, next) => {
    try {
        const userId = req.user; // set by verifyToken middleware


        console.log(req);

        // Fetch cart items for this user
        const cartItems = await Cart.find({ userId }).populate('productId'); // optional: include product details

        res.json(cartItems);
    } catch (err) {
        next(err);
    }
};

// Add a product to the cart or increase quantity if already exists
export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        console.log(req.body)

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
        next(err);
    }
};


// Increase quantity by 1
export const increaseQuantity = async (req, res, next) => {
    try {
        const { id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid cart item ID' });
        }

        const updated = await Cart.findByIdAndUpdate(
            id,
            { $inc: { quantity: 1 } }, // Increment quantity by 1
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.json(updated);
    } catch (err) {
        next(err);
    }
};

// Decrease quantity by 1
export const decreaseQuantity = async (req, res, next) => {
    try {
        const { id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid cart item ID' });
        }

        // Find current cart item
        const cartItem = await Cart.findById(id);
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        if (cartItem.quantity <= 1) {
            return res.status(400).json({ error: 'Quantity cannot be less than 1' });
        }

        cartItem.quantity -= 1;
        await cartItem.save();

        res.json(cartItem);
    } catch (err) {
        next(err);
    }
};

// Remove an item from the cart
export const removeFromCart = async (req, res, next) => {
    try {
        // Delete cart item by ID
        const { id } = req.params;

        // Check for valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid cart item ID' });
        }

        const deleted = await Cart.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.json({ message: 'Item removed from cart' });

    } catch (err) {
        next(err);
    }
};

