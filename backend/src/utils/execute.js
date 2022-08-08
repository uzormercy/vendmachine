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



export const isDuplicated = (model) => (field) => model.count({field}).then((count) => {
  if(count && count > 0) {
    return {
      status: 422,
      type: true,
      message: `${'Duplicate entery for ' + field}`
    }
  }
  return false;
})


export const findOne = (model) => (field) => model.findOne({field}).then((res) => res).catch((error) => console.log(error));

