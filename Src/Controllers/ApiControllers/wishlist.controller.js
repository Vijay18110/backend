const { wishlistModel } = require("../../Modal/wishlist.model");
const ApiResponse = require("../../Utility/ApiResponse");

exports.addToWishList = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;
    if (!productId) {
      const errorRes = await ApiResponse.error("productId is required !", 400);
      return res.json({ data: errorRes });
    }
    // find user or create
    let wishListdoc = await wishlistModel.findOne({ userId });
    if (!wishListdoc) {
      wishListdoc = new wishlistModel({
        userId: userId,
        productId: productId,
        wishList: [],
      });
    }
    const isExistingProduct = wishListdoc?.wishList.find(
      (item) => item?.toString() === productId
    );
    if (isExistingProduct) {
      const errRes = await ApiResponse.error(
        "Product already in wishlist",
        400
      );
      return res.json({ data: errRes });
    }
    wishListdoc.wishList.push(productId);
    await wishListdoc.save();
    const successRes = await ApiResponse.success(
      wishListdoc,
      "Product added to wishlist successfully !",
      200
    );
    res.status(200).json({ data: successRes });
  } catch (error) {
    console.log(error);
    const err = await ApiResponse.error(
      "Something Went Wrong ! during add Product to wishlist",
      500
    );
    res.json({ data: err });
  }
};
exports.getUserWishList = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishListdoc = await wishlistModel
      .findOne({ userId })
      .populate("wishList");
    console.log("working....", wishListdoc);

    const successRes = await ApiResponse.success(
      wishListdoc,
      "Wishlist fetched successfully !",
      200
    );
    res.status(200).json({ data: successRes });
  } catch (error) {
    console.log(error);
    const err = await ApiResponse.error(
      "Something Went Wrong ! during fetch Wishlist",
      500
    );
    res.json({ data: err });
  }
};
exports.RemoveFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishListdoc = await wishlistModel
      .findOne({ userId })
      .populate("wishList");
    // console.log(wishListdoc.wishList.length, "wislist before Remove");
    const productId = req.body.productId;
    console.log(req.body);
    // console.log(productId);
    wishListdoc.wishList = wishListdoc.wishList.filter(
      (item) => item._id.toString() != productId
    );
    // console.log(wishListdoc.wishList.length, "wislist after Remove");
    await wishListdoc.save();
    const successRes = await ApiResponse.success(
      wishListdoc,
      "Item Removed From Wishlist !",
      200
    );
    res.status(200).json({ data: successRes });
  } catch (error) {
    console.log(error);
    const err = await ApiResponse.error(
      "Something Went Wrong ! during Remove from Wishlist",
      500
    );
    res.json({ data: err });
  }
};
