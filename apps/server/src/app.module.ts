import { Module } from '@nestjs/common';
import { SettingModule } from './modules/setting/setting.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true
    }),
    SettingModule
  ],
})
export class AppModule { }
