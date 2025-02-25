import { Body, Post, Controller } from '@nestjs/common';
import { BotApiService } from './bot-api.service';

@Controller('bot')
export class BotApiController {
  constructor(private readonly botApiService: BotApiService) {}

  @Post('api/users')
  async createUser(@Body() body) {
    return await this.botApiService.createUser(body.userId);
  }

  @Post('api/order')
  async createOrder(@Body() body) {
    return this.botApiService.createOrder(body);
  }
}
