import { AxiosResponse } from "axios";
import axiosInstance from "../AxiosCreation";
import { LoginUserReq, LoginUserRes, SignupUserReq } from "../../interfaces/AuthenticationReq";
import { apiRouteEndPoints } from "../../constants/Constants";
import { RequestConfig } from "@/interfaces/RequestConfig";

export const authEndPoints = {
    API_AUTH_LOGIN: async (data: LoginUserReq) => {
        const config: RequestConfig<LoginUserReq> = {
            url: apiRouteEndPoints.AUTH_LOGIN,
            method: "GET",
            params: data,
        };

        return axiosInstance
            .request<never, AxiosResponse<never>, LoginUserReq>(config)
            .then((response: AxiosResponse<never>) => response);
    },

    API_AUTH_VALIDATE_OTP: async (data: LoginUserReq) => {
        const config: RequestConfig<LoginUserReq> = {
            url: apiRouteEndPoints.AUTH_LOGIN,
            method: "GET",
            params: data,
        };

        return axiosInstance
            .request<LoginUserRes, AxiosResponse<LoginUserRes>, LoginUserReq>(config)
            .then((response: AxiosResponse<LoginUserRes>) => response.data);
    },

    API_AUTH_SIGNUP: async (data: SignupUserReq) => {
        const config: RequestConfig<SignupUserReq> = {
            url: apiRouteEndPoints.AUTH_SIGNUP,
            method: "POST",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
        };

        return axiosInstance
            .request<never, AxiosResponse<never>, SignupUserReq>(config)
            .then((response: AxiosResponse<never>) => response);
    },

    API_CHECK_TOKEN: async () => {
        const config: RequestConfig<never> = {
            url: apiRouteEndPoints.AUTH_CHECK_TOKEN,
            method: "GET",
            isTokenRequired: true,
        };

        return axiosInstance
            .request<never, AxiosResponse<never>, never>(config)
            .then((response: AxiosResponse<never>) => response);
    },

    API_REFRESH_TOKEN: async () => {
        const config: RequestConfig<never> = {
            url: apiRouteEndPoints.AUTH_REFRESH_TOKEN,
            method: "POST",
            isRefreshTokenRequired: true,
        };

        return axiosInstance
            .request<LoginUserRes, AxiosResponse<LoginUserRes>, never>(config)
            .then((response: AxiosResponse<LoginUserRes>) => response);
    },

    API_AUTH_LOGOUT: async () => {
        const config: RequestConfig<never> = {
            url: apiRouteEndPoints.AUTH_SIGNOUT,
            method: "POST",
            isTokenRequired: true,
        };

        return axiosInstance
            .request<never, AxiosResponse<never>, never>(config)
            .then((response: AxiosResponse<never>) => response);
    },
};
