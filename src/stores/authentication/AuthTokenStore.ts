import { create } from "zustand";
import { produce } from "immer";

export type I_AuthToken = {
  access_token: string;
  refresh_token: string;
};

type AuthTokenActions = {
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
};

export const useAuthTokenStore = create<I_AuthToken & AuthTokenActions>()((set) => {
  return {
    access_token: "",
    refresh_token: "",
    setAccessToken: (accessToken: string) =>
      set(
        produce((state: I_AuthToken) => {
          state.access_token = accessToken;
        }),
      ),
    setRefreshToken: (refreshToken: string) =>
      set(
        produce((state: I_AuthToken) => {
          state.refresh_token = refreshToken;
        }),
      ),
  };
});
