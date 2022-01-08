const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");

// const catchAsyncError = require("../middleware/catchAsyncError");
exports.createProduct = async (req, res, next) => {
  let body = req.body;
  console.log("Body :: ", req.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};
// exports.getAllProducts = (req, res) => {
//   res.status(200).json({ message: "Route is working fine" });
// };
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};

// Update product -- admin

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
  product = await Product.remove();
  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
};

exports.getProductDetails = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  console.log("product", product);

  if (!product) {
    console.log(" ------  -----   product ---    ");
return next(new ErrorHander("Product not found",404));
    // let whatcomes = next(new ErrorHandler("Product Not Found", 404));
    // console.log("whatcomes", whatcomes);
    //  return whatcomes;
    // return res.status(500).json({
    //   success: false,
    //   message: "Product Not Found",
    // });
  }
  res.status(200).json({
    success: true,
    product,
  });
};
