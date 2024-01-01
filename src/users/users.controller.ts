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
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    let user = await this.usersService.findOneById({ id: +id });
    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    let user = await this.usersService.findOneById({ id: +id });
    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return this.usersService.update({ where: { id: +id }, data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    let user = await this.usersService.findOneById({ id: +id });
    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return this.usersService.delete({ id: +id });
  }
}
