import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Engine } from '@prisma/client';

@Injectable()
export class EnginesService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.EngineWhereUniqueInput) {
    return this.prisma.engine.findFirst({
      where,
      include: {
        engineType: true,
      },
    });
  }

  async findAll(params: {
    q: string;
    sort: 'title';
    order: 'asc' | 'desc';
  }): Promise<Engine[]> {
    return this.prisma.engine.findMany({
      where: {
        OR: [
          { title: { contains: params.q } },
          { description: { contains: params.q } },
        ],
      },
      orderBy: {
        title: params.sort === 'title' ? params.order : undefined,
      },
      include: {
        engineType: true,
      },
    });
  }

  async create(data: Prisma.EngineCreateInput) {
    return this.prisma.engine.create({ data });
  }

  async update(params: {
    where: Prisma.EngineWhereUniqueInput;
    data: Prisma.EngineUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.engine.update({
      where,
      data,
    });
  }

  async delete(where: Prisma.EngineWhereUniqueInput) {
    return this.prisma.engine.delete({ where });
  }
}
