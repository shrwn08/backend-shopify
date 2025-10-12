import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function verifyToken(req, res, next){



    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(403).json({ message: 'Unauthorized access Token missing!!!' });

    const token = authHeader.split(' ')[1];


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // attach userId to request
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}