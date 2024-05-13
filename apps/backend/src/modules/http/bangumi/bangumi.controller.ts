import { Controller, Get, Param, Delete } from '@nestjs/common';
import { BangumisService } from './bangumis.service';
import { ApiTags } from '@nestjs/swagger';
import { Bangumi } from 'src/generated/bangumi.entity';

@ApiTags('Bangumi')
@Controller('bangumis')
export class BangumisController {
  constructor(private readonly bangumisService: BangumisService) {}

  @Get()
  async findAll(): Promise<Bangumi[]> {
    return this.bangumisService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bangumisService.remove(+id);
  }
}
