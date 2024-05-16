import { Module } from '@nestjs/common';
import { RenameService } from './rename.service';
import { LogModule } from '../log/log.module';

@Module({
  imports: [LogModule],
  providers: [RenameService],
})
export class RenameModule {}
