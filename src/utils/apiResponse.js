const apiResponse = ({ success, code, data = null, message = '', errors = null }) => ({
  success,
  code,
  data,
  message,
  errors,
});

module.exports = apiResponse;