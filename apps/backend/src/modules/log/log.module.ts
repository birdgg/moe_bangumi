import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { LoggerModule } from 'nestjs-pino';
import { LOG_FILE } from './constant';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        customLevels: {
          info: 20,
          debug: 40,
          warn: 50,
          error: 60,
        },
        useOnlyCustomLevels: true,
        transport: {
          targets: [
            {
              level: 'info',
              target: 'pino-pretty',
            },
            {
              level: 'debug',
              target: 'pino/file',
              options: {
                destination: LOG_FILE,
                mkdir: true,
              },
            },
          ],
        },
      },
    }),
  ],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
