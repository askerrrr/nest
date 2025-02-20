import { RootService } from './root.service';
import { Get, Controller } from '@nestjs/common';

@Controller()
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @Get('/api/users')
  async getUsers() {
    return this.rootService.getUsers();
  }
}
