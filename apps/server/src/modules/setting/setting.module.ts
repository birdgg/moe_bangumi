import { Global, Module } from '@nestjs/common';
import { SettingsService } from './setting.service';

@Global()
@Module({
	providers: [SettingsService,],
	exports: [SettingsService],
})
export class SettingsModule { }
