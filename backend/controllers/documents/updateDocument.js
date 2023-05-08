import asyncHandler from "express-async-handler";
import Customer from "../../models/customerModel.js";
import Document from "../../models/documentModel.js";

// $-title   UPDATE Document
// $-path    PATCH /api/v1/document/:id
// $-auth    Private

const updateDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    res.status(404);
    throw new Error("The document does not exist");
  }

  if (document.createdBy.toString() !== req.user?.id) {
    res.status(401);
    throw new Error(
      "You are not authrorized to update this document. It's not available to you!"
    );
  }

  const updatedDocument = await Document.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: `Your ${updateDocument.documentType}'s info was updated successfully`,
    updatedDocument,
  });
});

export default updateDocument;
