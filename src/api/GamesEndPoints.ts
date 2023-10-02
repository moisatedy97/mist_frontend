import { AxiosResponse } from "axios";
import { apiRouteEndPoints } from "../constants/Constants";
import { GetGameInfoReq, GetGamesReq } from "../interfaces/GamesReq";
import axiosInstance from "./AxiosCreation";
import { GetGamesRes } from "../interfaces/GamesRes";
import { Game } from "@/interfaces/TypeGame";
import { RequestConfig } from "@/interfaces/RequestConfig";

const rawgApiKey = import.meta.env.VITE_APP_RAWG_API_KEY;

export const gamesEndPoints = {
    API_GET_GAMES: (data: GetGamesReq) => {
        const config: RequestConfig<GetGamesReq> = {
            url: apiRouteEndPoints.RAWG_GAMES,
            method: "GET",
            params: {
                ...data,
                key: rawgApiKey,
            },
        };

        return axiosInstance
            .request<GetGamesRes, AxiosResponse<GetGamesRes>, GetGamesReq>(config)
            .then((response: AxiosResponse<GetGamesRes>) => response.data);
    },
    API_GET_GAME_INFO: (data: GetGameInfoReq) => {
        const config: RequestConfig<GetGameInfoReq> = {
            url: `${apiRouteEndPoints.RAWG_GAMES}/${data.id}`,
            method: "GET",
            params: {
                key: rawgApiKey,
            },
        };

        return axiosInstance
            .request<Game, AxiosResponse<Game>, GetGamesReq>(config)
            .then((response: AxiosResponse<Game>) => response);
    },
};
