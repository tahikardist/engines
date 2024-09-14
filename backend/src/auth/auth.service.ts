import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    let user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      let { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    let payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: { username: string; password: string }) {
    let user = await this.usersService.findOne(data.username);
    if (user)
      throw new HttpException(
        'Такой пользователь уже существует',
        HttpStatus.CONFLICT,
      );

    let newUser = await this.usersService.create({
      username: data.username,
      password: data.password,
    });

    let payload = { username: newUser.username, sub: newUser.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
