import { Request, Response, NextFunction } from 'express';
import CustomError from '../Error/CustomError';
// import UserLoginUseCase from '../modules/users/useCases/userLogin/UserLoginUseCase';
import TokenService from '../services/TokenService';

export default async function ValidateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;
    if (!token) throw new CustomError('Token not found', 401);
    const tokenInfo = TokenService.validateToken(token);

    // Levar essa função para o usecase de userLogin

    // const user = await UserLoginUseCase.findByEmail(tokenInfo.email);
    // const role = user?.getDataValue('role');

    // falta transformar esse retorno de requisição abaixo em um next
    if (!tokenInfo.email) {
      throw new CustomError('Invalid Token', 401);
    }

    req.body.tokenEmail = tokenInfo.email;
    next();
  } catch (error) {
    next(error);
  }
}
