import { Module } from '@nestjs/common';
import { SettingModule } from '@/modules/setting/setting.module';
import { PrismaModule } from 'nestjs-prisma';
import { AnalyserModule } from '@/modules/analyser/analyser.module';
import { BangumiModule } from '@/modules/bangumi/bangumi.module';
import { MikanModule } from '@/modules/mikan/mikan.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    // order matters
    AnalyserModule,
    BangumiModule,
    SettingModule,
    MikanModule,
  ],
})
export class AppModule {}
