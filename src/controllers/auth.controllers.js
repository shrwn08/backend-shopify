import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import req from "express/lib/request.js";


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

// Login and issue a JWT token
export const loginUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validation checks
        const errors = {};

        // If both email and username not present
        if(!email && !username){
            errors.identifier = "Email or username is required"
        }

        // If both username and email is present
        if (email && username) {
            errors.identifier = "Only one of email or username is allowed";
        }

        // If password is not present
        if (!password) {
            errors.password = "Password is required";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        // Find user by either email or username and password
        const query = email ? { email, password } : { username, password };
        const user = await User.findOne(query);
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Create JWT with user ID
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        next(err);
    }
};

export const updateAddress = async ()=>{
    const {id} = req.userId;
    console.log(id);
}


