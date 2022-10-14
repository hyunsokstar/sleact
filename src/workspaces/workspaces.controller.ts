import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('WORKSPACES')
@Controller('api/workspaces')
export class WorkspacesController {

    @Get() 
    getMyWorkspaces() {
        
    }

    @Post()
    createWorkspace() {
    }

    @Get(':url/members')
    getAllMembersFromWorkspace() {

    }

    @Post(':url/members')
    inviteMembersToWorkspace() {}

    @Delete(':url/members/:id') 
    kickMemberFromWorkspace() {
    }

    @Get(':url/users/:id')
    DEPRECEATED_getMemberInfoInWorkspace() {
        this.DEPRECEATED_getMemberInfoInWorkspace();
    }


}
