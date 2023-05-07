import asyncHandler from "express-async-handler";
import Customer from "../../models/customerModel.js";

// $-title   Update Customer
// $-path    PATCH /api/v1/customer/:id
// $-auth    Private

const updateCustomerInfo = asyncHandler(async (req, res) => {
  // find customer byn given id
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.send(404);
    throw new Error("That Customer does not exists");
  }

  if (customer.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "You are not authorized to update this customer information. He/She is not your customer"
    );
  }

  const { id: _id } = req.params;
  const fieldsToUpdate = req.body;

  // find customer by id and update
  const updatedCustomerInfo = await Customer.findByIdAndUpdate(
    _id,
    {
      ...fieldsToUpdate,
      _id,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: `${customer.name}'s info was successfully updated`,
    updatedCustomerInfo,
  });
});

export default updateCustomerInfo;
