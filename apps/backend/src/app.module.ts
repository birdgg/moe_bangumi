import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MikanModule } from './modules/mikan/mikan.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    MikanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
