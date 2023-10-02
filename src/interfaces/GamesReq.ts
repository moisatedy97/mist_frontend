import { GAMES_ORDER_BY } from "../constants/Constants";

export type GetGamesReq = {
    key?: string;
    page_size?: number;
    ordering?: GAMES_ORDER_BY;
    tags?: string;
    genres?: string;
    platforms?: string;
};

export type GetGameInfoReq = {
    key?: string;
    id?: number;
};
