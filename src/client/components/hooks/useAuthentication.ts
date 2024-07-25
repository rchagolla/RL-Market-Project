import { useQueryClient } from "@tanstack/react-query";
import { api } from "../../client";

// Provides login/logout functions that automatically update state
export function useAuthentication() {
  const queryClient = useQueryClient();

  const loginUser = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const success = await api.authLogin(username, password);

    if (success) {
      await queryClient.invalidateQueries({ queryKey: ["getSessionInfo"] });
      return true;
    }

    return false;
  };

  const logoutUser = async (): Promise<boolean> => {
    const success = await api.authLogout();
    await queryClient.invalidateQueries({ queryKey: ["getSessionInfo"] });

    return success;
  };

  return { loginUser, logoutUser };
}