import { v4 as uuid } from 'uuid';
import * as R from 'ramda';
import bcrypt from 'bcryptjs';
import validator from '../validators/validator';
import User from '../models/User';
import { findOne, isDuplicate, store } from '../utils/execute';
import {
  loginValidator,
  registerValidator
} from '../validators/authValidators';
import { generateToken } from '../utils/token';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => bcrypt.hashSync(password, salt);
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
const token = (username, id, role) => generateToken({ username, id, role });

export const createUserService = async (data) => {
  const validation = await validator(registerValidator)(data);
  if (!R.isNil(validation.type)) {
    return validation;
  }
  const { email, fullname, password, username } = validation;

  const isEmailTaken = await isDuplicate(User)(email);
  if (isEmailTaken.status) {
    return {
      status: false,
      message: 'Email already taken'
    };
  }

  const isUsernameTaken = await isDuplicate(User)(username);
  if (isUsernameTaken.status) {
    return {
      status: false,
      message: 'Username already taken'
    };
  }
  const user = User.of({
    email,
    fullname,
    username,
    _id: uuid(),
    role: 'buyer',
    password: hashPassword(password)
  });
  const save = await store(user);
  return {
    fullname: save.fullname,
    username: save.username,
    token: await token(save.username, save._id, save.role)
  };
};

export const loginUserService = async (data) => {
  const validation = await validator(loginValidator)(data);
  const { username, password } = validation;
  const user = await findOne(User)({ username });
  if (!user) {
    return {
      status: false,
      message: 'Credientials do not match'
    };
  }
  const isPasswordCorrect = comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    return {
      status: false,
      message: 'Credientials do not match'
    };
  }

  return {
    user,
    token: await token(user.username, user.id, user.role)
  };
};

export const authUser = (req) => req.context.user;
