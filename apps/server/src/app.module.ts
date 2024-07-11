import { Module } from '@nestjs/common';
import { SettingModule } from '@/modules/setting/setting.module';
import { PrismaModule } from 'nestjs-prisma';
import { AnalyserModule } from '@/modules/analyser/analyser.module';
import { BangumiModule } from '@/modules/bangumi/bangumi.module';
import { MikanModule } from '@/modules/mikan/mikan.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    AnalyserModule,
    BangumiModule,
    SettingModule,
    MikanModule,
  ],
})
export class AppModule {}
