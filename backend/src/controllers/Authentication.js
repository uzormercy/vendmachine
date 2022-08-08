import { createUserService, loginUserService } from '../services/AuthServices';
import { fail, success } from '../utils/respond';

export const register = async (req, res) => {
  const user = await createUserService(req.body);
    if(user.type === false){
      return fail(user.status, user.message)(res)();
    }
    return success('User registered successfully')(res)(user);
};

export const login = async (req, res) => {
  const user = await loginUserService(req.body);
};
