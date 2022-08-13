import { findOne } from '../utils/execute';
import User from '../models/User';

export const getUser = (_id) => findOne(User)({ _id });
