import express from 'express';
import connectDB from './DB/database.js';
import authRoutes from './routes/auth.js';
import dotenv from "dotenv";

dotenv.config();


const app = express();
const PORT =process.env.PORT || 8080;
app.use(express.json());

connectDB();

//localhost:8080/api/auth/signup
//localhost:8080/api/auth/signin
//localhost:8080/api/products
//localhost:8080/api/cart

app.use('/products', )
app.use('/cart', )
app.use('/api/auth', authRoutes);


// Error handlers
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});


app.listen(PORT, ()=>console.log (`server is running on port ${PORT}`));