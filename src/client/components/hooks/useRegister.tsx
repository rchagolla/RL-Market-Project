// import api from '../client';
import axios from "axios";

// Provides login/logout functions that automatically update state
export function useRegister() {
  const createNewUser = async (
    username: string,
    password: string,
    bio: string,
    language: string,
  ): Promise<boolean> => {
    try {
      const res = await axios.post("/createUser", { username, password, bio, language});

      if (res.data.success) {
        return true;
      }

    } catch (err) {
      console.log(err);
    }
    return false;
  };

  return { createNewUser };
}