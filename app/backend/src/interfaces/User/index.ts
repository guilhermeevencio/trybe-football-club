interface LoginRequest {
  password: string
  email: string
}

interface IUser {
  id: number
  username: string
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
  execute(userInfo: LoginRequest): Promise<string>
}
