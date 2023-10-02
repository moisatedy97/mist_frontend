import { Game } from "./TypeGame";

export type GetGamesRes = RawgRes;

export type RawgRes = {
    count: number;
    next: string;
    previous: string;
    results: Game[];
};
