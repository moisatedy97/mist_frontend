import { useUserInfoStore } from "@/stores/authentication/UserStore";
import { accessLocalStorage } from "@/stores/browser/SessionStorage";

export const utilsFunctions = {
    SET_USER_TO_LOGIN: () => {
        useUserInfoStore.getState().setIsUserLoggedIn(true);
        useUserInfoStore.getState().setIsTokenChecked(false);
        useUserInfoStore.getState().setIsCredentialsChecked(false);
    },
    SET_USER_TO_LOGOUT: () => {
        useUserInfoStore.getState().setIsUserLoggedIn(false);
        useUserInfoStore.getState().setIsTokenChecked(true);
        useUserInfoStore.getState().setIsCredentialsChecked(false);

        accessLocalStorage.REMOVE_AUTHENTICATION_TOKEN();
    },
};
