import { UsersService } from './users.service';
import { JoinRequestDto } from './dto/join.request.dto';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {

  }

  @Get()
  getUsers(@Req() req) {
    console.log("get user 요청 확인");
    return "get user 요청 확인";
  }

  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    const reponse = this.userService.postUsers(data.email, data.nickname, data.password);
    return reponse;
  }

  @Post('login')
  logIn(@Body() data: JoinRequestDto) {
    // return req.user

  }

  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
