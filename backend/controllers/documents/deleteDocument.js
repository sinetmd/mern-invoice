import asyncHandler from "express-async-handler";
import Document from "../../models/documentModel.js";

// $-title   Delete Document
// $-path    DELETE /api/v1/document/:id
// $-auth    Private

const deleteDocument = asyncHandler(async (req, res) => {
  const documentId = req.params.id;

  const document = await Document.findById(documentId);

  if (!document) {
    res.status(404);
    throw new Error("That document does not exists!");
  }

  // if was not created by the same user
  if (document.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to delete this document!");
  }

  await document.deleteOne({ _id: documentId });

  res.json({
    success: true,
    message: "Your document has been deleted",
  });
});

export default deleteDocument;
