import { DynamicModule, Global, Module } from "@nestjs/common";
import Axios, { CreateAxiosDefaults } from "axios";
import axiosRetry from "axios-retry";
import { SettingModule } from "../setting/setting.module";
import { SettingService } from "../setting/setting.service";
import { AXIOS_INSTANCE_TOKEN } from "./http.constant";
import { HttpService } from "./http.service";

@Global()
@Module({})
export class HttpModule {
	static forRootAsync(): DynamicModule {
		return {
			module: HttpModule,
			imports: [SettingModule],
			providers: [
				{
					provide: AXIOS_INSTANCE_TOKEN,
					useFactory: (setting: SettingService) => {
						// const proxy = setting.setting.proxy
						const config: CreateAxiosDefaults = {};
						return axiosRetry(Axios.create(config));
					},
					inject: [SettingService],
				},
				HttpService,
			],
			exports: [HttpService],
		};
	}
}
