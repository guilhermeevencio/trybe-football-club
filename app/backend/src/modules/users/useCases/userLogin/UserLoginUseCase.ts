// import httpStatus from 'http-status-codes';
import CustomError from '../../../../Error/CustomError';
import User from '../../../../database/models/User';
import { LoginRequest } from '../../../../interfaces/User';
import TokenService from '../../../../services/TokenService';
import HandleWithPassword from '../../../../services/HandleWithPassword';

export default class UserLoginUseCase {
  private userInfo: LoginRequest;

  async execute(userInfo: LoginRequest): Promise<string> {
    this.userInfo = userInfo;
    const { email, password } = this.userInfo;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new CustomError('Incorrect email or password', 401);
    }

    const isPasswordCorrect = await HandleWithPassword.comparePasswords(password, user.password);

    if (!isPasswordCorrect) {
      throw new CustomError('Incorrect email or password', 401);
    }

    const tokenData = TokenService.createToken(this.userInfo);

    return tokenData;
  }
}
