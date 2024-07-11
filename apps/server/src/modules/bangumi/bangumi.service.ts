import { SettingService } from '@/modules/setting/setting.service';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BangumiService {
  private logger = new Logger(BangumiService.name);
  constructor(
    private prismaService: PrismaService,
    private settingService: SettingService,
  ) {}

  async findAll() {
    const bangumis = await this.prismaService.bangumi.findMany();
    return bangumis;
  }

  async findOrCreate(data: Prisma.BangumiUncheckedCreateInput, url: string) {
    const { nameZh, season } = data;
    if (!nameZh || !season) return;

    this.logger.log(`Find or create bangumi: ${nameZh} ${season}`);

    const bangumi = await this.prismaService.bangumi.upsert({
      where: { nameZh_season: { nameZh, season } },
      create: data,
      update: {},
    });
    return bangumi;
  }

  async findOne(name: string, season: number) {
    const bangumi = await this.prismaService.bangumi.findUnique({
      where: { nameZh_season: { nameZh: name, season: season } },
    });
    return bangumi;
  }
}
