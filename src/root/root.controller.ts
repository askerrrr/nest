import { join } from 'path';
import { Response } from 'express';
import { Get, Res, Controller, UseGuards } from '@nestjs/common';

import { RootService } from './root.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @UseGuards(AuthGuard)
  @Get()
  async serveIndex(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'client', 'index.html'));
  }
  @UseGuards(AuthGuard)
  @Get('/api/users')
  async getUsers() {
    return await this.rootService.getUsers();
  }
}
