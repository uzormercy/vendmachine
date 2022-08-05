import { handleValidationError } from '../utils/errorHandler';

const validator = (schema) => (payload) =>
  schema
    .validate(payload)
    .then((res) => res)
    .catch((error) => handleValidationError(error));

export default validator;
