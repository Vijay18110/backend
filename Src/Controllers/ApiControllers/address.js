const addressModel = require("../../Modal/address.model");
const ApiResponse = require("../../Utility/ApiResponse");

// ✅ Get all addresses for logged-in user
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await addressModel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    const successRes = await ApiResponse.success(
      addresses,
      "Addresses fetched successfully",
      200
    );
    return res.status(200).json({ data: successRes });
  } catch (err) {
    console.error("Get Addresses Error:", err);
    const errorRes = await ApiResponse.error(
      "Server error while fetching addresses",
      500
    );
    return res.status(500).json({ data: errorRes });
  }
};

// ✅ Add a new address
exports.addAddress = async (req, res) => {
  try {
    const newAddress = new addressModel({
      userId: req.user._id,
      ...req.body,
    });

    // If setting this as default, unset other defaults for the same user
    if (newAddress.isDefault) {
      await addressModel.updateMany(
        { userId: req.user._id },
        { isDefault: false }
      );
    }

    await newAddress.save();
    const successRes = await ApiResponse.success(
      newAddress,
      "Address added successfully",
      200
    );
    return res.status(200).json({ data: successRes });
  } catch (err) {
    console.error("Add Address Error:", err);
    const errorRes = await ApiResponse.error(
      "Server error while adding address",
      500
    );
    return res.status(500).json({ data: errorRes });
  }
};

// ✅ Update an existing address
exports.updateAddress = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    if (!id) {
      const errorRes = await ApiResponse.error("Address ID is required", 400);
      return res.status(400).json({ data: errorRes });
    }
    const address = await addressModel.findOne({
      _id: id,
      userId: req.user._id,
    });
    if (!address) {
      const errorRes = await ApiResponse.error(
        "Address not found for update",
        404
      );
      return res.status(404).json(errorRes);
    }
    // If this address is being set as default, remove default from others
    if (updateData.isDefault) {
      await addressModel.updateMany(
        { userId: req.user._id },
        { isDefault: false }
      );
    }
    // Merge update data
    Object.assign(address, updateData);
    await address.save();

    const successRes = await ApiResponse.success(
      address,
      "Address updated successfully",
      200
    );
    return res.status(200).json({ data: successRes });
  } catch (err) {
    console.error("Update Address Error:", err);
    const errorRes = await ApiResponse.error(
      "Server error while updating address",
      500
    );
    return res.status(500).json({ data: errorRes });
  }
};

// ✅ Update an existing address
exports.delateAddress = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      const errorRes = await ApiResponse.error("Address ID is required", 400);
      return res.status(400).json(errorRes);
    }
    const address = await addressModel.findOne({
      _id: id,
      userId: req.user._id,
    });
    if (!address) {
      const errorRes = await ApiResponse.error(
        "Address not found for update",
        404
      );
      return res.status(404).json(errorRes);
    }

    await addressModel.findOneAndDelete({ _id: id, userId: req.user._id });
    const addresses = await addressModel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    if (address.isDefault) {
      const docdeleted = await addressModel.updateOne(
        { _id: addresses[0]._id },
        { isDefault: true }
      );
    }

    const successRes = await ApiResponse.success(
      address,
      "Address Deleted successfully",
      200
    );

    return res.status(200).json(successRes);
    // If this address is being set as default, remove default from others
    // Merge update data
  } catch (err) {
    console.error("Delete Address Error:", err);
    const errorRes = await ApiResponse.error(
      "Server error while Deleting address",
      500
    );
    return res.status(500).json({ data: errorRes });
  }
};
