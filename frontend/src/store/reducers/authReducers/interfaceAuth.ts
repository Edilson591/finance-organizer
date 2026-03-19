import { AuthUser } from "../../../types/auth";

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: AuthUser | null;
}
