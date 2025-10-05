import express from 'express';
import connectDB from './DB/database.js';
const app = express();
import dotenv from "dotenv";

dotenv.config();

const PORT =process.env.PORT || 8080;


connectDB();



app.listen(PORT, ()=>console.log (`server is running on port ${PORT}`));