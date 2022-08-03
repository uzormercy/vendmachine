import jwt from 'jsonwebtoken';

const TOKENKEY = `${process.env.TOKEN}`;

export const generateToken = (data) =>
  new Promise((resolve, reject) => {
    jwt.sign(data, TOKENKEY, { algorithm: 'HS256' }, (err, token) =>
      err
        ? resolve({
            status: 422,
            title: 'System Error',
            type: false,
            message: 'Unable to generate token'
          })
        : resolve(token)
    );
  });

export const decodeToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, TOKENKEY, (err, decoded) =>
      err
        ? resolve({
            status: 422,
            title: 'Validation Error',
            type: false,
            message: 'Invalid token provided'
          })
        : resolve({
            status: 200,
            type: true,
            message: 'valid token',
            data: decoded
          })
    );
  });
