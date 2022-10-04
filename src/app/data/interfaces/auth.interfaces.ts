export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  result: LoginResult;
}

export interface LoginResult {
  token: string;
  nombreVoluntario: string;
  rolVoluntario: string;
}