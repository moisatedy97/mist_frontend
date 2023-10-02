import { apiRouteEndPoints } from "@/constants/Constants";
import { RequestConfig } from "@/interfaces/RequestConfig";
import { I_EditUserInfoReq, I_UserinfoReq, I_UserinfoRes } from "@/interfaces/UserInfo";
import axiosInstance from "./AxiosCreation";
import { AxiosResponse } from "axios";

export const userEndPoints = {
    API_GET_USERINFO: async (data: I_UserinfoReq) => {
        const config: RequestConfig<I_UserinfoReq> = {
            url: apiRouteEndPoints.GET_USER_INFO,
            method: "GET",
            params: data,
            isTokenRequired: true,
        };

        return axiosInstance
            .request<I_UserinfoRes, AxiosResponse<I_UserinfoRes>, I_UserinfoReq>(config)
            .then((response: AxiosResponse<I_UserinfoRes>) => response.data);
    },

    API_EDIT_USERINFO: async (data: I_EditUserInfoReq) => {
        const config: RequestConfig<I_EditUserInfoReq> = {
            url: apiRouteEndPoints.EDIT_USER_INFO,
            method: "GET",
            params: data,
            isTokenRequired: true,
        };

        return axiosInstance
            .request<never, AxiosResponse<never>, I_EditUserInfoReq>(config)
            .then((response: AxiosResponse<never>) => response);
    },
};
