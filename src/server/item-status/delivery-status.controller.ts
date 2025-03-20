import { Response } from 'express';
import { Get, Res, Param, Body, Patch, Controller } from '@nestjs/common';

import { ItemStatusDto } from './item-status.dto';
import { ItemStatusService } from './item-status.service';

@Controller('deliverystatus')
export class DeliveryStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @Patch()
  async changeDeliveryStatus(
    @Body() body: ItemStatusDto,
    @Res() res: Response,
  ) {
    var { userId, orderId, item } = body;

    var responseStatus: number =
      await this.itemStatusService.changeDeliveredStatus(userId, orderId, item);

    res.sendStatus(responseStatus);
  }

  @Get('/:userId/:orderId')
  async getCurrentOrderStatus(@Param() param) {
    var { userId, orderId } = param;

    var currentOrderStatus: string =
      await this.itemStatusService.getCurrentOrderStatus(userId, orderId);

    return { currentOrderStatus };
  }
}
