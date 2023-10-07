import { Game } from "@/interfaces/TypeGame";
import { I_BoughtGames } from "../BoughtGamesStore";
import { Notification } from "@/interfaces/TypeNotification";
import { I_AuthToken } from "../authentication/AuthTokenStore";

const sessionStore: Storage = sessionStorage;
const localStore: Storage = localStorage;

enum SESSION_STORAGE_KEYS {
  BOUGHT_GAMES = "bought_games",
  NOTIFICATIONS = "notifications",
}

enum LOCAL_STORAGE_KEYS {
  TOKEN = "token",
}

export const accessSessionStorage = {
  GET_BOUGHT_GAMES: (): I_BoughtGames => {
    return JSON.parse(sessionStore.getItem(SESSION_STORAGE_KEYS.BOUGHT_GAMES) as string);
  },
  SET_BOUGHT_GAMES: (games: I_BoughtGames): void => {
    sessionStore.setItem(SESSION_STORAGE_KEYS.BOUGHT_GAMES, JSON.stringify(games));
  },
  PUSH_GAME: (game: Game): void => {
    const sessionStorageBoughtGames: I_BoughtGames = accessSessionStorage.GET_BOUGHT_GAMES();

    if (sessionStorageBoughtGames) {
      sessionStorageBoughtGames.boughtGames.push(game);
      accessSessionStorage.SET_BOUGHT_GAMES(sessionStorageBoughtGames);
    }
  },
  REMOVE_BOUGHT_GAMES: (): void => {
    sessionStore.removeItem(SESSION_STORAGE_KEYS.BOUGHT_GAMES);
  },
  GET_NOTIFICATIONS: (): Notification[] => {
    return JSON.parse(sessionStore.getItem(SESSION_STORAGE_KEYS.NOTIFICATIONS) as string);
  },
  SET_NOTIFICATIONS: (notifications: Notification[]): void => {
    sessionStore.setItem(SESSION_STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  },
  REMOVE_NOTIFICATIONS: (): void => {
    sessionStore.removeItem(SESSION_STORAGE_KEYS.NOTIFICATIONS);
  },
};

export const accessLocalStorage = {
  GET_AUTHENTICATION_TOKEN: (): I_AuthToken | null => {
    return JSON.parse(localStore.getItem(LOCAL_STORAGE_KEYS.TOKEN) as string);
  },
  SET_AUTHENTICATION_TOKEN: (token: I_AuthToken): void => {
    localStore.setItem(LOCAL_STORAGE_KEYS.TOKEN, JSON.stringify(token));
  },
  REMOVE_AUTHENTICATION_TOKEN: (): void => {
    localStore.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
  },
};
