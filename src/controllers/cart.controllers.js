import mongoose from "mongoose";
import Cart from "../models/cart.models.js";

// Fetch all cart items for the logged-in user
export const getProductCart = async (req, res, next) => {
  try {
    const userId = req.userId; // set by verifyToken middleware

    // Fetch cart items for this user
    const cartItems = await Cart.find({ userId }).populate("productId");

    res.json(cartItems);
  } catch (err) {
    next(err);
  }
};

// Add a product to the cart or increase quantity if already exists
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: "Valid quantity is required" });
    }

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

    res.json({
      message: "Item added to cart",
    });
  } catch (err) {
    next(err);
  }
};


export const updateQuantity = async (req, res, next) => {
  try {
    const { id, quantity } = req.body;

    if (quantity < 1)
      return res.status(400).json({ error: "Quantity cannot be less than 1" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid cart item ID" });
    }

    // Find and update the specific cart item
    const updatedItem = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true } // Return the updated document
    ).populate("productId");

    if (!updatedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Fetch updated cart items for the user
    const cartItems = await Cart.find({ userId: updatedItem.userId }).populate(
      "productId"
    );

    res.json(cartItems);
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
      return res.status(400).json({ error: "Invalid cart item ID" });
    }

    const deleted = await Cart.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (req, res) =>{
  try {
      const userId = req.userId;

console.log(userId);

       if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

      const result = await Cart.deleteMany({userId});

      

      return res.status(200).json({
      message: "Cart cleared successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
