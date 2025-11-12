import express from 'express';
import {getAllProducts, getCategories, getProductById} from "../controllers/products.controllers.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.get("/categories", getCategories);

export default router;