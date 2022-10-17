import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    async postUsers(email: string, nickname: string, password: string) {
        if (!email) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                message: ' 이메일이 없습니다.',
            }, HttpStatus.UNAUTHORIZED);
        }
        if (!nickname) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                message: ' 닉네임이 없습니다.',
            }, HttpStatus.UNAUTHORIZED);
        }
        if (!password) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                message: '비밀번호가 없습니다.',
            }, HttpStatus.UNAUTHORIZED);
        }

        const user = await this.usersRepository.findOne({ where: { email } })

        if (user) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                message: ' 이미 존재하는 유저',
            }, HttpStatus.UNAUTHORIZED);
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await this.usersRepository.save({
            email,
            nickname,
            password: hashedPassword,
        })
    }

}
