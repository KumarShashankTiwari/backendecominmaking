const ErrorHander = require("../utils/errorHander");

module.exports = (err,req,res,next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  console.log(
    "error in middleware",
    err.statusCode,
    "err.message",
    err.message
  );
  res.status(err.statusCode).json({
    success: false,
    error: err.message
  });
};
