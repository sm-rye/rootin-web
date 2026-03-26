export interface Auth {
  email: string;
  password?: string;
  nickname?: string;
}

export type AuthMode = 'login' | 'signup';

export type User = {
  user_id: number;
  is_guest?: boolean;
} & Auth;

export interface AuthResponse {
  user: User;
  token: string;
}

// // { user: User, token: string
// }
