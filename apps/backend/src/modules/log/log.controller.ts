import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogService } from './log.service';

@ApiTags('Log')
@Controller('log')
export class LogController {
  constructor(private logService: LogService) {}

  @Get()
  getLog(): string {
    return this.logService.get();
  }
}
