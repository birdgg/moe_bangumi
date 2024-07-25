import { Inject, Injectable, Logger } from "@nestjs/common";
import Axios, { type AxiosResponse, type AxiosInstance } from "axios";
import { AXIOS_INSTANCE_TOKEN } from "./http.constant";
import { RequestOptions } from "./http.types";

@Injectable()
export class HttpService {
	logger = new Logger(HttpService.name);

	constructor(
		@Inject(AXIOS_INSTANCE_TOKEN)
		protected readonly instance: AxiosInstance = Axios,
	) {}

	get axiosRef(): AxiosInstance {
		return this.instance;
	}

	get<T = any>(url: string, options) {
		return this.makeRequest<T>({ ...options, method: "get", url });
	}

	post<T = any>(url: string, options) {
		return this.makeRequest<T>({ ...options, method: "post", url });
	}

	delete<T = any>(url: string, options) {
		return this.makeRequest<T>({ ...options, method: "delete", url });
	}

	private async makeRequest<T = any>(
		config: RequestOptions,
	): Promise<AxiosResponse<T>> {
		const { cache, ...axiosOptions } = config;
		this.logger.debug(this.instance);
		return this.instance(axiosOptions);
	}
}
