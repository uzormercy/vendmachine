import { createUserService, loginUserService } from '../services/AuthServices';

export const register = async (req, res) => {
  const user = await createUserService(req.body);
  console.log({ user });
};

export const login = async (req, res) => {
  const user = await loginUserService(req.body);
};
