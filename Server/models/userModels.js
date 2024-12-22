import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';


// Define User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  // Corrected from 'require' to 'required'
    },
    email: {
        type: String,
        required: true,  // Corrected from 'require' to 'required'
        unique: true
    },
    password: {
        type: String,
        required: true  // Corrected from 'require' to 'required'
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpiresAt: {
        type: Number,
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpiresAt: {  // Corrected from 'resetOtpExpierAt' to 'resetOtpExpiresAt'
        type: Number,
        default: 0
    }
});

// Create User model from the schema
// const userModel = mongoose.models.userModel || mongoose.model('User', userSchema);

// module.exports = userModel;  // Export the User model

// In userModels.js (ES Module Export)
const userModel = mongoose.models.userModel || mongoose.model('User', userSchema);
export default userModel;
