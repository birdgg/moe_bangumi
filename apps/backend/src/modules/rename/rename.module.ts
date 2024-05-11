import { Module } from '@nestjs/common';
import { RenameService } from './rename.service';

@Module({
  providers: [RenameService],
})
export class RenameModule {}
