import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async postUsers(email: string, nickname: string, password: string) {
    // 유효성 검사 3개 삭제

    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      // throw new HttpException({
      //     status: HttpStatus.UNAUTHORIZED,
      //     message: ' 이미 존재하는 유저',
      // }, HttpStatus.UNAUTHORIZED);
      throw new UnauthorizedException('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });

  }
}
