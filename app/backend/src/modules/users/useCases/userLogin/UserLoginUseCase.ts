import User from '../../../../database/models/User';
import { LoginRequest } from '../../../../interfaces/User';

export default class UserLoginUseCase {
  private userInfo: LoginRequest;

  async execute(userInfo: LoginRequest): Promise<User | null> {
    this.userInfo = userInfo;
    const { email } = this.userInfo;
    const user = await User.findOne({ where: { email } });
    return user;
  }
}
