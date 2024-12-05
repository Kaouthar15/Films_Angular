export interface CurrentUser {
  username: string;
  email: string;
}
export interface LogoutResponse {
  message: string;
}

export interface AuthResponse {
  jwt: string;
  user: CurrentUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}
