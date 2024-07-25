import { AxiosRequestConfig } from "axios";

export type HttpModuleOptions = AxiosRequestConfig;

export type RequestOptions = AxiosRequestConfig & {
	cache?: boolean;
	ttl?: number;
};
