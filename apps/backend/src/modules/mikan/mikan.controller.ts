import { Controller, Post } from '@nestjs/common';
import { MikanService } from './mikan.service';

const URL =
  'https://mikanani.me/RSS/MyBangumi?token=IrNydFnGd1%2fZ56onK1aljQ%3d%3d';

@Controller('mikan')
export class MikanController {
  constructor(private mikanService: MikanService) {}

  @Post('add')
  addFeed() {
    this.mikanService.addFeed(URL);
  }
}
