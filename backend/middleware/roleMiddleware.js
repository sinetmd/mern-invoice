import { ADMIN, USER } from "../constants/index.js";

const ROLES = {
  User: USER,
  Admin: ADMIN,
};

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    // using this ? checks if the value methods are undefined or null and returns undefined
    // and do not throw an exception instead
    if (!req?.user && !req?.roles) {
      res.status(401);
      throw new Error("You are not authorized to use our platform");
    }

    const rolesArray = [...allowedRoles];

    const roledFound = req.roles
      .map((role) => rolesArray.includes(role))
      .find((value) => value === true);

    if (!roledFound) {
      req.status(401);
      throw new Error("You are no authorized to perform this request");
    }
    next();
  };
};

const role = { ROLES, checkRole };

export default role;
