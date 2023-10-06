import { create } from "zustand";
import { produce } from "immer";

export type I_Loader = {
  isActive: boolean;
};

type LoaderActions = {
  setLoader: (isActive: boolean) => void;
};

export const useLoaderStore = create<I_Loader & LoaderActions>()((set) => {
  return {
    isActive: false,
    setLoader: (isActive: boolean) =>
      set(
        produce((state: I_Loader) => {
          state.isActive = isActive;
        }),
      ),
  };
});
