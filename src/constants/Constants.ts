const authBackendApiEndPoint: string = import.meta.env.VITE_APP_AUTH_BACKEND_ENDPOINT;
const rawgBackendApiEndPoint: string = import.meta.env.VITE_APP_RAWG_BACKEND_ENDPOINT;

export const apiRouteEndPoints = {
    AUTH_LOGIN: `${authBackendApiEndPoint}/auth/login`,
    AUTH_SIGNUP: `${authBackendApiEndPoint}/auth/register`,
    AUTH_SIGNOUT: `${authBackendApiEndPoint}/auth/logout`,
    AUTH_REFRESH_TOKEN: `${authBackendApiEndPoint}/auth/refresh`,
    AUTH_CHECK_TOKEN: `${authBackendApiEndPoint}/check`,
    GET_USER_INFO: `${authBackendApiEndPoint}/user`,
    EDIT_USER_INFO: `${authBackendApiEndPoint}/edit`,
    RAWG_GAMES: `${rawgBackendApiEndPoint}/games`,
};

export const routerEndPoints = {
    STEAM_PAGE: "/",
    LOGIN_PAGE: "/login",
    SIGNUP_PAGE: "/signup",
};

export enum GAMES_ORDER_BY {
    NAME_ASC = "name",
    NAME_DSC = "-name",
    RELEASED_ASC = "released",
    RELEASED_DSC = "-released",
    ADDED_ASC = "added",
    ADDED_DSC = "-added",
    CREATED_ASC = "created",
    CREATED_DSC = "-created",
    UPDATED_ASC = "updated",
    UPDATED_DSC = "-updated",
    RATING_ASC = "rating",
    RATING_DSC = "-rating",
    METACRITIC_ASC = "metacritic",
    METACRITIC_DSC = "-metacritic",
    PLAYTIME_ASC = "playtime",
    PLAYTIME_DSC = "-playtime",
}
