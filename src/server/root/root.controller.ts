import { join } from 'path';
import { Response } from 'express';
import { Get, Res, Controller, UseGuards } from '@nestjs/common';

import { RootService } from './root.service';
import { AuthGuard } from 'src/server/auth/auth.guard';

@Controller()
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @UseGuards(AuthGuard)
  @Get()
  async serveIndex(@Res() res: Response) {
    var users = await this.rootService.getUsers();

    return users?.length
      ? res.sendFile(join(__dirname, '../../src/client/index.html'))
      : res.sendFile(join(__dirname, '../../src/client/noUsers.html'));
  }
  @UseGuards(AuthGuard)
  @Get('/api/users')
  async getUsers() {
    var users = await this.rootService.getUsers();
    return users;
  }
}
