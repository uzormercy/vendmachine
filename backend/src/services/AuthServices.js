import { v4 as uuid } from 'uuid';
import * as R from 'ramda';
import bcrypt from 'bcryptjs';
import validator from '../validators/validator';
import User from '../models/User';
import { isDuplicated, store } from '../utils/execute';
import { registerValidator } from '../validators/authValidators';
import { generateToken } from '../utils/token';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => bcrypt.hashSync(password, salt);
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
const token = (email, id, role) => generateToken({ email, id, role });

export const createUserService = async (data) => {
  const validation = await validator(registerValidator)(data);
  if (!R.isNil(validation.type)) {
    return validation;
  }
  const { email, fullname, password, username } = validation;

  const emailExist = isDuplicated(User)(email);
    if(!R.isNil(emailExist.type)){
      return emailExist;
    }

  //   isEmailTaken
  //  isUsernameTaken

  return store(User)({
    email,
    fullname,
    username,
    id: uuid(),
    role: 'buyer',
    password: hashPassword(password)
  });
};

export const loginUserService = async (data) => {};
