export const store = (model) => (data) =>
  model
    .save(data)
    .then((res) => res)
    .catch((error) => console.log(error));

export const update = (model) => (data) =>
  model
    .update(data)
    .then((res) => res)
    .catch((error) => console.log(error));
