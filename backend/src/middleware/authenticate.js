import * as R from 'ramda';
import { getUser } from '../services/UserService';
import { fail } from '../utils/respond';
import statusCode from '../utils/statusCode';
import { decodeToken } from '../utils/token';

const getToken = (data) => {
  const authPath = R.path(['headers', 'authorization'], data);
  return authPath
    ? authPath.split(' ').pop(0)
    : { type: false, message: 'No token provided' };
};

const authorizationToken = async (data) => {
  const token = getToken(data);
  if (token && token.type === false) {
    return {
      status: statusCode.BAD_REQUEST,
      title: 'Authentication Error',
      type: false,
      message: token.message
    };
  }
  const validateToken = await decodeToken(token);
  return validateToken.type === false ? validateToken : validateToken.data;
};

export const authorized = async (req, res, next) => {
  const tokenData = await authorizationToken(req);
  const user = await getUser(tokenData.id);
  if (!user) {
    return fail(401, 'Unauthorized')(res)();
  }
  Object.assign(req, {
    context: {
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        role: user.role
      }
    }
  });
  return next();
};

export const isSeller = async (req, res, next) => {
  const tokenData = await authorizationToken(req);
  const user = await getUser(tokenData.id);
  if (!user) {
    return fail(401, 'Unauthorized')(res)();
  }
  if (user.role !== 'seller') {
    return fail(401, 'Unauthorized')(res)();
  }
  Object.assign(req, {
    context: {
      user: { id: user._id, fullname: user.fullname, username: user.username }
    }
  });
  return next();
};
