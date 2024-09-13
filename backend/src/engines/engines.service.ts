import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Prisma, Engine} from "@prisma/client";

@Injectable()
export class EnginesService {
    constructor(private prisma: PrismaService) {
    }


    async findOne(where: Prisma.EngineWhereUniqueInput) {
        return this.prisma.engine.findFirst({
            where,
            include: {
                engineType: true
            }
        })
    }

    async findAll(): Promise<Engine[]> {
        return this.prisma.engine.findMany({
            include: {
                engineType: true
            }
        })
    }

    async create(data: Prisma.EngineCreateInput) {
        return this.prisma.engine.create({data})
    }

    async update(params: { where: Prisma.EngineWhereUniqueInput, data: Prisma.EngineUpdateInput }) {
        const {where, data} = params
        return this.prisma.engine.update({
            where,
            data
        })
    }

    async delete(where: Prisma.EngineWhereUniqueInput) {
        return this.prisma.engine.delete({where})
    }
}
