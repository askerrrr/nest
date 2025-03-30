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
import { ItemStatusDto, Params, OrderStatus } from './item-status.dto';

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
  async getCurrentOrderStatus(@Param() param: Params): Promise<OrderStatus> {
    var { userId, orderId } = param;

    var orderStatus = await this.itemStatusService.getCurrentOrderStatus(
      userId,
      orderId,
    );

    return { orderStatus };
  }
}
