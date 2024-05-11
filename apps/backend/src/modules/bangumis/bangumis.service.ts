import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BangumisService {
  constructor(private prismaService: PrismaService) {}
  create() {
    return 'This action adds a new bangumi';
  }

  async findAll() {
    const bangumis = await this.prismaService.bangumi.findMany();
    return bangumis;
  }

  findOne(id: number) {
    return `This action returns a #${id} bangumi`;
  }

  update(id: number) {
    return `This action updates a #${id} bangumi`;
  }

  remove(id: number) {
    return `This action removes a #${id} bangumi`;
  }
}
