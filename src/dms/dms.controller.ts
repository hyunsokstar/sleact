import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { query } from 'express';

@Controller('api/workspaces/:url/dms')
export class DmsController {

    getChat(@Query() query, @Param() param) {
        console.log(query.perPage, query.page);
            console.log(param.id, param.url) 
    }

    @Post(':id/chats')
    postChat(@Body() body) {}

}

