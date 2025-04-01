import { BotApiService } from './bot-api.service';

import { ParamDto } from '../dto/app.dtos';
import { OrdersDto } from './dto/ordersDto';
import { CreateUserDto } from './dto/createUser-dto';
import { CreateOrderDto } from './dto/createOrder-dto';

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
import { Response } from 'express';
import { plainToClass } from 'class-transformer';

@Controller('bot/api')
export class BotApiController {
  constructor(private readonly botApiService: BotApiService) {}

  @Post('/users')
  async createUser(
    @Headers() headers,
    @Res() res: Response,
    @Body() body: CreateUserDto,
  ) {
    var authHeader = headers.authorization;

    var validAuthHeader =
      await this.botApiService.validateAuthHeader(authHeader);

    if (!validAuthHeader) {
      throw new UnauthorizedException();
    }

    var successfullCreateUser = await this.botApiService.createUser(body);

    return successfullCreateUser ? res.sendStatus(200) : res.sendStatus(409);
  }

  @Post('/order')
  async createOrder(
    @Headers() headers,
    @Res() res: Response,
    @Body() body: CreateOrderDto,
  ): Promise<Response> {
    var authHeader = headers.authorization;

    var validAuthHeader =
      await this.botApiService.validateAuthHeader(authHeader);

    if (!validAuthHeader) {
      throw new UnauthorizedException();
    }

    var successfullCreateOrder = await this.botApiService.createOrder(body);

    return successfullCreateOrder ? res.sendStatus(200) : res.sendStatus(304);
  }

  @Get('/status/:userId')
  async fetchOrderDetails(
    @Headers() headers,
    @Param('userId') userId: string,
  ): Promise<OrdersDto> {
    var authHeader = headers.authorization;

    var validAuthHeader =
      await this.botApiService.validateAuthHeader(authHeader);

    if (!validAuthHeader) {
      throw new UnauthorizedException();
    }

    var ordersDetails = await this.botApiService.getOrdersDetails(userId);
    var ordersDto = plainToClass(OrdersDto, ordersDetails);

    return ordersDto;
  }
}
