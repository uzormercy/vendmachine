import * as R from 'ramda';
import { findAndUpdate, findOne } from '../utils/execute';
import User from '../models/User';

export const getUser = (_id) => findOne(User)({ _id });

export const updateUser = (data) => {
  if (R.isEmpty(data.fullname)) {
    return {
      status: 422,
      message: 'Fullname is required'
    };
  }
  return findAndUpdate(User)(data.id)(data.fullname);
};

export const updateUserRole = (data) => {};
