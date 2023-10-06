import { AxiosError, AxiosResponse } from "axios";
import { InternalRequestConfig } from "./RequestConfig";

export type ResponseConfig = AxiosResponse & {
  config: InternalRequestConfig;
};

export type ResponseErrorConfig = AxiosError & {
  config: InternalRequestConfig;
};
