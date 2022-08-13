import * as R from 'ramda';
import { createUserService, loginUserService } from '../services/AuthServices';
import { fail, success } from '../utils/respond';

export const register = async (req, res) => {
  const user = await createUserService(req.body);
  if (!R.isNil(user.status)) {
    return fail(422, user.message)(res)();
  }
  return success('User registered successfully')(res)(user);
};

export const login = async (req, res) => {
  const user = await loginUserService(req.body);
  if (!R.isNil(user.status)) {
    return fail(422, user.message)(res)();
  }
  return success('User logged successfully')(res)(user);
};
