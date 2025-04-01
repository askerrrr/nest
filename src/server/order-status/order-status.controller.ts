import { Response } from 'express';
import {
  Get,
  Res,
  Body,
  Patch,
  Param,
  Controller,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { OrderStatusService } from './order-status.service';

import { ParamDto } from '../dto/app.dtos';
import { OrderStatusDto } from './dto/orderStatus-dto';
import { NewOrderStatusDto } from './dto/newOrderStatus-dto';

@Controller('status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @UseGuards(AuthGuard)
  @Patch()
  async changeOrderStatus(
    @Res() res: Response,
    @Body() body: NewOrderStatusDto,
  ): Promise<Response> {
    var successfullUpdate: boolean =
      await this.orderStatusService.changeOrderStatus(body);

    return successfullUpdate ? res.sendStatus(200) : res.sendStatus(304);
  }

  @UseGuards(AuthGuard)
  @Get('api/:userId/:orderId')
  async getOrderStatus(@Param() param: ParamDto): Promise<OrderStatusDto> {
    var { userId, orderId } = param;

    var orderStatus: string = await this.orderStatusService.getOrderStatus(
      userId,
      orderId,
    );

    return { orderStatus };
  }
}
