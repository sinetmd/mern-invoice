import express from "express";

import createCustomer from "../controllers/customers/createCustomer.js";
import updateCustomerInfo from "../controllers/customers/updateCustomerInfo.js";
import deleteCustomer from "../controllers/customers/deleteCustomer.js";
import getSingleUserCustomer from "../controllers/customers/getSingleUserCustomer.js";
import getAllUserCustomers from "../controllers/customers/getAllUserCustomers.js";
import checkAuth from "../middleware/checkAuthMiddleware.js";

const router = express.Router();

// create a new customer at /api/v1/customer/create
router.route("/create").post(checkAuth, createCustomer);

// get all customers of a user /api/v1/customer/all
router.route("/all").get(checkAuth, getAllUserCustomers);

// get, update and delete customer of a user /api/v1/customer/:id
router
  .route("/:id")
  .get(checkAuth, getSingleUserCustomer)
  .patch(checkAuth, updateCustomerInfo)
  .delete(checkAuth, deleteCustomer);

export default router;
