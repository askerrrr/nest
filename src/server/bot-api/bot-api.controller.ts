import { BotApiService } from './bot-api.service';
import { CreateUserDto, CreateOrderDto } from './bot-api.dto';

import { Response } from 'express';
import {
  Get,
  Res,
  Body,
  Post,
  Param,
  Headers,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('bot/api')
export class BotApiController {
  constructor(private readonly botApiService: BotApiService) {}

  @Post('users')
  async createUser(
    @Headers() headers,
    @Res() res: Response,
    @Body() body: CreateUserDto,
  ) {
    var authHeader = headers.authorization;

    var validAuthHeader =
      await this.botApiService.validateAuthHeader(authHeader);

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    if (validAuthHeader) {
      var successfullCreateUser = await this.botApiService.createUser(body);

      return successfullCreateUser ? res.sendStatus(200) : res.sendStatus(409);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Post('order')
  async createOrder(
    @Headers() headers,
    @Res() res: Response,
    @Body() body: CreateOrderDto,
  ) {
    var authHeader = headers.authorization;

    var validAuthHeader =
      await this.botApiService.validateAuthHeader(authHeader);

    if (validAuthHeader) {
      var successfullCreate = await this.botApiService.createOrder(body);

      return successfullCreate ? res.sendStatus(200) : res.sendStatus(304);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get('/status/:userId')
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
