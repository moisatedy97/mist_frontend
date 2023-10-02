import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export type InternalRequestConfig = InternalAxiosRequestConfig & RequestConfig;

export type RequestConfig<T = any> = AxiosRequestConfig<T> & RequestOptionalConfig;

type RequestOptionalConfig = {
    isTokenRequired?: boolean;
    isRefreshTokenRequired?: boolean;
};
