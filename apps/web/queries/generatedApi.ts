export interface paths {
    "/api/settings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["SettingController_find"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["SettingController_update"];
        trace?: never;
    };
    "/api/bangumis": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["BangumisController_findAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/bangumis/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["BangumisController_findOne"];
        put?: never;
        post?: never;
        delete: operations["BangumisController_remove"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Program: {
            rssTime: number;
            renameTime: number;
            mikanToken: string;
        };
        Downloader: {
            host: string;
            username: string;
            password: string;
            path: string;
        };
        Setting: {
            program: components["schemas"]["Program"];
            downloader: components["schemas"]["Downloader"];
        };
        UpdateSettingDto: {
            program?: components["schemas"]["Program"];
            downloader?: components["schemas"]["Downloader"];
        };
        Bangumi: {
            id?: number;
            nameZh?: string;
            nameJp?: string | null;
            nameEn?: string | null;
            poster?: string;
            season?: number;
            year?: number | null;
            isCompleted?: boolean;
            offset?: number;
            savePath?: string;
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            updatedAt?: string;
            deleted?: boolean;
            episode?: components["schemas"]["Episode"][];
        };
        Episode: {
            id?: number;
            name?: string;
            bangumiId?: number;
            bangumi: components["schemas"]["Bangumi"];
            episode?: number;
            sub?: string;
            source?: string | null;
            dpi?: string;
            torrent?: string;
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            updatedAt?: string;
            deleted?: boolean;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    SettingController_find: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Setting"];
                };
            };
        };
    };
    SettingController_update: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateSettingDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    BangumisController_findAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Bangumi"][];
                };
            };
        };
    };
    BangumisController_findOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    BangumisController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
}
