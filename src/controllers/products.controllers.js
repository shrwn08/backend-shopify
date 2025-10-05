import Products from "../models/products.models.js";


export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Products.find(); // Fetch all products
        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching products:", err.message);
        res.status(500).json({
            error: "Failed to fetch products",
            details: err.message,
        });
    }
};
