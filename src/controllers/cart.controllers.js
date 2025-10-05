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

// Update the quantity of a specific cart item
export const updateCartItem = async (req, res, next) => {
    try {

        const {id} = req.params

        // Check for valid objectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'Invalid cart item ID'})
        }

        // Find cart item by ID and update quantity
        const updated = await Cart.findByIdAndUpdate(
            id,
            {quantity: req.body.quantity},
            {new: true}  // Return updated document
        );

        if (!updated) {
            return res.status(404).json({error: 'Cart item not found'});
        }

        res.json(updated);
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
        next(err); // Handle errors
    }
};

