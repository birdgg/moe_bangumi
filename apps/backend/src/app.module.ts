import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { QbittorrentModule } from './modules/qbittorrent/qbittorrent.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RenameModule } from './modules/rename/rename.module';
import { SettingModule } from './modules/setting/setting.module';
import { BangumiModule } from './modules/bangumi/bangumi.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MikanModule } from './modules/mikan/mikan.module';
import { LogModule } from './modules/log/log.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    EventEmitterModule.forRoot(),
    LogModule,
    SettingModule,
    QbittorrentModule,
    BangumiModule,
    MikanModule,
    RenameModule,
  ],
})
export class AppModule {}
