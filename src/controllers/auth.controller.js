import jwt from "jsonwebtoken";
import User from "../models/user.models.js";


// Register a new user
export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validation check
        if (!username && !email && !password) {
            return res.status(400).json({
                error: "Username, email, and password are all required"
            });
        }


        const errors = {};

        if (!username) errors.username = "Username is required";
        if (!email) errors.email = "Email is required";
        if(!password) errors.password = "Password is required";


        if(Object.keys(errors).length > 0){
            return res.status(400).json({ errors })
        }

        // Check if user already exists
        const exists = await User.findOne({ $or: [{ email }, { username }]});
        if (exists) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create user (no hashing, as per instructions)
        await User.create({ username, email, password });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        next(err);
    }
};


