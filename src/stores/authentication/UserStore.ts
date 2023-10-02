import { create } from "zustand";
import { produce } from "immer";

export type I_UserInfo = {
    userEmail: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthPlace: string;
    isCredentialsChecked: boolean;
    isCredentialsWrong: boolean;
    isUserLoggedIn: boolean;
    isTokenChecked: boolean;
};

type UserInfoActions = {
    setUserEmail: (email: string) => void;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setBirthDate: (birthDate: string) => void;
    setBirthPlace: (birthPlace: string) => void;
    setIsCredentialsChecked: (isCredentialsChecked: boolean) => void;
    setIsCredentialsWrong: (isCredentialsWrong: boolean) => void;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
    setIsTokenChecked: (isTokenChecked: boolean) => void;
};

export const useUserInfoStore = create<I_UserInfo & UserInfoActions>()((set) => {
    return {
        userEmail: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        birthPlace: "",
        isCredentialsChecked: false,
        isCredentialsWrong: false,
        isUserLoggedIn: false,
        isTokenChecked: true,
        setUserEmail: (email: string) =>
            set(
                produce((state: I_UserInfo) => {
                    state.userEmail = email;
                }),
            ),
        setFirstName: (firstName: string) =>
            set(
                produce((state: I_UserInfo) => {
                    state.firstName = firstName;
                }),
            ),
        setLastName: (lastName: string) =>
            set(
                produce((state: I_UserInfo) => {
                    state.lastName = lastName;
                }),
            ),
        setBirthDate: (birthDate: string) =>
            set(
                produce((state: I_UserInfo) => {
                    state.birthDate = birthDate;
                }),
            ),
        setBirthPlace: (birthPlace: string) =>
            set(
                produce((state: I_UserInfo) => {
                    state.birthPlace = birthPlace;
                }),
            ),
        setIsCredentialsChecked: (isCredentialsChecked: boolean) => {
            set(
                produce((state: I_UserInfo) => {
                    state.isCredentialsChecked = isCredentialsChecked;
                }),
            );
        },
        setIsCredentialsWrong: (isCredentialsWrong: boolean) => {
            set(
                produce((state: I_UserInfo) => {
                    state.isCredentialsWrong = isCredentialsWrong;
                }),
            );
        },
        setIsUserLoggedIn: (isUserLoggedIn: boolean) => {
            set(
                produce((state: I_UserInfo) => {
                    state.isUserLoggedIn = isUserLoggedIn;
                }),
            );
        },
        setIsTokenChecked: (isTokenChecked: boolean) => {
            set(
                produce((state: I_UserInfo) => {
                    state.isTokenChecked = isTokenChecked;
                }),
            );
        },
    };
});
