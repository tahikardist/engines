import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EngineTypesService } from './engine-types.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('engine-types')
export class EngineTypesController {
  constructor(private engineTypesService: EngineTypesService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const engine = await this.engineTypesService.findOne({ id: +id });
    if (!engine) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return engine;
  }

  @Get()
  async findAll() {
    return this.engineTypesService.findAll();
  }

  @Post()
  async create(@Body() data: Prisma.EngineTypeCreateInput) {
    return this.engineTypesService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.EngineTypeUpdateInput,
  ) {
    let engineType = await this.engineTypesService.findOne({ id: +id });
    if (!engineType) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return this.engineTypesService.update({ where: { id: +id }, data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    let engineType = await this.engineTypesService.findOne({ id: +id });
    if (!engineType) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return this.engineTypesService.delete({ id: +id });
  }
}
