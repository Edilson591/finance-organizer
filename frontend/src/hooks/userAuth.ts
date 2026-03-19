import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  forgotPasswordRequest,
  loginRequest,
  meRequest,
  registerRequest,
  resetPasswordRequest,
  getUsersRequest,
} from "../services/apiUsers";
import { logout, loginAction } from "../store/reducers/authReducers/auth";
import {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  UserLogin,
  UserRegister,
} from "../types/auth";

function persistSession(token: string, user: unknown) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const loginMutation = useMutation({
    mutationFn: (payload: UserLogin) => loginRequest(payload),
    onSuccess: (response) => {
      dispatch(loginAction({ token: response.token, user: response.user }));
      persistSession(response.token, response.user);
      navigate("/dashboard");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: UserRegister) => registerRequest(payload),
    onSuccess: (response) => {
      dispatch(loginAction({ token: response.token, user: response.user }));
      persistSession(response.token, response.user);
      navigate("/dashboard");
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      forgotPasswordRequest(payload),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      resetPasswordRequest(payload),
    onSuccess: () => {
      navigate("/login");
    },
  });

  const getUsers = useQuery({
    queryKey: ["users", token],
    queryFn: () => getUsersRequest(token as string),
    enabled: !!token,
    staleTime: 60_000,
    gcTime: 300_000,
  });

  const meQuery = useQuery({
    queryKey: ["me", token],
    queryFn: () => meRequest(token as string),
    enabled: !!token,
    retry: 1,
    staleTime: 60_000,
    gcTime: 300_000,
  });

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    queryClient.clear();
    navigate("/login");
  };

  return {
    token,
    loginMutation,
    registerMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    meQuery,
    getUsers,
    logoutUser,
  };
}
