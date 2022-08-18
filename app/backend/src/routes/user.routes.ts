import { NextFunction, Router } from 'express';
import CustomError from '../Error/CustomError';

const LoginRoutes = Router();

LoginRoutes.post('/login', (req, res, next: NextFunction) => {
  // res.status(201).send('Hello World!');
  const error = new CustomError('teste', 400);
  next(error);
});

export default LoginRoutes;
