import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: "say hello world" })
  @Get()
  getSecretAboutHyunsok(): string {
    console.log("test")
    return  this.appService.getHello();
  }

}
