import { NextFunction, Router } from 'express';
// import CustomError from '../Error/CustomError';
import userLoginController from '../modules/users/useCases/userLogin';

const LoginRoutes = Router();

LoginRoutes.post('/login', (req, res, next: NextFunction) => {
  userLoginController.loginUser(req, res, next);
});

export default LoginRoutes;
