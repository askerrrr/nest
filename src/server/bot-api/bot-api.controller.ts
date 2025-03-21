import { UserDto, OrderDto } from './bot-api.dto';
import { BotApiService } from './bot-api.service';

import { Get, Body, Post, Param, Headers, Controller } from '@nestjs/common';

@Controller('bot')
export class BotApiController {
  constructor(private readonly botApiService: BotApiService) {}

  @Post('api/users')
  async createUser(@Body() body: UserDto, @Headers() headers) {
    var authHeader = headers.authorization;

    var validAuthHeader =
      await this.botApiService.validateAuthHeader(authHeader);

    if (validAuthHeader) {
      return await this.botApiService.createUser(body);
    }
  }

  @Post('api/order')
  async createOrder(@Body() body: OrderDto, @Headers() headers) {
    var authHeader = headers.authorization;

    var validAuthHeader =
      await this.botApiService.validateAuthHeader(authHeader);

    if (validAuthHeader) {
      return this.botApiService.createOrder(body);
    }
  }

  @Get('/api/status/:userId')
  async fetchOrderDetails(@Param('userId') userId: string, @Headers() headers) {
    var authHeader = headers.authorization;

    var validAuthHeader =
      await this.botApiService.validateAuthHeader(authHeader);

    if (validAuthHeader) {
      var orderDetails = await this.botApiService.getOrderDetails(userId);
      return orderDetails;
    }
  }
}
