import { create } from "zustand";
import { produce } from "immer";

export type I_Login = {
  email: string;
  password: string;
  otp: string;
};

type LoginActions = {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setOtp: (otp: string) => void;
};

export const useLoginStore = create<I_Login & LoginActions>()((set) => {
  return {
    email: "",
    password: "",
    otp: "",
    setEmail: (email: string) =>
      set(
        produce((state: I_Login) => {
          state.email = email;
        }),
      ),
    setPassword: (password: string) =>
      set(
        produce((state: I_Login) => {
          state.password = password;
        }),
      ),
    setOtp: (otp: string) =>
      set(
        produce((state: I_Login) => {
          state.otp = otp;
        }),
      ),
  };
});
