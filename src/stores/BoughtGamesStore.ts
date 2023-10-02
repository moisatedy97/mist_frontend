import { Game } from "@/interfaces/TypeGame";
import { produce } from "immer";
import { create } from "zustand";
import { accessSessionStorage } from "./browser/SessionStorage";

export type I_BoughtGames = {
    boughtGames: Game[];
};

type GamesActions = {
    setBoughtGames: (boughtGames: Game[]) => void;
    buyGame: (game: Game) => void;
};

const sessionStorageBoughtGames: I_BoughtGames = accessSessionStorage.GET_BOUGHT_GAMES();
let defaultBoughtGames: Game[] = [];

if (sessionStorageBoughtGames) {
    defaultBoughtGames = sessionStorageBoughtGames.boughtGames;
}

accessSessionStorage.SET_BOUGHT_GAMES({ boughtGames: defaultBoughtGames });

export const useBoughtGamesStore = create<I_BoughtGames & GamesActions>()((set) => {
    return {
        boughtGames: defaultBoughtGames,
        setBoughtGames: (boughtGames: Game[]) => {
            set(
                produce((state: I_BoughtGames) => {
                    state.boughtGames = boughtGames;
                }),
            );
        },
        buyGame: (game: Game) => {
            set(
                produce((state: I_BoughtGames) => {
                    const existingGame: Game | undefined = state.boughtGames.find(
                        (boughtGame) => boughtGame.id === game.id,
                    );

                    if (!existingGame) {
                        state.boughtGames.push(game);
                    }
                }),
            );
        },
    };
});
