import { Router } from 'express';
import ValidateToken from '../middlewares/ValidateToken';
import userLoginController from '../modules/users/useCases/userLogin';

const LoginRoutes = Router();

LoginRoutes.post('/login', (req, res, next) => {
  userLoginController.loginUser(req, res, next);
});

LoginRoutes.get(
  '/login/validate',
  ValidateToken,
  (req, res, next) => userLoginController.validateUser(req, res, next),
);

export default LoginRoutes;
