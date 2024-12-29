import dotenv from 'dotenv';
dotenv.config();
import userModel from "../models/userModels.js"; // User model ko import kar rahe hain jo database se interact karega.
import bcrypt from "bcrypt"; // Bcrypt ko import kar rahe hain, jo password ko hash karega.
import jwt from "jsonwebtoken"; // Jsonwebtoken ko import kar rahe hain, jo authentication tokens generate karega.
import transporter from "../config/nodeMailer.js";

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

    //Sending Welcome Email

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome To Mama BAker`s',
      text: `Welcome to MAMA BAKER'S . We Provide Delicious Bakery Products Mr. id:  ${email}`
    }

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  
    console.log(mailOptions)
    
    
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
  

// Sending the verification OTP to the User

// export const sendVerifyOtp = async (req, res) => {
//   try {
//     const { userId } = req.body; // Request body se userId le rahe hain
//     const user = await userModel.findById(userId); // User ko database se find kar rahe hain userId ke through

//     // Agar user ka account already verify ho chuka hai
//     if (user.isAccountVerified) {
//       return res.json({ success: false, message: "Account already Verified" }); // Agar account verify ho gaya hai to message bhej rahe hain
//     }

//     // OTP generate kar rahe hain (6 digit ka random number)
//     const Otp = String(Math.floor(100000 + Math.random() * 900000));

//     // User ke OTP aur expiration time ko set kar rahe hain
//     user.verifyOtp = Otp;
//     user.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // OTP ko 24 hours ke liye valid bana rahe hain

//     // User ko save kar rahe hain with new OTP
//     await user.save();

//     // OTP email bhejne ke liye mailOptions set kar rahe hain
//     const mailOptions = {
//       from: process.env.SENDER_EMAIL, // Sender ka email
//       to: user.email, // Recipient ka email (user ka email)
//       subject: 'Account Verification OTP', // Email subject
//       text: `Your OTP is ${Otp} . Verify Your account using this OTP.` // Email ka content
//     };

//     // OTP email bhej rahe hain
//     await transporter.sendMail(mailOptions);

//     // Response bhej rahe hain ki OTP successfully bhej diya gaya hai
//     res.json({ success: true, message: 'Verification OTP has been sent on email' });

//   } catch (error) {
//     return res.json({ success: false, message: error.message }); // Agar koi error aata hai to uska message bhej rahe hain
//   }
// }
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log('userId received:', userId); // Debugging userId

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (!user.isAccountVerified) {
      return res.json({ success: false, message: 'Account already Verified' });
    }

    // if(user.isAccountVerified){
    //   return res.json({ success: false, message: 'Account already Verified' });
    // }
    const Otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = Otp;
    user.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Account Verification OTP',
      text: `Your OTP is ${Otp}. Verify your account using this OTP.`,
    };

    // Log here to check if email is being sent
    console.log('Sending OTP to:', user.email);

    try {
      await transporter.sendMail(mailOptions);
      console.log('OTP email sent successfully');
      res.json({ success: true, message: 'Verification OTP has been sent on email' });
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return res.json({ success: false, message: 'Error sending OTP email' });
    }

  } catch (error) {
    console.error('Error in sendVerifyOtp:', error);
    return res.json({ success: false, message: error.message });
  }
};

// Verifying the OTP entered by the user

// export const VerifiedEmail = async (req, res) => {
//   const { userId, Otp } = req.body; // Request body se userId aur OTP le rahe hain
// console.log(userId,Otp)
//   // Agar userId ya OTP missing hai to error message bhej rahe hain
//   if (!userId || !Otp) {
//     return res.json({ success: false, message: `Missing ID: ${userId} or Missing OTP: ${Otp} details` });
//   }

//   try {
//     const user = await userModel.findById(userId); // User ko database se find kar rahe hain userId ke through

//     // Agar user nahi milta to error bhej rahe hain
//     if (!user) {
//       return res.json({ success: false, message: 'User Not Found' });
//     }

//     // Agar user ka OTP blank hai ya jo OTP user ne diya hai wo sahi nahi hai
//     if (user.verifyOtp === '' || user.verifyOtp !== Otp) {
//       return res.json({ success: false, message: 'Invalid OTP' });
//     }

