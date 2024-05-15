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
import { LoggerModule } from 'nestjs-pino';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            {
              level: 'debug',
              target: 'pino/file',
              options: {
                destination: `${process.cwd()}/data/app.log`,
                mkdir: true,
              },
            },
          ],
        },
      },
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    EventEmitterModule.forRoot(),
    SettingModule,
    QbittorrentModule,
    BangumiModule,
    MikanModule,
    RenameModule,
  ],
})
export class AppModule {}
