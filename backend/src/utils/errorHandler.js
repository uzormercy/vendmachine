// validation error
// Database error
// Server error
// Api error
// Network error
import winston from 'winston';
import statusCode from './statusCode';

const { VALIDATION_ERROR, BAD_REQUEST } = statusCode;

const error = (status, title, message, data) => ({
  status,
  title,
  type: false,
  message,
  data
});
