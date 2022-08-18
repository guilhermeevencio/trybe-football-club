import httpStatus from 'http-status-codes';
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
    console.log(user?.password);

    if (!user) {
      throw new CustomError('Incorrect email or password', httpStatus.UNAUTHORIZED);
    }

    const isPasswordCorrect = await HandleWithPassword.comparePasswords(password, user.password);

    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      throw new CustomError('Incorrect email or password', httpStatus.UNAUTHORIZED);
    }

    const tokenData = TokenService.createToken(this.userInfo);

    return tokenData.token;
  }
}
