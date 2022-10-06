export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  result: UserData;
}

export interface UserData {
  token: string;
  voluntarioId: number;
  nombreVoluntario: string;
  rolVoluntario: string;
  coordinador: boolean;
  comunidadAsignada: number;
}