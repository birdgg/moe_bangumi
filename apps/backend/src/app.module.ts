import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { QbittorrentModule } from './modules/qbittorrent/qbittorrent.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RenameModule } from './modules/rename/rename.module';
import { HttpModule } from './modules/http/http.module';
import { SettingModule } from './modules/setting/setting.module';
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
    SettingModule,
    QbittorrentModule,
    RenameModule,
    HttpModule,
  ],
})
export class AppModule {}
