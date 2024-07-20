import { DynamicModule, Global, Module } from "@nestjs/common";
import { SettingController } from "./setting.controller";
import { SettingService } from "./setting.service";

@Global()
@Module({})
export class SettingModule {
	static forRootAsync(): DynamicModule {
		return {
			module: SettingModule,
			controllers: [SettingController],
			providers: [
				{
					provide: SettingService,
					useFactory: async () => {
						// @ts-expect-error
						const settingService = new SettingService();
						await settingService.load();
						return settingService;
					},
				},
			],
			exports: [SettingService],
		};
	}
}
