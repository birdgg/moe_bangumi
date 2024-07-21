import { Inject } from "@nestjs/common";
import Axios, { type AxiosInstance } from "axios";
import { AXIOS_INSTANCE_TOKEN } from "./http.constant";

export class HttpService {
	constructor(
		@Inject(AXIOS_INSTANCE_TOKEN)
		protected readonly instance: AxiosInstance = Axios,
	) {}

	get axiosRef(): AxiosInstance {
		return this.instance;
	}
}
