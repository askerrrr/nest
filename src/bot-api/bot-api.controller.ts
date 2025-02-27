import { Body, Post, Controller, Get, Param } from '@nestjs/common';
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
  @Get('/api/status/:userId')
  async fetchOrderDetails(@Param() param) {
    return await this.botApiService.getOrderDetails(param.userId);
  }
}
