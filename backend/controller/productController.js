const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");

const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

exports.createProduct = catchAsyncError(async (req, res, next) => {
  let body = req.body;
  console.log("Body :: ", req.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// exports.getAllProducts = (req, res) => {
//   res.status(200).json({ message: "Route is working fine" });
// };
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  //const products = await Product.find();
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
  });
});

// Update product -- admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
    // return res.status(500).json({
    //   success: false,
    //   message: "Product Not Found",
    // });
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
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
    // return res.status(500).json({
    //   success: false,
    //   message: "Product Not Found",
    // });
  }
  product = await Product.remove();
  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  console.log("product", product);

  if (!product) {
    console.log(" ------  -----   product ---    ");
    return next(new ErrorHander("Product not found", 404));

    // return res.status(500).json({
    //   success: false,
    //   message: "Product Not Found",
    // });
  }
  res.status(200).json({
    success: true,
    product,
    productCount
  });
});
