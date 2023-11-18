import { Module } from '@nestjs/common';
import { EngineTypesController } from './engine-types.controller';
import { EngineTypesService } from './engine-types.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [EngineTypesController],
  providers: [EngineTypesService, PrismaService],
  exports: [EngineTypesService],
})
export class EngineTypesModule {}
