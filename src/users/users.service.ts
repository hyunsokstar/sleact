import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    postUsers(email: string, nickname: string, password: string) {
        console.log("email : ", email);

        return `이메일: ${email}, 닉네임: ${nickname} 비밀번호: ${password} `
    }
}