//     // Agar OTP expired ho gaya hai
//     if (user.verifyOtpExpiresAt < Date.now()) {
//       return res.json({ success: false, message: 'OTP Expired' });
//     }

//     // OTP verification successful, account ko verify kar rahe hain
//     user.isAccountVerified = true; // Account ko verify kar rahe hain
//     user.verifyOtp = ''; // OTP ko clear kar rahe hain
//     user.verifyOtpExpiresAt = 0; // OTP expiration time ko reset kar rahe hain

//     // User ko save kar rahe hain updated data ke saath
//     await user.save();
//     console.log('Received userId:', userId);
//     console.log('Received OTP:', Otp);
    
//     // Response bhej rahe hain ki email successfully verify ho gaya
//     return res.json({ success: true, message: 'Email verified successfully' });

//   } catch (error) {
//     return res.json({ success: false, message: error.message }); // Agar koi error aata hai to uska message bhej rahe hain
//   }
// }

export const VerifiedEmail = async (req, res) => {
  const { userId, Otp } = req.body;
  console.log('Request Body:', req.body); // Log the whole request body to check if userId and OTP are received correctly

  // Check if userId or OTP is missing
  if (!userId && !Otp) {
    return res.json({ success: false, message: 'Missing both userId and OTP' });
  }

  if (!userId) {
    return res.json({ success: false, message: 'Missing userId' });
  }

  if (!Otp) {
    return res.json({ success: false, message: 'Missing OTP' });
  }

  try {
    const user = await userModel.findById(userId); // Find user by userId
    console.log('User found:', user); // Log the user to verify it was retrieved correctly

    // If user is not found
    if (!user) {
      return res.json({ success: false, message: 'User Not Found' });
    }

    // Check OTP
    console.log('Stored OTP:', user.verifyOtp); // Log stored OTP
    console.log('Received OTP:', Otp); // Log received OTP

    // If OTP is incorrect or empty
    if (!user.verifyOtp || user.verifyOtp !== Otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }

    // Check if OTP expired
    console.log('OTP Expiration:', user.verifyOtpExpiresAt); // Log OTP expiration time
    if (user.verifyOtpExpiresAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' });
    }

    // OTP verification successful
    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpiresAt = 0;

    // Save updated user data
    await user.save();
    console.log('OTP verified successfully for userId:', userId);

    // Send success response
    return res.json({ success: true, message: 'Email verified successfully' });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// IS User Are Authenticated


export const isAuthenticated = async (req,res)=>{
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message }); 
  }
}

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  // Validate the email
  if (!email) {
    return res.json({ success: false, message: 'Email is required' });
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email });

    // If user is not found, return an error
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Generate a random 6-digit OTP
    const Otp = String(Math.floor(100000 + Math.random() * 900000));

    // Set OTP and expiry time for the user
    user.resetOtp = Otp;
    user.resetOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // OTP is valid for 24 hours (adjusted)

    // Save the user with the new OTP and expiry time
    await user.save();

    // Setup email options for sending OTP
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Sender's email
      to: user.email, // Recipient's email (the user's email)
      subject: 'Password Reset OTP', // Subject of the email
      text: `Your OTP for resetting the password is: ${Otp}` // Email content
    };

    // Send OTP email
    await transporter.sendMail(mailOptions);

    // Send success response
    return res.json({ success: true, message: 'OTP sent to your email' });

  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.json({ success: false, message: 'An error occurred while sending OTP' });
  }
};

// user can verify Otp and Reset Theirs pAssword 


export const resetPassword = async (req, res) => {
  const { email, Otp, newPassword } = req.body;

  // Validate input
  if (!email || !Otp || !newPassword) {
    return res.json({ success: false, message: 'Email, OTP, and New Password are required' });
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Check OTP validity
    if (!user.resetOtp || user.resetOtp !== Otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }

    // Check if OTP has expired
    if (user.resetOtpExpiresAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user with the new password and clear OTP
    user.password = hashedPassword;
    user.resetOtp = ''; // Reset OTP after successful change
    user.resetOtpExpiresAt = 0; // Clear OTP expiration time

    await user.save(); // Save the updated user

    return res.json({ success: true, message: 'Password has been reset successfully' });
  } catch (error) {
    console.error(error); // Log error for debugging purposes
    return res.json({ success: false, message: 'An error occurred during password reset' });
  }
};