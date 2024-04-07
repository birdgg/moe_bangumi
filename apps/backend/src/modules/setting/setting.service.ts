import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Setting } from 'src/interfaces/setting.interface';

@Injectable()
export class SettingService {
  constructor(private prismaService: PrismaService) {}

  async findOne(id: number) {
    const setting = await this.prismaService.setting.findUnique({
      where: { id },
    });
    return setting;
  }

  async update(id: number, data: Setting) {
    const setting = this.prismaService.setting.update({ where: { id }, data });
    return setting;
  }
}
