import { UndefinedToNullInterceptor } from './../common/interceptors/undefinedToNull.interceptor';
import { UsersService } from './users.service';
import { JoinRequestDto } from './dto/join.request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';
import { User } from 'src/common/decorators/user.decorator';

import { Body, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';


@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })

  @ApiOperation({ summary: '내 정보 조회' })
  @Get()
  getUsers(@User() user) {
    console.log('get user 요청 확인');
    return 'get user 요청 확인';
  }



  @ApiOperation({ summary: '회원 가입' })
  @Post()
  async postUsers(@Body() data: JoinRequestDto) {

    console.log("회원 가입 신청 확인 !");
    

    const reponse = await this.userService.postUsers(
      data.email,
      data.nickname,
      data.password,
    );
    return reponse;
  }

  
  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}


// npm i typeorm-model-generator -D