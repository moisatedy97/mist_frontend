import { InternalRequestConfig } from "@/interfaces/RequestConfig";
import { ResponseConfig, ResponseErrorConfig } from "@/interfaces/ResponseConfig";
import { I_AuthToken, useAuthTokenStore } from "@/stores/authentication/AuthTokenStore";
import { accessLocalStorage } from "@/stores/browser/SessionStorage";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { authEndPoints } from "./authentication/AuthenticationEndPoints";
import { LoginUserRes } from "@/interfaces/AuthenticationReq";
import { utilsFunctions } from "@/utils/UtilsFunctions";

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: InternalRequestConfig) => {
    const token: I_AuthToken | null = accessLocalStorage.GET_AUTHENTICATION_TOKEN();

    if (token) {
        if (request.isTokenRequired) {
            request.headers["Authorization"] = `Bearer ${token.access_token}`;
        }

        if (request.isRefreshTokenRequired) {
            request.headers["Authorization"] = `Bearer ${token.refresh_token}`;
        }
    }

    return request;
});

//******************************************************************************
// Interceptor delle risposte axios
//******************************************************************************
axiosInstance.interceptors.response.use(
    (response: ResponseConfig) => {
        return response;
    },

    (error: ResponseErrorConfig) => {
        console.log(error);

        // This means that the token is not valid
        if (error.config.isTokenRequired && error.response?.status === 401) {
            authEndPoints.API_REFRESH_TOKEN().then((response: AxiosResponse<LoginUserRes>) => {
                if (response.status === 200) {
                    if (response.data.access_token.length > 0 && response.data.refresh_token.length > 0) {
                        useAuthTokenStore.getState().setAccessToken(response.data.access_token);
                        useAuthTokenStore.getState().setRefreshToken(response.data.refresh_token);

                        accessLocalStorage.SET_AUTHENTICATION_TOKEN({
                            access_token: response.data.access_token,
                            refresh_token: response.data.refresh_token,
                        });
                    }

                    utilsFunctions.SET_USER_TO_LOGIN();
                } else {
                    utilsFunctions.SET_USER_TO_LOGOUT();
                }
            });
        }

        return error;
    },
);

export default axiosInstance;
