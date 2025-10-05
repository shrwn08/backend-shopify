import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true, // prevent duplicate email
        lowercase: true,
        match: [/.+\@.+\..+/, "Invalid email format"] //validation check
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: 6
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;