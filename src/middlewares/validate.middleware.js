const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const check = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!check.success) {
    const errors = check.error.errors.map((e) => ({ path: e.path.join('.'), message: e.message }));
    return next(new ApiError({ message: 'Validation failed', status: 400, errors }));
  }

  if (check.data.body) req.body = check.data.body;
  if (check.data.query) req.query = check.data.query;
  if (check.data.params) req.params = check.data.params;

  return next();
};

module.exports = validate;