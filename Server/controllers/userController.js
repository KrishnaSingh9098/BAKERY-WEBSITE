
import userModel from "../models/userModels.js";

const getUserData = async (req, res) => {
  try {
    // Assuming userAuth middleware adds the userId to req.userId
    const { userId } = req.body; // userId will be available in req if authenticated

    // Validate if userId exists
    if (!userId) {
      return res.json({ success: false, message: 'User ID is missing from request' });
    }

    // Find user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: 'User Not Found' });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default getUserData;
