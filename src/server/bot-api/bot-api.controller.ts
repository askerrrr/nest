import { BotApiService } from './bot-api.service';

import { Get, Body, Post, Param, Headers, Controller } from '@nestjs/common';

@Controller('bot')
export class BotApiController {
  constructor(private readonly botApiService: BotApiService) {}

  @Post('api/users')
  async createUser(@Body() body, @Headers() headers) {
    var authHeader = headers.authorization;

    var validAuthHeader =
      await this.botApiService.validateAuthHeader(authHeader);

    if (validAuthHeader) {
      var { userId } = body;

      return await this.botApiService.createUser(userId);
    }
  }

  @Post('api/order')
  async createOrder(@Body() body, @Headers() headers) {
    var authHeader = headers.authorization;

    var validAuthHeader =
      await this.botApiService.validateAuthHeader(authHeader);

    if (validAuthHeader) {
      return this.botApiService.createOrder(body);
    }
  }

  @Get('/api/status/:userId')
  async fetchOrderDetails(@Param() param, @Headers() headers) {
    var authHeader = headers.authorization;

    var validAuthHeader =
      await this.botApiService.validateAuthHeader(authHeader);

    if (validAuthHeader) {
      var { userId } = param;

      return await this.botApiService.getOrderDetails(userId);
    }
  }
}
