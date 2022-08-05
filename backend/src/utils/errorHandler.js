// validation error
// Database error
// Server error
// Api error
// Network error
import statusCode from './statusCode';

const { VALIDATION_ERROR, BAD_REQUEST } = statusCode;

const error = (status, message, data) => ({
  status,
  type: false,
  message,
  data
});

export const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((e) => e);
  return error(VALIDATION_ERROR, 'ValidationError', errors);
};

export const handleServerError = (err) => {
  const errors = Object.values(err);
  return error(BAD_REQUEST, 'Invalid input', errors);
};
