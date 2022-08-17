interface UserRequest {
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
  UserRequest,
  Login,
};
