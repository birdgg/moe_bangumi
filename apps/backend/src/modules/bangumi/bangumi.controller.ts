import { Controller, Get, Param, Delete } from '@nestjs/common';
import { BangumisService } from './bangumis.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bangumi')
@Controller('bangumis')
export class BangumisController {
  constructor(private readonly bangumisService: BangumisService) {}

  @Get()
  async findAll() {
    const bangumis = await this.bangumisService.findAll();
    return bangumis;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bangumisService.remove(+id);
  }
}
