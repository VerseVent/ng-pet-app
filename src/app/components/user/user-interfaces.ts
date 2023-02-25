export interface IUser {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  email: string;
  city: string | null;
  isNewsletter: boolean;
}

export enum UserActions {
  OFF_USER = 'OFF_USER',
  AUTH_USER = 'AUTH_USER',
}
