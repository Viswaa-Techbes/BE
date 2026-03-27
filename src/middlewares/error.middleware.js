const apiResponse = require('../utils/apiResponse');

const notFoundHandler = (req, res) => {
  return res.status(404).json(
    apiResponse({
      success: false,
      code: 404,
      data: null,
      message: 'Route not found',
      errors: null,
    })
  );
};

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const errors = err.errors || null;

  console.error(err);

  return res.status(status).json(
    apiResponse({
      success: false,
      code: status,
      data: null,
      message,
      errors,
    })
  );
};

module.exports = { notFoundHandler, errorHandler };