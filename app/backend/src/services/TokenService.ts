import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { LoginRequest } from '../interfaces/User';

export interface TokenData {
  token: string
  expiresIn: number
}

// const createToken = (userInfo: LoginRequest): TokenData => {
//   const expiresIn = 60 * 60;
//   const secret = process.env.JWT_SECRET || 'adfdafs';
//   const dataStoredInToken: LoginRequest = userInfo;

//   return {
//     expiresIn,
//     token: jwt.sign(dataStoredInToken, secret, { expiresIn, algorithm: 'HS256' }),
//   };
// };

// export default createToken;

class TokenService {
  static createToken(userInfo: LoginRequest): TokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET || 'adfdafs';
    const dataStoredInToken: LoginRequest = userInfo;

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn, algorithm: 'HS256' }),
    };
  }
}

export default TokenService;
