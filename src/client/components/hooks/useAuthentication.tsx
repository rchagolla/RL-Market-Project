import axios from "axios";
// import { useSessionInfo } from "./useSessionInfo";

// Provides login/logout functions that automatically update state
export function useAuthentication() {
  // const [, refetchSessionInfo] = useSessionInfo();

  const loginUser = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const res = await axios.post("/login", { username, password });

    if (res.data.success) {
      // refetchSessionInfo();
      return true;
    }

    return false;
  };

  const logoutUser = async (): Promise<boolean> => {
    const res = await axios.post("/api/logout");
    // refetchSessionInfo();

    return res.data.success;
  };

  return { loginUser, logoutUser };
}