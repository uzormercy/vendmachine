export const respond = (status) => (message) => (res) => (data) =>
  res
    .status(status)
    .send(message ? { status, message, data } : { status, ...data });

export const success = (message) => respond(200)(message);

export const fail = (status, message) => respond(status)(message);
