import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import { systemLogs } from "../../utils/Logger.js";

// $-title   Login User, get access and refresh tokens
// $-path    POST /api/v1/auth/login
// $-auth    Public - route

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400); // bad request
    throw new Error("Please provide and email and password");
  }

  // get the user with the password field (because we deselected it when register)
  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser || !(await existingUser.comparePassword(password))) {
    res.status(401); // unauthorized
    systemLogs.error("incorrect email or password");
    throw new Error("Incorrect email or password");
  }

  // if user exists but does not verified email
  if (!existingUser.isEmailVerified) {
    res.status(400);
    throw new Error(
      "You are not verified. Check your email, a verification email link was sent when you registered"
    );
  }

  // deactivated by admin
  if (!existingUser.active) {
    res.status(400);
    throw new Error(
      "You have been deactivated by the admin and login is impossible. Contact us for inquiries"
    );
  }

  // if everything is fine
  if (existingUser && existingUser.comparePassword(password)) {
    // create access token
    const accessToken = jwt.sign(
      {
        id: existingUser._id,
        roles: existingUser.roles,
      },
      process.env.JWT_ACCESS_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // new refresh token
    const newRefreshToken = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_REFRESH_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    // get cookies
    const cookies = req.cookies;

    // check if we have an jwt cookie or filter the old ones
    let newRefreshTokenArray = !cookies?.jwt
      ? existingUser.refreshToken
      : existingUser.refreshToken.filter((refT) => refT !== cookies.jwt);

    // old cookie
    // we want to remove it
    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const existingRefreshToken = await User.findOne({ refreshToken }).exec();

      if (!existingRefreshToken) {
        // clear out all the previous refreshTokens
        newRefreshTokenArray = [];
      }

      // options for the cookie
      const options = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      };

      res.clearCookie("jwt", options);
    }

    existingUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await existingUser.save();

    const options = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
    };

    res.cookie("jwt", newRefreshToken, options);

    res.json({
      sucess: true,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      username: existingUser.username,
      provider: existingUser.provider,
      avatar: existingUser.avatar,
      accessToken,
    });
  } else {
    res.status(401); // unauthorized
    throw new Error("Invalid credentials provided");
  }
});

export default loginUser;
