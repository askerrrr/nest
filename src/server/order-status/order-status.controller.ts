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

import { ParamDto } from '../dto/app.dtos';
import { AuthGuard } from '../auth/auth.guard';
import { OrderStatusService } from './order-status.service';
import { OrderStatusDto } from './order-status.dto';

@Controller('status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @UseGuards(AuthGuard)
  @Get('api/:userId/:orderId')
  async getOrderStatus(@Param() param: ParamDto): Promise<object> {
    var { userId, orderId } = param;

    var orderStatus: string = await this.orderStatusService.getOrderStatus(
      userId,
      orderId,
    );

    return { orderStatus };
  }

  @UseGuards(AuthGuard)
  @Patch('/')
  async changeOrderStatus(
    @Res() res: Response,
    @Body() body: OrderStatusDto,
  ): Promise<Response> {
    var { userId, orderId, orderStatus } = body;

    var successfullUpdate: boolean =
      await this.orderStatusService.changeOrderStatus(
        userId,
        orderId,
        orderStatus,
      );

    return successfullUpdate ? res.sendStatus(200) : res.sendStatus(304);
  }
}
