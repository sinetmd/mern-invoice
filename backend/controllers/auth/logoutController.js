import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  console.log(cookies);

  if (!cookies?.jwt) {
    res.sendStatus(204);
    return; //throw new Error("No cookie found");
  }

  const refreshToken = cookies.jwt;

  const existingUser = await User.findOne({ refreshToken });

  console.log("ExistingUser: ", existingUser);

  if (!existingUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    });
    res.sendStatus(204);
  }

  existingUser.refreshToken = existingUser.refreshToken.filter(
    (refT) => refT !== refreshToken
  );
  await existingUser.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,
    sameSite: "None",
  });

  res.status(200).json({
    success: true,
    message: `${existingUser.firstName},you have been logged out successfully`,
  });
});

export default logoutUser;
