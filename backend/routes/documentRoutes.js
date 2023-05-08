import express from "express";

import createDocument from "../controllers/documents/createDocument.js";
import updateDocument from "../controllers/documents/updateDocument.js";
import getSingleUserDocument from "../controllers/documents/getSingleUserDocument.js";
import deleteDocument from "../controllers/documents/deleteDocument.js";
import checkAuth from "../middleware/checkAuthMiddleware.js";
import getAllUserDocuments from "../controllers/documents/getAllUserDocuments.js";

const router = express.Router();

// create document
router.route("/create").post(checkAuth, createDocument);

// get all documents from a user
router.route("/all").get(checkAuth, getAllUserDocuments);

// get,update, delete a specific user
router
  .route("/:id")
  .patch(checkAuth, updateDocument)
  .get(checkAuth, getSingleUserDocument)
  .delete(checkAuth, deleteDocument);

export default router;
