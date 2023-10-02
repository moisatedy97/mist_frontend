/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_AUTH_BACKEND_ENDPOINT: string;
    readonly VITE_APP_RAWG_BACKEND_ENDPOINT: string;
    readonly VITE_APP_RAWG_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
