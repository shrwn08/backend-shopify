import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Products from "../models/products.models.js";

dotenv.config();
const productSeed = async () => {
    try {
        // Fetch product data
        const res = await fetch("https://dummyjson.com/products");
        const { products } = await res.json();

        let importedCount = 0;
        let skippedCount = 0;

        for (const item of products) {
            // Check if product already exists
            const exists = await Products.findOne({ name: item.title.trim() });

            if (exists) {
                // console.log(`Skipped (already exists): ${item.title}`);
                skippedCount++;
                continue; // skip this product
            }

            // Create new product if not found
            await Products.create({
                name: item.title.trim(),
                price: item.price,
                description: item.description || "",
                stock: item.stock > 0 ? item.stock : 10,
                thumbnail:
                    item.thumbnail || "https://via.placeholder.com/150?text=No+Image",
            });

            // console.log(`Imported: ${item.title}`);
            importedCount++;
        }

        // console.log(
        //     `\nSummary:\n- Imported: ${importedCount}\n- Skipped: ${skippedCount}`
        // );
    } catch (err) {
        console.error("Error importing:", err.message);
    }
};


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
        productSeed()

    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }

}

export default connectDB;