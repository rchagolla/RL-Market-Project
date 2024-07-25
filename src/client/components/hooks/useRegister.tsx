import { api } from '../../client';

// Provides login/logout functions that automatically update state
export function useRegister() {
  const createNewUser = async (
    username: string,
    password: string,
    bio: string,
    language: string,
  ): Promise<boolean> => {
    return await api.createUser(username, password, bio, language);
  };

  return { createNewUser };
}