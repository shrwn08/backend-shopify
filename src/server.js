import express from 'express';
import connectDB from './DB/database.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import {notFound} from "./middlewares/errorHandler.middlewares.js";
import {errorHandler} from "./middlewares/errorHandler.middlewares.js";
import cors from "cors";


import dotenv from "dotenv";

dotenv.config();


const app = express();
const PORT =process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

//http://localhost:8080/api/auth/register
//localhost:8080/api/auth/login
//localhost:8080/api/products
//localhost:8080/api/add_to_cart
//http://localhost:8080/api/

app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api/auth', authRoutes);


// Error handlers
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});


app.listen(PORT, ()=>console.log (`server is running on port ${PORT}`));