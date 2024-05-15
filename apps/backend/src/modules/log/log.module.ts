import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { LoggerModule } from 'nestjs-pino';
import { LOG_FILE } from './constant';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            { level: 'debug', target: 'pino-pretty' },
            {
              level: 'info',
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
