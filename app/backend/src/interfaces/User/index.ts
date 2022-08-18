import User from '../../database/models/User';

interface LoginRequest {
  name: string
  email: string
}

interface IUser {
  id: number
  role: string
  email: string
  password: string
}

interface Login {
  email: string
}

export {
  IUser,
  LoginRequest,
  Login,
};

export interface ILoginUserUseCase {
  execute(userInfo: LoginRequest): Promise<User | null>
}
