import { Injectable } from '@nestjs/common';
import { EngineType, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EngineTypesService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.EngineTypeWhereUniqueInput) {
    return this.prisma.engineType.findFirst({
      where,
    });
  }

  async findAll(): Promise<EngineType[]> {
    return this.prisma.engineType.findMany({});
  }

  async create(data: Prisma.EngineTypeCreateInput) {
    return this.prisma.engineType.create({ data });
  }

  async update(params: {
    where: Prisma.EngineTypeWhereUniqueInput;
    data: Prisma.EngineTypeUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.engineType.update({
      where,
      data,
    });
  }

  async delete(where: Prisma.EngineTypeWhereUniqueInput) {
    return this.prisma.engineType.delete({ where });
  }
}
