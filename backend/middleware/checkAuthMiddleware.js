import asynHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const checkAuth = asynHandler(async (req, res, next) => {
  let jwt_token;

  // Bearer sadasdsa23e23
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // if token does not start with bearer
  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401); // unauthorized

  if (authHeader && authHeader.startsWith("Bearer")) {
    jwt_token = authHeader.split(" ")[1];

    // decode token
    jwt.verify(
      jwt_token,
      process.env.JWT_ACCESS_SECRET_KEY,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);

        const userId = decoded.id;

        // return requested user wihout password field
        req.user = await User.findById(userId).select("-password");
        req.roles = decoded.roles;
        next();
      }
    );
  }
});

export default checkAuth;
