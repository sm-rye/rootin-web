export interface Auth {
  email: string;
  password?: string;
  nickname?: string;
}

export type AuthMode = 'login' | 'signup';

export type User = {
  id: number;
} & Auth;

export interface AuthResponse {
  user: User;
  token: string;
}

// // { user: User, token: string
// }
