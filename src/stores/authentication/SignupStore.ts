import { create } from "zustand";
import { produce } from "immer";

export type I_Signup = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type SignupActions = {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
};

export const useSignupStore = create<I_Signup & SignupActions>()((set) => {
  return {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    setFirstName: (firstName: string) =>
      set(
        produce((state: I_Signup) => {
          state.firstName = firstName;
        }),
      ),
    setLastName: (lastName: string) =>
      set(
        produce((state: I_Signup) => {
          state.lastName = lastName;
        }),
      ),
    setEmail: (email: string) =>
      set(
        produce((state: I_Signup) => {
          state.email = email;
        }),
      ),
    setPassword: (password: string) =>
      set(
        produce((state: I_Signup) => {
          state.password = password;
        }),
      ),
  };
});
