import { DynamicModule, Global, Module } from "@nestjs/common";
import Axios, { CreateAxiosDefaults } from "axios";
import axiosRetry from "axios-retry";
import { AXIOS_INSTANCE_TOKEN } from "./http.constant";
import { HttpService } from "./http.service";

@Global()
@Module({})
export class HttpModule {
	static forRootAsync(): DynamicModule {
		return {
			module: HttpModule,
			imports: [],
			providers: [
				{
					provide: AXIOS_INSTANCE_TOKEN,
					useFactory: () => {
						// const proxy = setting.setting.proxy
						const config: CreateAxiosDefaults = {};
						const instance = Axios.create(config);
						axiosRetry(instance);
						return instance;
					},
				},
				HttpService,
			],
			exports: [HttpService],
		};
	}
}
