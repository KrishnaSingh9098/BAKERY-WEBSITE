import userModel from "../models/userModels.js"; // User model ko import kar rahe hain jo database se interact karega.
import bcrypt from "bcrypt"; // Bcrypt ko import kar rahe hain, jo password ko hash karega.
import jwt from "jsonwebtoken"; // Jsonwebtoken ko import kar rahe hain, jo authentication tokens generate karega.

export const register = async (req, res) => {  // Register function jo user registration handle karega.
  const { name, email, password } = req.body;  // Request body se name, email, aur password ko destructure kar rahe hain.

  // Agar koi required field (name, email, password) missing hai, to error return kar rahe hain.
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" }); // Agar details missing hain to error message bhej rahe hain.
  }

  try {
    // Check kar rahe hain agar user already exist karta hai provided email ke saath.
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User Already Exists" }); // Agar user already exists, to error return kar rahe hain.
    }

    // Password ko hash kar rahe hain before saving it in the database.
    const hashedPassword = await bcrypt.hash(password, 10); // Password ko 10 salt rounds ke saath hash kar rahe hain.

    // Naya user object bana rahe hain.
    const user = new userModel({
      name,
      email,
      password: hashedPassword, // Hashed password ko database me store kar rahe hain.
    });

    // Naye user ko database me save kar rahe hain.
    await user.save();

    // JWT token create kar rahe hain authentication ke liye.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",  // Token ko 7 din ke liye valid kar rahe hain.
    });

    // Token ko HTTP-only cookie ke roop me set kar rahe hain secure options ke saath.
    res.cookie("token", token, {
      httpOnly: true, // Cookie ko JavaScript se accessible nahi banane de rahe hain (XSS protection).
      secure: process.env.NODE_ENV === "production", // Cookie sirf HTTPS ke saath bhej rahe hain agar production environment hai.
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // SameSite setting cookie security ke liye.
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie ko 7 din ke liye valid kar rahe hain.
    });

    return res.json({ success: true });  // Successful registration ke baad response bhej rahe hain.
  } catch (error) {
    // Agar koi error hota hai to uska message return kar rahe hain.
    res.json({ success: false, message: error.message }); // Error message ko response me bhej rahe hain.
  }
};

// Login function yaha define ho raha hai

export const login = async (req, res) => {
  const { email, password } = req.body; // Request body se email aur password ko destructure kar rahe hain.

  // Agar email ya password nahi diya, to error return kar rahe hain.
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email AND Password BOTH ARE REQUIRED FOR LOGIN", // Dono fields ki requirement ka message bhej rahe hain.
    });
  }

  try {
    // Database me user ko find kar rahe hain email ke through.
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid Email" }); // Agar user nahi milta to invalid email ka message bhej rahe hain.
    }

    // Password ko compare kar rahe hain stored hashed password ke saath.
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" }); // Agar password match nahi hota, to error return kar rahe hain.
    }

    // JWT token create kar rahe hain authentication ke liye.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token ko 7 din ke liye valid kar rahe hain.
    });

    // Token ko HTTP-only cookie ke roop me set kar rahe hain secure options ke saath.
    res.cookie("token", token, {
      httpOnly: true, // Cookie ko JavaScript se accessible nahi banane de rahe hain (XSS protection).
      secure: process.env.NODE_ENV === "production", // Cookie sirf HTTPS ke saath bhej rahe hain agar production environment hai.
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // SameSite setting cookie security ke liye.
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie ko 7 din ke liye valid kar rahe hain.
    });

    return res.json({ success: true, message: "Successfully Logged IN" }); // Login success hone par message bhej rahe hain.
  } catch (error) {
    res.json({ success: false, message: error.message }); // Agar koi error hota hai to error message bhej rahe hain.
  }
};

// Logout function yaha define ho raha hai

export const logOut = async (req, res) => {
    try {
      // Correct way to clear the token cookie
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure this is only true in production (HTTPS)
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiry set to 7 days
      });
  
      return res.json({ success: true, message: "Logged Out Successfully" });
    } catch (error) {
      console.error(error);
      return res.json({ success: false, message: error.message });
    }
  };
  
