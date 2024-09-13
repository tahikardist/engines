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
import { EnginesService } from './engines.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('engines')
export class EnginesController {
  constructor(private enginesService: EnginesService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let engine = await this.enginesService.findOne({ id: +id });
    if (!engine) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return engine;
  }

  @Get()
  async findAll() {
    return this.enginesService.findAll();
  }

  @Post()
  async create(@Body() data: Prisma.EngineCreateInput) {
    return this.enginesService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.EngineUpdateInput,
  ) {
    let engine = await this.enginesService.findOne({ id: +id });
    if (!engine) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return this.enginesService.update({ where: { id: +id }, data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    let engine = await this.enginesService.findOne({ id: +id });
    if (!engine) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return this.enginesService.delete({ id: +id });
  }
}
