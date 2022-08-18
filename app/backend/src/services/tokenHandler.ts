import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { LoginRequest } from '../interfaces/User';

const createToken = (user: LoginRequest) => {
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const secret = process.env.JWT_SECRET;

  const token = ({ data: user }, secret, jwtConfig);

  return token;
};
