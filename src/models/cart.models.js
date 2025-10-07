import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    },
    quantity: {
        type: Number,
        min: 1,
        default: 1
    }
}, {timestamps: true});

const Cart = mongoose.model('Cart', cartSchema)
export default Cart;