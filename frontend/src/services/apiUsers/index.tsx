import endpoint from "../axios/config";
import {
  AuthResponse,
  ForgotPasswordPayload,
  MeResponse,
  MessageResponse,
  ResetPasswordPayload,
  UserLogin,
  UserRegister,
} from "../../types/auth";

export async function loginRequest(credentials: UserLogin) {
  const { data } = await endpoint.post<AuthResponse>(
    "/auth/login",
    credentials,
  );
  return data;
}

export async function registerRequest(payload: UserRegister) {
  const { data } = await endpoint.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function forgotPasswordRequest(payload: ForgotPasswordPayload) {
  const { data } = await endpoint.post<MessageResponse>(
    "/auth/forgot-password",
    payload,
  );
  return data;
}

export async function resetPasswordRequest(payload: ResetPasswordPayload) {
  const { data } = await endpoint.post<MessageResponse>(
    "/auth/reset-password",
    payload,
  );
  return data;
}
export async function getUsersRequest(token: string) {
  const { data } = await endpoint.get<UserRegister[]>("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function meRequest(token: string) {
  const { data } = await endpoint.get<MeResponse>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
