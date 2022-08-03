const validator = (model) => (payload) =>
  model
    .validator(payload)
    .then((res) => res(payload))
    .catch((error) => error);

export default validator;
