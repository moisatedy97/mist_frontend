import { Game } from "@/interfaces/TypeGame";
import { produce } from "immer";
import { create } from "zustand";

export type I_DisplayedGame = {
    displayedGame: Game | null;
};

type DisplayedGameActions = {
    setDisplayedGame: (displayedGame: Game) => void;
};

export const useDisplayedGameStore = create<I_DisplayedGame & DisplayedGameActions>()((set) => {
    return {
        displayedGame: null,
        setDisplayedGame: (displayedGame: Game) =>
            set(
                produce((state: I_DisplayedGame) => {
                    state.displayedGame = displayedGame;
                }),
            ),
    };
});
