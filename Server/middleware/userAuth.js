import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config(); // Initialize dotenv to load variables from .env file

// Middleware to check if the user is authenticated
const userAuth = async (req, res, next) => {
  const { token } = req.cookies; // Extract token from cookies

  if (!token) {
    return res.json({ success: false, message: 'Not Authorized, Login Again' }); // If no token, user is not authorized
  }

  try {
    // Verify the token using JWT_SECRET from environment variables
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token contains a valid ID, add userId to the request body
    if (tokenDecoded.id) {
      req.body.userId = tokenDecoded.id;
    } else {
      return res.json({ success: false, message: 'Not Authorized, Login Again' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.json({ success: false, message: error.message }); // If token verification fails, return error message
  }
};

export default userAuth; // Export the userAuth middleware to use in other files
