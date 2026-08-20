const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

module.exports = errorMiddleware;