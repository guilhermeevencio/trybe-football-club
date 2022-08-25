interface LoginRequest {
  password: string
  email: string
}

interface IUser extends LoginRequest {
  id: number
  username: string
  role: string
}

interface UserRole {
  role: string
}

interface Login {
  email: string
}

interface ILoginUserUseCase {
  execute(userInfo: LoginRequest): Promise<string>
  validate(email: string): Promise<UserRole>
}

export {
  IUser,
  LoginRequest,
  Login,
  ILoginUserUseCase,
  UserRole,
};
