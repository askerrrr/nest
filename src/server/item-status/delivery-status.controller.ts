import { Response } from 'express';
import {
  Get,
  Res,
  Param,
  Body,
  Patch,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { ItemStatusService } from './item-status.service';

import { ParamDto } from '../dto/app.dtos';
import { ItemStatusDto } from './dto/itemStatus-dto';
import { OrderStatusDto } from '../order-status/dto/orderStatus-dto';

@Controller('deliverystatus')
export class DeliveryStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @UseGuards(AuthGuard)
  @Patch()
  async changeDeliveryStatus(
    @Res() res: Response,
    @Body() body: ItemStatusDto,
  ): Promise<Response> {
    var { userId, orderId, item } = body;

    var successfullUpdate = await this.itemStatusService.changeDeliveredStatus(
      userId,
      orderId,
      item,
    );

    return successfullUpdate ? res.sendStatus(200) : res.sendStatus(304);
  }

  @UseGuards(AuthGuard)
  @Get('/:userId/:orderId')
  async getCurrentOrderStatus(
    @Param() param: ParamDto,
  ): Promise<OrderStatusDto> {
    var { userId, orderId } = param;

    var orderStatus = await this.itemStatusService.getOrderStatus(
      userId,
      orderId,
    );

    return { orderStatus };
  }
}
