// A custom ErrorHandler class to create operational errors with a status code
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent constructor (Error) with the message
    this.statusCode = statusCode;

    // Create a .stack property on our error instance
    Error.captureStackTrace(this, this.constructor);
  }
}

// The main error handling middleware
export const errorMiddleware = (err, req, res, next) => {
  // If the error doesn't have a specific status code, default to 500 (Internal Server Error)
  err.statusCode = err.statusCode || 500;
  
  // If the error doesn't have a specific message, provide a generic one
  err.message = err.message || "Internal Server Error";

  // Special handling for common Mongoose errors
  // 1. CastError: Happens for invalid MongoDB ObjectIDs
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // 2. Mongoose Duplicate Key Error: Happens when a 'unique' field is violated
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // 3. Invalid JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `JSON Web Token is invalid. Please login again.`;
    err = new ErrorHandler(message, 401);
  }

  // 4. Expired JWT Error
  if (err.name === "TokenExpiredError") {
    const message = `JSON Web Token has expired. Please login again.`;
    err = new ErrorHandler(message, 401);
  }

  // Send the final, formatted error response to the client
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;