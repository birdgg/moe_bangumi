import { Controller, Get, Param, Delete } from '@nestjs/common';
import { BangumisService } from './bangumis.service';
import { ApiTags } from '@nestjs/swagger';
import { Bangumi } from 'src/generated/bangumi.entity';

@ApiTags('bangumis')
@Controller('bangumis')
export class BangumisController {
  constructor(private readonly bangumisService: BangumisService) {}

  @Get()
  async findAll(): Promise<Bangumi[]> {
    return this.bangumisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bangumisService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bangumisService.remove(+id);
  }
}
