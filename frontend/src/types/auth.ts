export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  username: string;
  email: string;
  password: string;
  cpf?: string | null;
  cnpj?: string | null;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  code: string;
  password: string;
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  roleName: number;
  cpf: string | null;
  cnpj: string | null;
  createdAt: string;
  updatedAt: string;
  resetCode?: string | null;
  resetCodeExpires?: string | null;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

export type MeResponse = {
  user: AuthUser;
};

export type MessageResponse = {
  message: string;
};
