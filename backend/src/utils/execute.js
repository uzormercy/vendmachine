export const store = (model) =>
  model
    .save()
    .then((res) => res)
    .catch((error) => console.log(error));

export const update = (model) => (data) =>
  model
    .update(data)
    .then((res) => res)
    .catch((error) => console.log(error));

export const isDuplicate = (model) => (field) =>
  model
    .count(field)
    .then((count) => ({ status: !!(count && count > 0), count }))
    .catch((error) => console.log(error));

export const findOne = (model) => (field) =>
  model
    .findOne(field)
    .then((res) => res)
    .catch((error) => console.log(error));
