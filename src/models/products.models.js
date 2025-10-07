import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    rating:{
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    thumbnail: {
        type: String,
        default: '',
    }
}, {timestamps: true});

const Products =  mongoose.model('Product', productSchema)
export default Products