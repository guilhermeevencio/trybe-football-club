import UserLoginController from './UserLoginController';
import UserLoginUseCase from './UserLoginUseCase';

const userLoginUseCase = new UserLoginUseCase();
const userLoginController = new UserLoginController(userLoginUseCase);

export default userLoginController;
