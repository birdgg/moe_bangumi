import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { mikanParser } from 'src/libs/parser/analyser/mikanParser';
import { getSavePath } from 'src/libs/parser/analyser/pathParser';
import { pick } from 'lodash';
import { SettingService } from '../setting/setting.service';

@Injectable()
export class BangumisService {
  constructor(
    private prismaService: PrismaService,
    private settingService: SettingService,
  ) {}

  async findAll() {
    const bangumis = await this.prismaService.bangumi.findMany();
    return bangumis;
  }

  async findOrCreate(data: Prisma.BangumiUncheckedCreateInput, link: string) {
    const { nameZh, season } = data;
    let bangumi = await this.prismaService.bangumi.findUnique({
      where: { nameZh_season: { nameZh, season } },
    });
    if (!bangumi) {
      const { poster } = await mikanParser(link);
      bangumi = await this.prismaService.bangumi.create({
        data: {
          ...pick(data, ['nameZh', 'nameEn', 'season']),
          poster,
          savePath: getSavePath(this.getBaseSavePath(), nameZh, season),
        },
      });
    }
    return bangumi;
  }

  async findOne(name: string, season: number) {
    const bangumi = await this.prismaService.bangumi.findUnique({
      where: { nameZh_season: { nameZh: name, season: season } },
    });
    return bangumi;
  }

  async upsert(
    name: string,
    season: number,
    data: Prisma.BangumiUncheckedCreateInput,
  ) {
    await this.prismaService.bangumi.upsert({
      where: { nameZh_season: { nameZh: name, season: season } },
      update: data,
      create: data,
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} bangumi`;
  }

  private getBaseSavePath() {
    return this.settingService.getSetting().downloader.path;
  }
}
