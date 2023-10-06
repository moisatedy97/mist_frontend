import { create } from "zustand";
import { produce } from "immer";
import { Game } from "../interfaces/TypeGame";

export type I_StoreGames = {
  popularGames: Game[];
  topRatedGames: Game[];
  topSportsGames: Game[];
};

type GamesActions = {
  setPopularGames: (popularGames: Game[]) => void;
  setTopRatedGames: (topRatedGames: Game[]) => void;
  setTopSportsGames: (topSportsGames: Game[]) => void;
};

export const useGamesStore = create<I_StoreGames & GamesActions>()((set) => {
  return {
    popularGames: [],
    topRatedGames: [],
    topSportsGames: [],
    setPopularGames: (popularGames: Game[]) =>
      set(
        produce((state: I_StoreGames) => {
          state.popularGames = popularGames;
        }),
      ),
    setTopRatedGames: (topRatedGames: Game[]) =>
      set(
        produce((state: I_StoreGames) => {
          state.topRatedGames = topRatedGames;
        }),
      ),
    setTopSportsGames: (topSportsGames: Game[]) =>
      set(
        produce((state: I_StoreGames) => {
          state.topSportsGames = topSportsGames;
        }),
      ),
  };
});
