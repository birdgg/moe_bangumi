import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Mutex } from "async-mutex";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class BangumiService {
  private logger = new Logger(BangumiService.name);
  private bangumiMutex = new Mutex();
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const bangumis = await this.prismaService.bangumi.findMany();
    return bangumis;
  }

  async findByNameSeason(
    select: Prisma.BangumiOriginNameSeasonCompoundUniqueInput,
  ) {
    return this.prismaService.bangumi.findUnique({
      where: {
        originName_season: select,
      },
    });
  }

  async create(data: Prisma.BangumiUncheckedCreateInput) {
    this.bangumiMutex.runExclusive(async () => {
      await this.prismaService.bangumi.create({
        data,
      });
    });
  }
}
