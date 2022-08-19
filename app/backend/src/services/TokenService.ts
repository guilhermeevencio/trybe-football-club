import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import CustomError from '../Error/CustomError';
import { LoginRequest } from '../interfaces/User';

class TokenService {
  static createToken(userInfo: LoginRequest): string {
    const secret = process.env.JWT_SECRET || 'adfdafs';
    const dataStoredInToken: LoginRequest = userInfo;

    return jwt.sign(dataStoredInToken, secret);
  }

  static validateToken(token: string): jwt.JwtPayload {
    const secret = process.env.JWT_SECRET || 'adfdafs';
    const data = jwt.verify(token, secret) as jwt.JwtPayload;

    if (!data.email) throw new CustomError('Invalid Token', 401);
    return data;
  }
}

export default TokenService;
