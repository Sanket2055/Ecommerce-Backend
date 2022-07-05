const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong on the server";

  //   wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found ,Invalid ID error path: ${err.path} `;
    console.log('message', err);
    
    err = new ErrorHandler(message, 400);
  }
  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field error path: ${err.keyPattern} `;
    console.log('mongodb error' , err);
    
    err = new ErrorHandler(message, 400);
  }
  // wrong jwt token error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid token error path: ${err.path} `;
    err = new ErrorHandler(message, 401);
  }
  // jwt expire error
  if (err.name === "TokenExpiredError") {
    const message = `Token expired error path: ${err.path} `;
    err = new ErrorHandler(message, 401);
  }

  // send error to client
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};
