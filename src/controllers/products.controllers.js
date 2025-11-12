import Products from "../models/products.models.js";


export const getAllProducts = async (req, res, next) => {
    try {
        const { search, category, minPrice, maxPrice, sort } = req.query;

        let filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (category && category !== 'all') {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        let sortOption = {};
        if (sort) {
            switch (sort) {
                case 'price-asc':
                    sortOption.price = 1;
                    break;
                case 'price-desc':
                    sortOption.price = -1;
                    break;
                case 'name-asc':
                    sortOption.name = 1;
                    break;
                case 'name-desc':
                    sortOption.name = -1;
                    break;
                case 'rating-desc':
                    sortOption.rating = -1;
                    break;
                default:
                    sortOption.createdAt = -1;
            }
        }

        const products = await Products.find(filter).sort(sortOption);
        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching products:", err.message);
        res.status(500).json({
            error: "Failed to fetch products",
            details: err.message,
        });
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const product = await Products.findById(req.params.id); // Look up product by ID

        //Handle not found
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        next(err);
    }
};

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Products.distinct('category');
        res.status(200).json(categories);
    } catch (err) {
        console.error("Error fetching categories:", err.message);
        res.status(500).json({
            error: "Failed to fetch categories",
            details: err.message,
        });
    }
};

