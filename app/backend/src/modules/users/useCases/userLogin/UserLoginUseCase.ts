// import httpStatus from 'http-status-codes';
import CustomError from '../../../../Error/CustomError';
import User from '../../../../database/models/User';
import { LoginRequest } from '../../interfaces';
import TokenService from '../../../../services/TokenService';
import HandleWithPassword from '../../../../services/HandleWithPassword';

export default class UserLoginUseCase {
  private userInfo: LoginRequest;
  private tokenEmail: string;

  static async findByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async execute(userInfo: LoginRequest): Promise<string> {
    this.userInfo = userInfo;
    const { email, password } = this.userInfo;
    const user = await UserLoginUseCase.findByEmail(email);

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

  async validate(tokenEmail: string): Promise<User> {
    this.tokenEmail = tokenEmail;
    const user = await UserLoginUseCase.findByEmail(tokenEmail);

    if (!user) throw new CustomError('Invalid Token', 401);

    return user;
  }
}
