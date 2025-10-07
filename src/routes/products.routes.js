import express from 'express';
import {getAllProducts, getProductById} from "../controllers/products.controllers.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);

export default router;