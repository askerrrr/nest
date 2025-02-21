import { AuthGuard } from 'src/auth/auth.guard';
import { RootService } from './root.service';
import { Get, Controller, UseGuards } from '@nestjs/common';

@Controller()
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @UseGuards(AuthGuard)
  @Get('/api/users')
  async getUsers() {
    return this.rootService.getUsers();
  }
}
