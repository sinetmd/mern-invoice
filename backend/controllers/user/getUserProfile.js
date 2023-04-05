import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

// $-title   Get User profile information
// $-path    POST /api/v1/user/profile
// $-auth    Private

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // get the user
  const userProfile = await User.findById(userId, {
    // don't include the refresh token, roles and id in the response
    refreshToken: 0,
    roles: 0,
    _id: 0,
    // Enabling the lean option tells Mongoose to skip instantiating
    // a full Mongoose document and just give you the POJO.
    // makes queries faster and not memory intensive.
    // but they are javascript objects not mongo docs
  }).lean();

  if (!userProfile) {
    res.status(204);
    throw new Error("User profile not found!");
  }

  res.status(200).json({
    succes: true,
    userProfile,
  });
});

export default getUserProfile;
