export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? " " : err.stack,
  });
};

function simplifyMessage(msg) {
  return msg
    .replace(/^Path\s+`/, "field ")
    .replace(/`\s+is required\.$/, " required");
}

export const mongooseValidationError = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = simplifyMessage(err.errors[key].message);
      return acc;
    }, {});
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }
};
